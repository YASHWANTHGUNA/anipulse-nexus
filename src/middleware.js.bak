// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    try {
      const authValue = basicAuth.split(' ')[1];
      const decodedValue = atob(authValue);

      // 1. SAFE SPLIT: Protects against passwords that contain colons (:)
      const firstColonIndex = decodedValue.indexOf(':');
      const user = decodedValue.substring(0, firstColonIndex);
      const pwd = decodedValue.substring(firstColonIndex + 1);

      // 2. Admin Check (Strict Environment Variable)
      const isAdmin = user === 'admin' && pwd === process.env.ADMIN_PASSWORD;

      // 3. Recruiter Check (Env Var + Hardcoded Fallback)
      // This guarantees recruiters can ALWAYS access your portfolio, 
      // even if Vercel's edge network drops the environment variable.
      const isGuest = user === 'recruiter' && (pwd === process.env.GUEST_PASSWORD || pwd === 'anipulse-guest');

      if (isAdmin || isGuest) {
        return NextResponse.next();
      }
    } catch (error) {
      // If the base64 string is malformed, catch the error so the server doesn't crash
      console.error('Middleware Auth Error:', error);
    }
  }

  // Trigger browser credentials prompt
  return new NextResponse('Authentication required to view AniPulse Nexus.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Portfolio Demo. Username: recruiter | Password: anipulse-guest"',
    },
  });
}

export const config = {
  matcher: ['/admin/:path*'],
};