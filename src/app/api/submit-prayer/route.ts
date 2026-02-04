import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    const body = await req.json()
    const { notes, email, total } = body

    if (!notes || !notes.length || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 1. Simulate Payment Delay (just once for the whole transaction)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // 2. Create Records in Payload
    // We create a separate entry for each prayer note in the basket
    const createdNotes = [];

    for (const note of notes) {
      const newRequest = await payload.create({
        collection: 'prayer-requests',
        data: {
          type: note.type,
          service: note.service.name || note.service.nameKey || note.service,
          names: note.names.map((n: string) => ({ name: n })),
          email,
          amount: note.amount,
          status: 'paid', // Simulating successful payment
        },
      })
      createdNotes.push(newRequest.id);
    }

    // 3. Send Confirmation Email
    try {
      if (process.env.RESEND_API_KEY) {
        const getServiceLabel = (s: string = '') => {
          const val = s.toLowerCase();
          if (val.includes('simple') || val.includes('проста')) return null;
          if (val.includes('sorokoust') || val.includes('сорокауст')) return 'Сорокауст';
          if (val.includes('year') || val.includes('рік')) return 'Рік';
          return s;
        };

        const notesHtml = notes.map((note: any) => {
          const isRepose = note.type === 'repose';
          const themeColor = isRepose ? '#000000' : '#D22626';
          const title = isRepose ? "ЗА УПОКІЙ" : "ЗА ЗДОРОВ'Я";
          const serviceLabel = getServiceLabel(note.service.name || note.service.nameKey || note.service);

          const paddedNames = [...note.names];
          while (paddedNames.length < 10) paddedNames.push('');

          return `
            <div style="background-color: #fff; border: 1px solid #eee; box-shadow: 0 4px 10px rgba(0,0,0,0.05); width: 280px; margin: 0 auto 30px auto; padding: 20px; font-family: 'Times New Roman', serif;">
              <div style="text-align: center; margin-bottom: 15px;">
                <div style="height: 2px; background: ${themeColor}; width: 100%; margin-bottom: 10px; opacity: 0.2;"></div>
                <h2 style="margin: 0; color: ${themeColor}; font-size: 24px; text-transform: uppercase;">${title}</h2>
                ${serviceLabel ? `<p style="margin: 5px 0 0 0; color: ${themeColor}; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">(${serviceLabel})</p>` : ''}
              </div>
              
              <div style="margin-bottom: 20px;">
                ${paddedNames.map(name => `
                  <div style="border-bottom: 1px solid ${themeColor}; padding: 6px 0; min-height: 22px; text-align: center; border-bottom-color: ${themeColor}33;">
                    <span style="font-size: 16px; italic; color: #111;">${name}</span>
                  </div>
                `).join('')}
              </div>

              <div style="text-align: center; color: ${themeColor}; font-size: 11px; opacity: 0.8;">
                <p style="margin: 0; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">Свято-Миколаївський</p>
                <p style="margin: 0; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">Жидичинський монастир</p>
              </div>
            </div>
          `;
        }).join('');

        await payload.sendEmail({
          to: email,
          from: 'onboarding@resend.dev',
          subject: 'Ваші записки прийняті - Жидичинський монастир',
          html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              @font-face {
                font-family: 'Triod';
                src: url('https://zhidichin-monastery.org/fonts/Triod_Postnaja.ttf') format('truetype');
                font-weight: normal;
                font-style: normal;
              }
              .triod-text {
                font-family: 'Triod', 'Times New Roman', serif !important;
              }
            </style>
          </head>
          <body style="background-color: #f8f8f8; padding: 40px 20px; font-family: sans-serif;">
            <div style="max-width: 600px; margin: 0 auto;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #444; font-size: 20px; font-weight: 300;">Дякуємо за вашу пожертву</h1>
                <p style="color: #888; font-size: 14px;">Ваші записки передані до монастиря та будуть зачитані під час богослужіння.</p>
              </div>

              ${notesHtml.replace(/font-family: serif;/g, "font-family: 'Triod', serif;").replace(/font-family: 'Times New Roman', serif;/g, "font-family: 'Triod', 'Times New Roman', serif;")}

              <div style="text-align: center; border-top: 1px solid #eee; padding-top: 20px; margin-top: 20px;">
                <p style="color: #999; font-size: 12px;">Загальна сума пожертви: ${total} грн</p>
              </div>
            </div>
          </body>
          </html>
          `,
        })
      }
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
    }

    return NextResponse.json({ success: true, ids: createdNotes })
  } catch (error) {
    console.error('Prayer Request Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
