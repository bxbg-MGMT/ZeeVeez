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
              * { margin: 0; padding: 0; }
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background: linear-gradient(135deg, #fff5f8 0%, #f0fdf4 100%); }
              .container { max-width: 600px; margin: 0 auto; }
              .header { background: linear-gradient(135deg, #e91e90 0%, #f472b6 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0; }
              .logo { font-size: 48px; font-weight: 900; color: white; margin-bottom: 8px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1); }
              .tagline { color: rgba(255,255,255,0.95); font-size: 16px; font-weight: 500; }
              .content { padding: 40px 30px; background: white; }
              .content h2 { color: #e91e90; font-size: 28px; margin-bottom: 20px; line-height: 1.2; }
              .content p { color: #444; line-height: 1.7; margin-bottom: 16px; font-size: 15px; }
              .content strong { color: #e91e90; }
              .emphasis { background: rgba(233,30,144,0.08); padding: 20px; border-radius: 8px; border-left: 4px solid #e91e90; margin: 25px 0; }
              .features { margin: 25px 0; }
              .feature-item { margin: 12px 0; padding-left: 8px; color: #555; display: flex; align-items: flex-start; }
              .feature-icon { color: #22c55e; font-weight: bold; margin-right: 12px; font-size: 18px; }
              .cta-button { display: inline-block; background: linear-gradient(135deg, #e91e90 0%, #f472b6 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; margin: 25px 0; font-weight: 600; border: none; cursor: pointer; font-size: 15px; box-shadow: 0 4px 12px rgba(233,30,144,0.3); transition: transform 0.2s; }
              .cta-button:hover { transform: scale(1.05); }
              .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 20px 0; }
              .badge { background: #f0fdf4; padding: 12px; border-radius: 6px; text-align: center; font-weight: 600; color: #22c55e; border: 2px solid #22c55e; }
              .social-links { text-align: center; margin: 25px 0; }
              .social-links a { color: #e91e90; text-decoration: none; font-weight: 600; margin: 0 12px; }
              .social-links a:hover { text-decoration: underline; }
              .footer { background: #faf5f8; padding: 24px 30px; border-radius: 0 0 12px 12px; font-size: 12px; color: #999; text-align: center; line-height: 1.6; }
              .heart { color: #e91e90; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">🍯 ZeeVeez</div>
                <div class="tagline">The Gummy Squad Has Arrived (Minus the Regret)</div>
              </div>
              
              <div class="content">
                <h2>Yo, welcome to the crew! 🎉</h2>
                
                <p>We're losing it. In the best way. You just joined the ZeeVeez waitlist, and we're not exaggerating—this might be the best decision you've made this month.</p>
                
                <div class="emphasis">
                  <p><strong style="font-size: 18px;">Here's the tea:</strong> We spent TWO YEARS perfecting gummies that don't taste like regret. No gelatin. No artificial garbage. Just pure, unapologetic deliciousness.</p>
                </div>
                
                <p><strong>Why you're about to become obsessed:</strong></p>
                <div class="features">
                  <div class="feature-item"><span class="feature-icon">✨</span> <span>All-natural ingredients that actually make sense (we checked the thesaurus, "guilt-free snack" is the only two words needed)</span></div>
                  <div class="feature-item"><span class="feature-icon">🌱</span> <span>Plant-based vibes that make you feel like a wellness influencer without the Instagram addiction</span></div>
                  <div class="feature-item"><span class="feature-icon">💚</span> <span>Only 80 calories per pouch (we did the math so you don't have to)</span></div>
                  <div class="feature-item"><span class="feature-icon">⭐</span> <span>Proudly made in Texas by people who actually care</span></div>
                </div>
                
                <p>Here's what's about to happen: You'll be the FIRST to get exclusive launch-day pricing. We're talking early-bird perks that'll make your friends jealous. You're basically a VIP now. Congratulations on your win.</p>
                
                <div style="text-align: center;">
                  <a href="https://instagram.com/thefeelgoodgummy" class="cta-button">Follow the Chaos on Instagram</a>
                </div>
                
                <div class="grid">
                  <div class="badge">🎬 Catch us on TikTok</div>
                  <div class="badge">📦 Drop June 2026</div>
                </div>
                
                <div class="social-links">
                  Check us out on <a href="https://tiktok.com/@zeeveez">TikTok @zeeveez</a> • <a href="https://amazon.com/thefeelgoodgummy">Amazon</a>
                </div>
                
                <p style="margin-top: 30px; font-size: 13px; color: #999; text-align: center;">
                  P.S. — We're not just another snack brand. A portion of every sale supports causes we actually believe in. <strong style="color: #e91e90;">Snacking has never felt so good.</strong>
                </p>
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

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: error.message });
  }
}
