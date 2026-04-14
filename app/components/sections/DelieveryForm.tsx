"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import LetsTalkButton from "../helpers/MainButton"

interface FormData {
  name: string
  phone: string // digits only: 79XXXXXXXXX
  email: string
  weight: string
  length: string
  width: string
  height: string
  message: string
}

const MAX_FILES = 5
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

const formatPhone = (digits: string) => {
  const d = digits.replace(/\D/g, "").slice(0, 11)

  if (d.length === 0) return ""
  if (d.length < 2) return "+7"

  let result = "+7"

  if (d.length >= 2) result += ` (${d.slice(1, 4)}`
  if (d.length >= 5) result += `) ${d.slice(4, 7)}`
  if (d.length >= 8) result += ` ${d.slice(7, 9)}`
  if (d.length >= 10) result += ` ${d.slice(9, 11)}`

  return result
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

  // ==================== HANDLERS ====================

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, "")
    setForm(prev => ({ ...prev, name: value }))
    if (errors.name) setErrors(prev => ({ ...prev, name: "" }))
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = extractDigits(e.target.value)

    if (!digits.startsWith("7")) {
      digits = "7" + digits
    }

    digits = digits.slice(0, 11)

    setForm(prev => ({ ...prev, phone: digits }))
    if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const digits = value.replace(/\D/g, "")
    setForm(prev => ({ ...prev, [name]: digits }))
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const incoming = Array.from(e.target.files)

    const validFiles = incoming.filter(file => file.size <= MAX_FILE_SIZE)

    setFiles(prev => [...prev, ...validFiles].slice(0, MAX_FILES))
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  // ==================== VALIDATION ====================

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!form.name.trim()) newErrors.name = "Введите ваше имя"

    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Введите корректный email"
    }

    if (form.phone.length !== 11) {
      newErrors.phone = "Введите корректный номер телефона"
    }

    if (!agreed) return false

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ==================== SUBMIT ====================

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const formData = new FormData()

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value)
      })

      files.forEach(file => {
        formData.append("files", file)
      })

      const response = await fetch("/api/send-logistics", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Failed")

      setSubmitStatus("success")
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
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  // ==================== UI ====================

  return (
    <section
      ref={sectionRef}
      className="bg-white w-full max-w-4xl mx-auto px-7 sm:px-6 lg:px-8 py-12 md:py-16 rounded-3xl shadow-lg"
    >
      <h2 className="text-2xl sm:text-3xl font-semibold text-[#0b2249]">
        Есть идея? <span className="font-bold">Мы доставим решение.</span>
      </h2>

      <p className="text-[#0b2249] mt-2 mb-8 text-sm sm:text-base">
        Расскажите нам о вашем грузе и задаче
      </p>

      <form onSubmit={submit} className="space-y-6" noValidate aria-busy={isSubmitting}>
        <input
          name="name"
          placeholder="Ваше имя"
          value={form.name}
          onChange={handleNameChange}
          autoComplete="name"
          disabled={isSubmitting}
          className="w-full border-b border-gray-300 py-3 outline-none focus:border-blue-500"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          name="phone"
          type="tel"
          placeholder="+7 (___) ___ __ __"
          value={formatPhone(form.phone)}
          onChange={handlePhoneChange}
          autoComplete="tel"
          disabled={isSubmitting}
          className="w-full border-b border-gray-300 py-3 outline-none focus:border-blue-500"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        <input
          name="email"
          type="email"
          placeholder="Ваш email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          disabled={isSubmitting}
          className="w-full border-b border-gray-300 py-3 outline-none focus:border-blue-500"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <textarea
          name="message"
          placeholder="Опишите ваш груз или задачу..."
          value={form.message}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full border-b border-gray-300 py-3 outline-none resize-none focus:border-blue-500"
        />

        <input type="file" multiple onChange={handleFile} disabled={isSubmitting} />

        {files.map((file, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span>{file.name}</span>
            <button type="button" onClick={() => removeFile(i)}>×</button>
          </div>
        ))}

        <label className="flex gap-2 text-sm">
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            disabled={isSubmitting}
          />
          Принимаю условия пользовательского соглашения
        </label>

        <LetsTalkButton
          children={isSubmitting ? "ОТПРАВЛЯЕМ..." : "ОТПРАВИТЬ ЗАЯВКУ"}
          disabled={isSubmitting}
        />

        {submitStatus === "success" && (
          <p className="text-green-600 text-sm">Заявка успешно отправлена!</p>
        )}
        {submitStatus === "error" && (
          <p className="text-red-600 text-sm">Ошибка отправки. Попробуйте позже.</p>
        )}
      </form>
    </section>
  )
}