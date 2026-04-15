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
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              * { margin: 0; padding: 0; }
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); }
              .container { max-width: 600px; margin: 0 auto; }
              .header { background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0; }
              .logo { font-size: 48px; font-weight: 900; color: white; margin-bottom: 8px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1); }
              .tagline { color: rgba(255,255,255,0.95); font-size: 16px; font-weight: 500; }
              .content { padding: 40px 30px; background: white; }
              .content h2 { color: #22c55e; font-size: 28px; margin-bottom: 20px; line-height: 1.2; }
              .content p { color: #444; line-height: 1.7; margin-bottom: 16px; font-size: 15px; }
              .content strong { color: #22c55e; }
              .emphasis { background: rgba(34,197,94,0.08); padding: 20px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 25px 0; }
              .features { margin: 25px 0; }
              .feature-item { margin: 12px 0; padding-left: 8px; color: #555; display: flex; align-items: flex-start; }
              .feature-icon { color: #22c55e; font-weight: bold; margin-right: 12px; font-size: 18px; }
              .cta-button { display: inline-block; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; margin: 25px 0; font-weight: 600; border: none; cursor: pointer; font-size: 15px; box-shadow: 0 4px 12px rgba(34,197,94,0.3); transition: transform 0.2s; }
              .cta-button:hover { transform: scale(1.05); }
              .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 20px 0; }
              .badge { background: #f0fdf4; padding: 12px; border-radius: 6px; text-align: center; font-weight: 600; color: #22c55e; border: 2px solid #22c55e; }
              .social-links { text-align: center; margin: 25px 0; }
              .social-links a { color: #22c55e; text-decoration: none; font-weight: 600; margin: 0 12px; }
              .social-links a:hover { text-decoration: underline; }
              .footer { background: #f0fdf4; padding: 24px 30px; border-radius: 0 0 12px 12px; font-size: 12px; color: #999; text-align: center; line-height: 1.6; }
              .heart { color: #22c55e; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">💚 ZeeVeez</div>
                <div class="tagline">Welcome to the waitlist</div>
              </div>
              
              <div class="content">
                <p style="font-size: 18px; font-weight: 600; margin-bottom: 20px;">✨ Hey, you're on the ZeeVeez waitlist. We're glad you're here. ✨</p>
                
                <p style="margin-bottom: 20px;">Two years ago we set out to make a gummy that didn't taste like a compromise. No gelatin, no artificial anything. Just clean ingredients and a flavor (White Honey Apple, 80 cal/pouch) that people keep asking us about.</p>
                
                <p style="margin-bottom: 20px;">We also built ZeeVeez with a bigger goal in mind. Most of our profits go toward local Texas organizations. Buying a bag means something beyond the snack.</p>
                
                <div style="background: rgba(34,197,94,0.06); padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 24px 0;">
                  <p style="margin: 0; font-weight: 600; color: #22c55e;">🎁 Waitlist Perk</p>
                  <p style="margin: 6px 0 0 0;">Being on the waitlist means you'll hear about launch-day pricing first, before anyone else.</p>
                </div>
                
                <p style="text-align: center; margin-top: 24px; font-style: italic;">More soon.</p>
                
                <p style="margin-top: 30px; font-weight: 700; color: #22c55e; font-size: 16px; text-align: center;">ZeeVeez, made in Texas</p>
              </div>
              
              <div class="footer">
                <p><strong>ZeeVeez™</strong> — Feel Good Gummies</p>
                <p>ZV3, LLC • 2615 Ludelle Street, Fort Worth, TX 76105</p>
                <p>Made with <span class="heart">💚</span> in Texas</p>
              </div>
            </div>
          </body>
        </html>
      `,
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
