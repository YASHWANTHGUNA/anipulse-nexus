// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // Validate keys against environment variables
    const isAdmin = user === 'admin' && pwd === process.env.ADMIN_PASSWORD;
    const isGuest = user === 'recruiter' && pwd === process.env.GUEST_PASSWORD;

    if (isAdmin || isGuest) {
      return NextResponse.next();
    }
  }

  // Trigger browser credentials prompt without internal router rewrites
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