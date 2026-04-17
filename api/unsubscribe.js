import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase configuration');
      return res.status(500).json({ error: 'Database not configured' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get email from query param or body
    const email = req.query.email || req.body?.email;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Verify the email is valid
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Update the email record to mark as unsubscribed
    const { data, error } = await supabase
      .from('email_signups')
      .update({
        unsubscribed: true,
        unsubscribed_at: new Date().toISOString()
      })
      .eq('email', email)
      .select();

    if (error) {
      console.error('Supabase update error:', error);
      return res.status(500).json({ error: 'Failed to process unsubscribe' });
    }

    if (!data || data.length === 0) {
      console.warn(`Unsubscribe requested for non-existent email: ${email}`);
      // Still return success to prevent email harvesting
      return res.status(200).json({ 
        success: true, 
        message: 'You have been unsubscribed' 
      });
    }

    console.log(`Email unsubscribed: ${email}`);

    // If it's a GET request (from email link), return HTML response
    if (req.method === 'GET') {
      return res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Unsubscribed</title>
            <style>
              * { margin: 0; padding: 0; }
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                min-height: 100vh; 
                padding: 20px;
              }
              .container { 
                background: white; 
                border-radius: 12px; 
                padding: 60px 40px; 
                text-align: center; 
                max-width: 420px; 
                box-shadow: 0 10px 40px rgba(34,197,94,0.1);
              }
              .icon { font-size: 64px; margin-bottom: 20px; }
              h1 { 
                color: #22c55e; 
                font-size: 28px; 
                margin-bottom: 12px;
              }
              p { 
                color: #666; 
                font-size: 15px; 
                line-height: 1.6; 
                margin-bottom: 24px;
              }
              .button { 
                display: inline-block; 
                background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); 
                color: white; 
                padding: 12px 28px; 
                border-radius: 8px; 
                text-decoration: none; 
                font-weight: 600; 
                font-size: 14px;
              }
              .button:hover { 
                opacity: 0.9;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="icon">✓</div>
              <h1>Unsubscribed</h1>
              <p>You have been successfully unsubscribed from ZeeVeez emails. We'll miss you!</p>
              <p style="font-size: 13px; color: #999;">If you change your mind, you can always subscribe again at zeeveez.com</p>
            </div>
          </body>
        </html>
      `);
    }

    // If it's a POST request, return JSON
    return res.status(200).json({ 
      success: true, 
      message: 'You have been successfully unsubscribed' 
    });

  } catch (error) {
    console.error('Unsubscribe error:', error.message, error);
    
    return res.status(500).json({ 
      error: error.message || 'Failed to process unsubscribe',
      details: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
}
