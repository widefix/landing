import { NextResponse, type NextRequest } from 'next/server';
import { getClutchReferral } from '@/lib/clutchReferral';

export function middleware(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams);
  if (!getClutchReferral(params)) return NextResponse.next();

  const destination = request.nextUrl.clone();
  destination.pathname = '/contact';
  return NextResponse.redirect(destination);
}

export const config = { matcher: '/' };
