// app/api/send-logistics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  console.log("=== API ROUTE CALLED ===");
  
  try {
    const formData = await req.formData();
    console.log("Form data received");

    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const weight = formData.get('weight') as string;
    const length = formData.get('length') as string;
    const width = formData.get('width') as string;
    const height = formData.get('height') as string;
    const message = formData.get('message') as string;

    console.log("Extracted data:", { name, phone, email, weight, length, width, height });

    // Collect attachments
    const attachments: any[] = [];

    for (const [key, value] of formData.entries()) {
      if (key === 'files' && value instanceof File) {
        console.log(`Processing file: ${value.name}, size: ${value.size}`);
        const buffer = Buffer.from(await value.arrayBuffer());
        
        attachments.push({
          filename: value.name,
          content: buffer,
          contentType: value.type || 'application/octet-stream',
        });
      }
    }

    console.log(`Total attachments: ${attachments.length}`);

    // Check environment variables
    console.log("Checking environment variables:", {
      SMTP_HOST: process.env.SMTP_HOST ? "✓ Set" : "✗ Missing",
      SMTP_PORT: process.env.SMTP_PORT ? "✓ Set" : "✗ Missing",
      SMTP_USER: process.env.SMTP_USER ? "✓ Set" : "✗ Missing",
      SMTP_PASS: process.env.SMTP_PASS ? "✓ Set" : "✗ Missing",
      RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL ? "✓ Set" : "✗ Missing",
    });

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error("Missing SMTP credentials in environment variables");
    }

    // Create transporter with Yandex configuration
    console.log("Creating SMTP transporter...");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.yandex.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    // Verify connection before sending
    console.log("Verifying SMTP connection...");
    try {
      await transporter.verify();
      console.log("SMTP connection verified successfully");
    } catch (verifyError) {
      const error = verifyError as Error;
      console.error("SMTP verification failed:", error);
      throw new Error(`SMTP connection failed: ${error.message}`);
    }

    const mailOptions = {
      from: `"Northern Fox Logistics" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `Новая заявка на доставку от ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0b2249; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #0b2249; }
            .dimensions { background: #e8f0fe; padding: 10px; border-radius: 5px; }
            hr { border: none; border-top: 1px solid #ddd; margin: 20px 0; }
            .footer { font-size: 12px; color: #666; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Новая заявка на доставку</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">👤 Имя:</span> ${name}
              </div>
              <div class="field">
                <span class="label">📞 Телефон:</span> ${phone}
              </div>
              <div class="field">
                <span class="label">✉️ Email:</span> ${email}
              </div>
              
              ${weight || length || width || height ? `
                <div class="dimensions">
                  <div class="field">
                    <span class="label">⚖️ Вес:</span> ${weight || '—'} кг
                  </div>
                  <div class="field">
                    <span class="label">📏 Габариты:</span> ${length || '—'} × ${width || '—'} × ${height || '—'} см
                  </div>
                </div>
              ` : ''}
              
              ${message ? `
                <div class="field">
                  <span class="label">💬 Сообщение:</span>
                  <p style="margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #0b2249;">
                    ${message.replace(/\n/g, '<br>')}
                  </p>
                </div>
              ` : ''}
              
              <hr>
              
              <div class="footer">
                <p>Отправлено: ${new Date().toLocaleString('ru-RU')}</p>
                <p>Количество файлов: ${attachments.length}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    console.log("Sending email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    return NextResponse.json(
      { success: true, message: "Заявка успешно отправлена" },
      { status: 200 }
    );

  } catch (error) {
    const err = error as Error;
    console.error('Detailed Nodemailer error:', err);
    console.error('Error message:', err.message);
    console.error('Error stack:', err.stack);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Не удалось отправить заявку',
        details: err.message 
      },
      { status: 500 }
    );
  }
}