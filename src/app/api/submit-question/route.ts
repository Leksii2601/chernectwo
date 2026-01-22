import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, question } = body

    // Validation
    const errors: string[] = []

    if (!name || name.trim().length < 2) {
      errors.push('Ім\'я надто коротке')
    } else if (/[<>;]/.test(name)) {
      errors.push('Ім\'я містить недопустимі символи')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      errors.push('Невірний формат Email')
    }

    if (!question || question.trim().length < 5) {
      errors.push('Питання надто коротке')
    } else if (/[<>]/.test(question)) {
       errors.push('Питання містить недопустимі символи')
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(', ') }, { status: 400 })
    }

    const sanitize = (str: string) => str ? str.replace(/[<>;]/g, '').trim() : ''

    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'questions',
      data: {
        name: sanitize(name),
        email: sanitize(email),
        question: sanitize(question),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error submitting question:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
