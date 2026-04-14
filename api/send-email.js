import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const data = await resend.emails.send({
      from: 'ZeeVeez <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to ZeeVeez - Gummy Snacks Launching Soon!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .logo { font-size: 28px; font-weight: 700; color: #22c55e; }
              .content { line-height: 1.6; color: #555; }
              .cta-button { display: inline-block; background: #22c55e; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; margin: 20px 0; font-weight: 600; }
              .features { margin: 30px 0; }
              .feature-item { margin: 15px 0; padding: 12px; background: #f0fdf4; border-left: 4px solid #22c55e; }
              .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; text-align: center; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">🥝 ZeeVeez</div>
              </div>
              
              <div class="content">
                <h2>Welcome to ZeeVeez!</h2>
                <p>Thanks for signing up! We're thrilled to have you on our list.</p>
                
                <p>We're counting down to the launch of <strong>ZeeVeez White Honey Apple</strong> — our signature all-natural gummy snack that took two years to perfect.</p>
                
                <div class="features">
                  <strong>Why ZeeVeez:</strong>
                  <div class="feature-item">✓ All-natural ingredients with no gelatin or artificial flavors</div>
                  <div class="feature-item">✓ Plant-based and guilt-free snacking</div>
                  <div class="feature-item">✓ Only 80 calories per pouch</div>
                  <div class="feature-item">✓ Proudly made in Texas</div>
                  <div class="feature-item">✓ A portion of every sale gives back to charity</div>
                </div>
                
                <p>You'll be the first to know when we launch. As an early subscriber, you'll also get access to exclusive launch-day pricing!</p>
                
                <a href="https://instagram.com/thefeelgoodgummy" class="cta-button">Follow Us on Instagram</a>
                
                <p style="margin-top: 30px; font-size: 14px;">
                  In the meantime, check us out on <a href="https://tiktok.com/@zeeveez" style="color: #22c55e; text-decoration: none;">TikTok</a> to see what we're up to!
                </p>
              </div>
              
              <div class="footer">
                <p>ZeeVeez™ is a trademark of ZV3, LLC</p>
                <p>2615 Ludelle Street, Fort Worth, TX 76105</p>
                <p>Made with 💚 in Texas</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: error.message });
  }
}
