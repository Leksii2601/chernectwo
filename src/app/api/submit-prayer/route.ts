import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    const body = await req.json()
    const { names, type, service, amount, email } = body

    if (!names || !names.length || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 1. Simulate Payment Delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // 2. Create Record in Payload
    const newRequest = await payload.create({
      collection: 'prayer-requests',
      data: {
        type,
        service: service.name || service,
        names: names.map((n: string) => ({ name: n })),
        email,
        amount,
        status: 'paid', // Simulating successful payment
      },
    })

    // 3. Send Email
    try {
      console.log('--- EMAIL DEBUG ---');
      console.log('Recipient:', email);
      console.log('API Key Present:', !!process.env.RESEND_API_KEY);
      
      if (!process.env.RESEND_API_KEY) {
         throw new Error('RESEND_API_KEY is missing in environment variables');
      }

      const title = type === 'health' ? "ЗА ЗДОРОВ'Я" : "ЗА УПОКІЙ"

      // Pad list to 10 items to mimic physical note
      const fullList = [...names];
      while (fullList.length < 10) {
        fullList.push('');
      }

      // Use absolute URLs for images in email (Replace with your actual domain in production)
      // Since local servers can't serve images to email clients, these will only work if the recipient can access localhost (which they can't)
      // OR if you host the images. For now, we will assume they might be hosted or just placeholders.
      // However, Base64 is not well supported in all email clients. 
      // The best practice for local dev is to link to a public URL or use a placeholder service if you don't have a public domain yet.
      // For this demo, let's assume we want to use the structure.
      
      await payload.sendEmail({
        to: email,
        from: 'onboarding@resend.dev',
        subject: `Записка: ${title}`,
        html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 20px; background-color: #f0f0f0; font-family: sans-serif;">
          <div style="max-width: 600px; margin: 0 auto;">
            <p style="text-align: center; color: #666; font-size: 14px; margin-bottom: 20px;">
              Ваша пожертва (${amount} грн) успішна. Записка передана в монастир.
            </p>
            
            <!-- Note Container -->
            <div style="background-color: #fff; padding: 0; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px rgba(0,0,0,0.05); font-family: 'Times New Roman', Times, serif; max-width: 300px; margin: 0 auto;">
              
              <!-- Header Image -->
               <div style="background-color: #D22626; padding: 10px 0; text-align: center; color: white; font-size: 10px;">
                  [Тут буде Орнамент]
               </div>

              <!-- Header Text -->
              <div style="text-align: center; margin: 20px 0 10px 0;">
                <h1 style="margin: 0; color: #D22626; font-size: 22px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">
                  ${title}
                </h1>
                ${service && service.name && !service.name.includes('Проста') ? `
                    <p style="margin: 5px 0 0 0; color: #D22626; font-size: 10px; text-transform: uppercase; font-weight: bold;">
                        (${service.name})
                    </p>
                ` : ''}
              </div>

              <!-- Names List -->
              <div style="padding: 0 20px 20px 20px;">
                ${fullList.map((n: string) => `
                <div style="padding: 8px 0; border-bottom: 1px solid #D22626; display: flex; align-items: center; min-height: 24px; justify-content: center;">
                  <span style="color: #000; font-size: 16px; font-family: 'Times New Roman', serif;">${n}</span>
                </div>
                `).join('')}
              </div>

              <!-- Footer Image -->
               <div style="text-align: center; padding: 10px; color: #D22626; font-size: 12px; font-weight: bold;">
                  <p style="margin:0;">Свято-Миколаївський</p>
                  <p style="margin:0;">Жидичинський монастир</p>
               </div>
            
            </div>
            
             <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
              * Зображення можуть не відображатися в локальному режимі розробки.
            </p>
          </div>
        </body>
        </html>
        `,
      })
      console.log('Email sent successfully via Resend');
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // We don't fail the request if email fails, but we log it
    }

    return NextResponse.json({ success: true, id: newRequest.id })
  } catch (error) {
    console.error('Prayer Request Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
