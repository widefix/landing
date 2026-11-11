'use client';

import { useEffect } from 'react';
import { getClutchReferral } from '@/lib/clutchReferral';

export default function ClutchReferralRedirect() {
  useEffect(() => {
    const destination = new URL(window.location.href);
    if (!getClutchReferral(Object.fromEntries(destination.searchParams))) return;

    destination.pathname = '/contact';
    window.location.replace(destination.href);
  }, []);

  return null;
}
