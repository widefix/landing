'use client';

import { useEffect, useState } from 'react';
import { getClutchReferral, type ClutchReferral } from '@/lib/clutchReferral';
import { estimateContactMessage } from '@/lib/teamCostCalculator';
import ContactComponent from './ContactComponent';

export default function ReferralContact() {
  const [referral, setReferral] = useState<ClutchReferral>();
  const [estimateMessage, setEstimateMessage] = useState<string>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setReferral(getClutchReferral(Object.fromEntries(params)));
    const estimate = params.get('estimate');
    setEstimateMessage(estimate ? estimateContactMessage(estimate, window.location.origin) : undefined);
  }, []);

  return <ContactComponent referral={referral} estimateMessage={estimateMessage} />;
}
