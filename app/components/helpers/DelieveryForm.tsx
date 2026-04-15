"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import LetsTalkButton from "../helpers/MainButton"

interface FormData {
  name: string
  phone: string
  email: string
  weight: string
  length: string
  width: string
  height: string
  message: string
}

const MAX_FILES = 5
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

// Phone formatter: +7 (XXX) XXX XX XX
const formatPhone = (digits: string) => {
  let value = digits.replace(/\D/g, "")
  
  if (value.length === 0) return ""
  
  // Ensure starts with 7, and limit to 11 digits total (7 + 10)
  if (!value.startsWith("7")) value = "7" + value.slice(0, 10)
  value = value.slice(0, 11)

  // Format: +7 (XXX) XXX XX XX
  let formatted = "+7"
  if (value.length > 1) {
    formatted += " (" + value.slice(1, 4)
  }
  if (value.length >= 4) {
    formatted += ") " + value.slice(4, 7)
  }
  if (value.length >= 7) {
    formatted += " " + value.slice(7, 9)
  }
  if (value.length >= 9) {
    formatted += " " + value.slice(9, 11)
  }
  
  return formatted
}

const extractDigits = (value: string) => value.replace(/\D/g, "")

export default function LogisticsFormSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    message: "",
  })

  const [files, setFiles] = useState<File[]>([])
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
  }, [])

  // Name: only letters, spaces, hyphens
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '')
    setForm({ ...form, name: value })
    if (errors.name) setErrors(prev => ({ ...prev, name: "" }))
  }

  // Phone change with formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = extractDigits(e.target.value)
    setForm({ ...form, phone: digits })
    if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }))
  }

  // Generic text change for email, message
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }))
    }
  }

  // Restrict to digits only for numeric fields
  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const digits = value.replace(/\D/g, "")
    setForm({ ...form, [name]: digits })
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  // File handling
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    
    const incoming = Array.from(e.target.files)
    
    // Check file sizes
    const validFiles = incoming.filter(file => file.size <= MAX_FILE_SIZE)
    const invalidFiles = incoming.filter(file => file.size > MAX_FILE_SIZE)
    
    if (invalidFiles.length > 0) {
      alert(`Некоторые файлы превышают лимит в 10MB и не были добавлены`)
    }
    
    // Check total count
    const totalFiles = [...files, ...validFiles]
    if (totalFiles.length > MAX_FILES) {
      alert(`Максимум ${MAX_FILES} файлов`)
      const allowedFiles = validFiles.slice(0, MAX_FILES - files.length)
      setFiles(prev => [...prev, ...allowedFiles])
    } else {
      setFiles(prev => [...prev, ...validFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  // Validation
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!form.name.trim()) {
      newErrors.name = "Введите ваше имя"
    }

    if (!form.email.trim()) {
      newErrors.email = "Введите email"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Введите корректный email"
    }

    const phoneDigits = extractDigits(form.phone)
    if (phoneDigits.length !== 11) {
      newErrors.phone = "Введите корректный номер телефона"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Submit handler
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    if (!agreed) {
      alert("Пожалуйста, примите условия пользовательского соглашения")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const submitFormData = new FormData()
      
      // Add all form fields
      Object.entries(form).forEach(([key, value]) => {
        submitFormData.append(key, value)
      })
      
      // Add phone digits only for backend
      const phoneDigits = extractDigits(form.phone)
      submitFormData.set("phone", phoneDigits)
      
      // Add files
      files.forEach(file => {
        submitFormData.append("files", file)
      })

      const response = await fetch("/api/send-logistics", {
        method: "POST",
        body: submitFormData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to send")
      }

      setSubmitStatus("success")
      
      // Reset form
      setForm({
        name: "",
        phone: "",
        email: "",
        weight: "",
        length: "",
        width: "",
        height: "",
        message: "",
      })
      setFiles([])
      setAgreed(false)
      setErrors({})
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000)
      
    } catch (error) {
      console.error("Submit error:", error)
      setSubmitStatus("error")
      
      // Auto-hide error message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get formatted phone for display
  const displayPhone = formatPhone(form.phone)
  // bg-white w-full max-w-4xl mx-auto px-7 sm:px-6 lg:px-8 py-12 md:py-16 rounded-3xl shadow-lg
  return (
    <section
      ref={sectionRef}
      className="bg-white w-full py-6 text-[#0b2249]"
    >
      <h2 className="text-2xl sm:text-3xl font-semibold text-[#0b2249]">
        Есть идея? <span className="font-bold">Мы доставим решение.</span>
      </h2>

      <p className="text-[#0b2249] mt-2 mb-8 text-sm sm:text-base">
        Расскажите нам о вашем грузе и задаче
      </p>

      <form onSubmit={submit} className="space-y-5 sm:space-y-6" noValidate>
        {/* Name Field */}
        <div>
          <input
            name="name"
            placeholder="Ваше имя"
            value={form.name}
            onChange={handleNameChange}
            disabled={isSubmitting}
            className="w-full border-b  text-black border-gray-300 py-3 outline-none focus:border-blue-500 transition text-base disabled:bg-gray-50"
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Phone Field */}
        <div>
          <input
            name="phone"
            type="tel"
            placeholder="+7 (___) ___ __ __"
            value={displayPhone}
            onChange={handlePhoneChange}
            disabled={isSubmitting}
            className="w-full text-black border-b border-gray-300 py-3 outline-none focus:border-blue-500 transition text-base disabled:bg-gray-50"
            required
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Email Field */}
        <div>
          <input
            name="email"
            type="email"
            placeholder="Ваш email"
            value={form.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full border-b text-black border-gray-300 py-3 outline-none focus:border-blue-500 transition text-base disabled:bg-gray-50"
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Weight and Dimensions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              name="weight"
              placeholder="Вес (кг)"
              value={form.weight}
              onChange={handleNumericChange}
              inputMode="numeric"
              disabled={isSubmitting}
              className="w-full text-black border-b border-gray-300 py-3 outline-none focus:border-blue-500 transition text-base disabled:bg-gray-50"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <input
              name="length"
              placeholder="Длина (см)"
              value={form.length}
              onChange={handleNumericChange}
              inputMode="numeric"
              disabled={isSubmitting}
              className="border-b text-black border-gray-300 py-3 outline-none focus:border-blue-500 transition text-base disabled:bg-gray-50"
            />
            <input
              name="width"
              placeholder="Ширина (см)"
              value={form.width}
              onChange={handleNumericChange}
              inputMode="numeric"
              disabled={isSubmitting}
              className="border-b text-black border-gray-300 py-3 outline-none focus:border-blue-500 transition text-base disabled:bg-gray-50"
            />
            <input
              name="height"
              placeholder="Высота (см)"
              value={form.height}
              onChange={handleNumericChange}
              inputMode="numeric"
              disabled={isSubmitting}
              className="border-b text-black border-gray-300 py-3 outline-none focus:border-blue-500 transition text-base disabled:bg-gray-50"
            />
          </div>
        </div>

        {/* Message */}
        <textarea
          name="message"
          placeholder="Опишите ваш груз или задачу..."
          rows={3}
          value={form.message}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full text-black border-b border-gray-300 py-3 outline-none resize-none focus:border-blue-500 transition text-base disabled:bg-gray-50"
        />

        {/* File Upload */}
        {/* <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 text-center hover:border-blue-400 transition">
          <p className="text-gray-500 mb-3 text-sm sm:text-base">
            Прикрепить файлы (инвойсы, фото, документы) - макс. {MAX_FILES} файлов, до 10MB каждый
          </p>
          <input
            type="file"
            multiple
            onChange={handleFile}
            disabled={isSubmitting || files.length >= MAX_FILES}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
          />
          
        
          {files.length > 0 && (
            <div className="mt-3 text-left space-y-1">
              {files.map((file, index) => (
                <div key={index} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                  <span className="truncate flex-1">{file.name}</span>
                  <span className="text-gray-500 text-xs mx-2">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    disabled={isSubmitting}
                    className="text-red-500 hover:text-red-700 font-bold px-2"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div> */}

        {/* Agreement Checkbox */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="userAgreement"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            disabled={isSubmitting}
            className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            required
          />
          <label htmlFor="userAgreement" className="text-sm text-gray-600">
            Принимаю условия{" "}
            <a href="/user-agreement" className="text-blue-600 hover:underline" target="_blank">
              пользовательского соглашения
            </a>
          </label>
        </div>

        {/* Submit Button */}
        <LetsTalkButton 
  type="submit"  // Add this
  children={isSubmitting ? "ОТПРАВЛЯЕМ..." : "ОТПРАВИТЬ ЗАЯВКУ"}
  disabled={isSubmitting}
/>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm">
              ✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
            </p>
          </div>
        )}
        
        {submitStatus === "error" && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">
              ❌ Ошибка отправки. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.
            </p>
          </div>
        )}
      </form>
    </section>
  )
}