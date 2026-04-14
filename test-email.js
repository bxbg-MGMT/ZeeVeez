// Test email sending script
// Run: node test-email.js

import dotenv from 'dotenv';
dotenv.config();

import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

async function testEmail() {
  const testEmail = 'test@example.com'; // Change this to your test email
  
  console.log('🚀 Testing email send...');
  console.log(`📧 Test email: ${testEmail}`);
  
  try {
    // Send test email
    console.log('\n1️⃣ Sending email via Resend...');
    const emailResponse = await resend.emails.send({
      from: process.env.RESEND_FROM || 'ZeeVeez <onboarding@resend.dev>',
      to: testEmail,
      subject: 'Welcome to ZeeVeez - TEST EMAIL',
      html: '<p>Test email from ZeeVeez! If you see this, emails are working! 🎉</p>'
    });

    console.log('✅ Email sent! Response:', emailResponse);

    // Save to Supabase
    console.log('\n2️⃣ Saving to Supabase...');
    const { data, error } = await supabase
      .from('email_signups')
      .insert([
        {
          email: testEmail,
          sent_at: new Date().toISOString(),
          status: 'sent',
          resend_id: emailResponse.id,
          test: true
        }
      ]);

    if (error) {
      console.log('⚠️  Supabase error:', error);
    } else {
      console.log('✅ Saved to Supabase!', data);
    }

    console.log('\n🎉 Test complete!');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testEmail();
