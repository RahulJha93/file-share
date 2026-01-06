import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { to, fileName, fileUrl, shortUrl, senderName } = await request.json();

    if (!to || !fileName || !shortUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'File Share <onboarding@resend.dev>', // Use your verified domain in production
      to: [to],
      subject: `${senderName || 'Someone'} shared a file with you: ${fileName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">📁 File Shared With You</h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Hi there! 👋
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                <strong>${senderName || 'Someone'}</strong> has shared a file with you through File Share.
              </p>
              
              <!-- File Info Card -->
              <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #667eea;">
                <p style="margin: 0; color: #666666; font-size: 14px;">File Name:</p>
                <p style="margin: 5px 0 0; color: #333333; font-size: 18px; font-weight: 600;">${fileName}</p>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="${shortUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                  Download File
                </a>
              </div>
              
              <p style="color: #888888; font-size: 14px; text-align: center; margin: 30px 0 0;">
                Or copy this link: <a href="${shortUrl}" style="color: #667eea;">${shortUrl}</a>
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #eeeeee;">
              <p style="color: #888888; font-size: 12px; margin: 0;">
                Sent via <strong>File Share</strong> • Secure file sharing made simple
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Send email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
