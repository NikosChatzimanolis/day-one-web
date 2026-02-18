import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // 1. Authenticate with your MAIN Gmail credentials
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Forces secure connection
      auth: {
        user: process.env.EMAIL_USER, // Your main @gmail.com login
        pass: process.env.EMAIL_PASS, // Your App Password
      },
    });

    // 2. Email sent to YOU (The Agency)
    const mailToAgency = {
      from: `"Day One Website" <contact@dayone-web.com>`, // Your alias
      to: 'contact@dayone-web.com',                       // Where you receive the lead
      replyTo: email,                                     // So you can reply directly to the client
      subject: `New Request from ${name} | Day One`,
      html: `
        <h3 style="color: #6d28d9;">New Lead from Day One Website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f3f4f6; padding: 12px; border-radius: 8px;">${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    // 3. Automated "Thank You" Email sent to the CLIENT
    const mailToClient = {
      from: `"Day One" <contact@dayone-web.com>`,         // Shows up as coming from your brand
      to: email,                                          // Sends to the email the client typed in
      subject: `Thanks for reaching out to Day One!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; color: #222; line-height: 1.6;">
          <h2 style="color: #6d28d9;">Hi ${name},</h2>
          <p>Thanks for reaching out! We've successfully received your message and your request for a free mockup.</p>
          <p>Our team is already taking a look at your details, and we will get back to you as soon as possible (usually within 24 hours) to discuss your project.</p>
          <p>If you have any extra details or inspiration you want to share in the meantime, feel free to reply directly to this email.</p>
          <br/>
          <p>Speak soon,</p>
          <p><strong>The Day One Team</strong></p>
        </div>
      `,
    };

    // 4. Send both emails simultaneously
    await Promise.all([
      transporter.sendMail(mailToAgency),
      transporter.sendMail(mailToClient)
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}