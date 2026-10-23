import { NextResponse } from 'next/server';

// In-memory sliding-window rate limiter per client IP
const ipRequestHistory = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipRequestHistory.get(ip) || []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequestHistory.set(ip, timestamps);
    return false;
  }

  timestamps.push(now);
  ipRequestHistory.set(ip, timestamps);
  return true;
}

// Clean up old IP entries periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of ipRequestHistory.entries()) {
      const active = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
      if (active.length === 0) {
        ipRequestHistory.delete(ip);
      } else {
        ipRequestHistory.set(ip, active);
      }
    }
  }, 5 * 60 * 1000);
}

export async function POST(request: Request) {
  try {
    // 1. Rate limiting by IP
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit reached. Please wait a few minutes before trying again, or book directly via Google Calendar.',
        },
        { status: 429 }
      );
    }

    // 2. Parse body
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON request payload.' },
        { status: 400 }
      );
    }

    const { name, email, inquiryType, details, honeypot } = body as {
      name?: string;
      email?: string;
      inquiryType?: string;
      details?: string;
      honeypot?: string;
    };

    // 3. Spam protection: Honeypot check
    // If a hidden bot trap field is filled, silently return 200 without doing work
    if (honeypot && honeypot.trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Payload received.',
      });
    }

    // 4. Server-side validation
    const errors: Record<string, string> = {};

    const cleanName = (name || '').trim();
    if (!cleanName || cleanName.length < 2) {
      errors.name = 'Please provide your name (at least 2 characters).';
    } else if (cleanName.length > 100) {
      errors.name = 'Name must not exceed 100 characters.';
    }

    const cleanEmail = (email || '').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      errors.email = 'Please provide a valid email address.';
    } else if (cleanEmail.length > 150) {
      errors.email = 'Email must not exceed 150 characters.';
    }

    const validInquiryTypes = ['career', 'project', 'collaboration', 'general'];
    const cleanInquiryType = (inquiryType || '').trim().toLowerCase();
    if (!cleanInquiryType || !validInquiryTypes.includes(cleanInquiryType)) {
      errors.inquiryType = 'Please select a valid inquiry type.';
    }

    const cleanDetails = (details || '').trim();
    if (!cleanDetails || cleanDetails.length < 10) {
      errors.details = 'Please provide opportunity or project details (at least 10 characters).';
    } else if (cleanDetails.length > 5000) {
      errors.details = 'Details payload must not exceed 5000 characters.';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed. Please correct the highlighted fields.',
          errors,
        },
        { status: 400 }
      );
    }

    // 5. Check if backend email delivery is configured
    const apiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL;

    if (!apiKey || !receiverEmail) {
      // Truthful fallback: Server delivery is not yet provisioned with real API keys
      // Do NOT pretend the email was sent! Return transparent fallback response.
      return NextResponse.json(
        {
          success: false,
          fallback: true,
          mode: 'fallback_ready',
          message:
            'Automated email dispatch is not configured with an active email provider API key. Fallback communication channels (Google Calendar booking and direct message payload copy) are available.',
          inquiryData: {
            name: cleanName,
            email: cleanEmail,
            inquiryType: cleanInquiryType,
            details: cleanDetails,
          },
        },
        { status: 200 }
      );
    }

    // 6. Real email dispatch via Resend
    const inquiryLabels: Record<string, string> = {
      career: 'Career Opportunity (Recruiter)',
      project: 'Software Development Project (Client)',
      collaboration: 'Software Collaboration (Developer / Founder)',
      general: 'General Professional Inquiry',
    };

    const subject = `[RANA.OS] ${inquiryLabels[cleanInquiryType] || 'Inquiry'} from ${cleanName}`;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'RANA.OS Contact Gateway <onboarding@resend.dev>',
        to: [receiverEmail],
        reply_to: cleanEmail,
        subject,
        text: `New inquiry submitted on RANA.OS\n\nName: ${cleanName}\nEmail: ${cleanEmail}\nInquiry Type: ${inquiryLabels[cleanInquiryType] || cleanInquiryType}\n\nProject / Opportunity Details:\n${cleanDetails}\n\nSubmitted at: ${new Date().toISOString()}`,
      }),
    });

    if (!resendResponse.ok) {
      const errText = await resendResponse.text().catch(() => '');
      console.error('Email service delivery error:', errText);
      return NextResponse.json(
        {
          success: false,
          error:
            'Email delivery provider failed to dispatch. Please use the Google Calendar booking link or reach out on LinkedIn.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been delivered successfully. I will review and follow up shortly.',
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal error';
    console.error('Contact route internal error:', errorMsg);
    return NextResponse.json(
      {
        success: false,
        error: 'An internal server error occurred while processing your request.',
      },
      { status: 500 }
    );
  }
}
