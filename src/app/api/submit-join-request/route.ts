import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, message } = body

    // Validation
    const errors: string[] = []

    // Name: prevent SQL chars (though handled by ORM) and XSS chars
    if (!name || name.trim().length < 2) {
      errors.push('Ім\'я надто коротке')
    } else if (/[<>;]/.test(name)) {
      errors.push('Ім\'я містить недопустимі символи')
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      errors.push('Невірний формат Email')
    }

    // Phone (optional but strict if present)
    if (phone) {
      // Allow only digits, spaces, +, -, (, )
      if (!/^[\d\+\-\(\)\s]+$/.test(phone)) {
        errors.push('Телефон може містити лише цифри та знаки +, -, (, )')
      }
      // Check digit count
      const digits = phone.replace(/\D/g, '')
      if (digits.length < 9 || digits.length > 15) {
        errors.push('Телефон повинен містити від 9 до 15 цифр')
      }
    }

    // Message sanitization (prevent script tags etc)
    if (message && /[<>]/.test(message)) {
        errors.push('Повідомлення містить недопустимі символи')
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(', ') }, { status: 400 })
    }

    // Sanitize specifically for storage (just in case)
    const sanitize = (str: string) => str ? str.replace(/[<>;]/g, '').trim() : ''

    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'join-requests',
      data: {
        name: sanitize(name),
        email: sanitize(email),
        phone: sanitize(phone),
        message: sanitize(message),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error submitting join request:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
