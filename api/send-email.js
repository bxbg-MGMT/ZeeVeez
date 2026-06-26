import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Validate environment variables
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM || 'onboarding@resend.dev';
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!apiKey) {
      console.error('Missing RESEND_API_KEY');
      return res.status(500).json({ error: 'Email service not configured (missing API key)' });
    }

    // Initialize Resend
    const resend = new Resend(apiKey);

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'You made the list.',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You made the list.</title>
</head>
<body style="margin:0;padding:0;background-color:#f0fdf4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0fdf4;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td align="center" style="background-color:#22c55e;padding:36px 32px 28px;border-radius:12px 12px 0 0;">
              <p style="margin:0;font-size:36px;font-weight:900;color:#ffffff;letter-spacing:-1px;line-height:1;">ZeeVeez™</p>
              <p style="margin:8px 0 0;font-size:13px;font-weight:600;color:rgba(255,255,255,0.85);letter-spacing:1.5px;text-transform:uppercase;">White Honey Apple &nbsp;·&nbsp; Made in Texas</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff;padding:40px 40px 32px;">

              <p style="margin:0 0 28px;font-size:21px;font-weight:700;color:#0f1f15;text-align:center;line-height:1.3;">Hey — you're on the list. 🎉</p>

              <p style="margin:0 0 16px;font-size:15px;line-height:1.75;color:#374151;">Two years ago we set out to make a gummy that didn't taste like a compromise. No gelatin, no artificial anything — just clean ingredients and a flavor that people keep coming back for.</p>

              <p style="margin:0 0 28px;font-size:15px;line-height:1.75;color:#374151;">We also built ZeeVeez with something bigger in mind. A portion of every sale goes to Texas-based charities. When you snack on ZeeVeez, you're helping make a difference.</p>

              <!-- Perk callout -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
                <tr>
                  <td style="background-color:#f0fdf4;border-left:4px solid #22c55e;padding:16px 20px;border-radius:0 8px 8px 0;">
                    <p style="margin:0 0 5px;font-size:13px;font-weight:700;color:#16a34a;text-transform:uppercase;letter-spacing:0.5px;">🎁 Waitlist Perk</p>
                    <p style="margin:0;font-size:14px;line-height:1.65;color:#374151;">You'll hear about launch-day pricing before we announce it anywhere else.</p>
                  </td>
                </tr>
              </table>

              <!-- What's inside -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;">
                <tr><td style="padding:7px 0;font-size:14px;color:#374151;line-height:1.5;">🌿 &nbsp;<strong style="color:#0f1f15;">Plant-based</strong> — pectin, not gelatin</td></tr>
                <tr><td style="padding:7px 0;font-size:14px;color:#374151;line-height:1.5;">🍯 &nbsp;<strong style="color:#0f1f15;">White Honey Apple</strong> — 80 cal · 0g fat · all natural</td></tr>
                <tr><td style="padding:7px 0;font-size:14px;color:#374151;line-height:1.5;">⭐ &nbsp;<strong style="color:#0f1f15;">Made in Texas</strong> — Fort Worth, TX · peanut-free facility</td></tr>
                <tr><td style="padding:7px 0;font-size:14px;color:#374151;line-height:1.5;">💚 &nbsp;<strong style="color:#0f1f15;">Gives back</strong> — a portion of every sale to Texas charities</td></tr>
              </table>

              <p style="margin:0 0 32px;font-size:15px;line-height:1.75;color:#374151;text-align:center;font-style:italic;">More soon. — The ZeeVeez Team</p>

              <!-- Partner box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="background-color:#f9fafb;border-radius:8px;padding:18px 20px;">
                    <p style="margin:0 0 8px;font-size:13px;color:#6b7280;">Interested in stocking ZeeVeez or partnering with us?</p>
                    <a href="https://linktr.ee/ZeeVeez" style="color:#22c55e;font-weight:700;font-size:14px;text-decoration:none;">linktr.ee/ZeeVeez &rarr;</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color:#f0fdf4;border-top:1px solid #dcfce7;border-radius:0 0 12px 12px;padding:22px 32px;">
              <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#374151;">ZeeVeez™ — Feel Good Gummies</p>
              <p style="margin:0 0 14px;font-size:12px;color:#9ca3af;">ZV3, LLC &nbsp;·&nbsp; 2615 Ludelle Street, Fort Worth, TX 76105</p>
              <a href="https://zeeveez.com/api/unsubscribe?email=${encodeURIComponent(email)}" style="font-size:11px;color:#9ca3af;text-decoration:underline;">Unsubscribe</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    });

    console.log('Email sent successfully:', emailResponse);

    // Try to save to Supabase if configured
    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        const { error: saveError } = await supabase
          .from('email_signups')
          .insert([
            {
              email: email,
              sent_at: new Date().toISOString(),
              status: 'sent',
              resend_id: emailResponse.id
            }
          ]);

        if (saveError) {
          console.warn('Supabase save warning:', saveError);
        }
      } catch (supabaseErr) {
        console.warn('Supabase connection warning:', supabaseErr);
      }
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!',
      resendId: emailResponse.id 
    });
  } catch (error) {
    console.error('Send-email error:', error.message, error);
    
    return res.status(500).json({ 
      error: error.message || 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
}
