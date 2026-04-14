import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react' 
import LogisticsFormSection from '../components/helpers/DelieveryForm'

const ContactPage = () => {
  return (
    <section className='bg-white w-full max-w-4xl mx-auto px-7 sm:px-6 lg:px-8 py-12 md:py-16 rounded-3xl shadow-lg'>
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-5 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Вернуться назад
      </Link>
      
      <LogisticsFormSection />
    </section>
  )
}

export default ContactPage