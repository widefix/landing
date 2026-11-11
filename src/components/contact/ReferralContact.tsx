'use client';

import { useEffect, useState } from 'react';
import { getClutchReferral, type ClutchReferral } from '@/lib/clutchReferral';
import ContactComponent from './ContactComponent';

export default function ReferralContact() {
  const [referral, setReferral] = useState<ClutchReferral>();

  useEffect(() => {
    setReferral(getClutchReferral(Object.fromEntries(new URLSearchParams(window.location.search))));
  }, []);

  return <ContactComponent referral={referral} />;
}
