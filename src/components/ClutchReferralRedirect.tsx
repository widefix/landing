'use client';

import { useEffect } from 'react';
import { getClutchContactPath, getClutchReferral } from '@/lib/clutchReferral';

export default function ClutchReferralRedirect() {
  useEffect(() => {
    const destination = new URL(window.location.href);
    const referral = getClutchReferral(Object.fromEntries(destination.searchParams));
    if (!referral) return;

    destination.pathname = getClutchContactPath(referral.campaign);
    window.location.replace(destination.href);
  }, []);

  return null;
}
