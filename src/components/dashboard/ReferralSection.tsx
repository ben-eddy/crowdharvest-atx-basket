
import React from 'react';
import { useReferral } from '@/contexts/ReferralContext';
import ReferralDashboard from '@/components/ReferralDashboard';

const ReferralSection = () => {
  return (
    <div>
      <ReferralDashboard />
    </div>
  );
};

export default ReferralSection;
