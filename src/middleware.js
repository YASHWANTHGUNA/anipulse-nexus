// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // 1. Check Admin Account (Full access)
    const isAdmin = user === 'admin' && pwd === process.env.ADMIN_PASSWORD;
    
    // 2. Check Recruiter/Guest Account (Read-only demo access)
    const isGuest = user === 'recruiter' && pwd === process.env.GUEST_PASSWORD;

    // If either check passes, let them through the door!
    if (isAdmin || isGuest) {
      return NextResponse.next();
    }
  }

  // If wrong or no credentials, trigger the browser prompt with clean instructions
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