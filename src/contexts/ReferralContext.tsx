
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ReferralContextType {
  referralCode: string | null;
  userReferralLink: string;
  referralEarnings: number;
  totalReferrals: number;
  generateReferralCode: () => string;
  trackReferral: (referredUserId: string) => void;
  addReferralEarnings: (amount: number) => void;
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

export const ReferralProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralEarnings, setReferralEarnings] = useState(0);
  const [totalReferrals, setTotalReferrals] = useState(0);

  // Generate unique referral code for user
  const generateReferralCode = () => {
    const code = `REF${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    setReferralCode(code);
    localStorage.setItem('referralCode', code);
    return code;
  };

  // Track when someone signs up using a referral
  const trackReferral = (referredUserId: string) => {
    console.log(`New referral tracked: ${referredUserId}`);
    setTotalReferrals(prev => prev + 1);
    localStorage.setItem('totalReferrals', (totalReferrals + 1).toString());
  };

  // Add earnings from successful referrals
  const addReferralEarnings = (amount: number) => {
    console.log(`Adding referral earnings: $${amount}`);
    setReferralEarnings(prev => prev + amount);
    localStorage.setItem('referralEarnings', (referralEarnings + amount).toString());
  };

  // Load saved data on mount
  useEffect(() => {
    const savedCode = localStorage.getItem('referralCode');
    const savedEarnings = localStorage.getItem('referralEarnings');
    const savedReferrals = localStorage.getItem('totalReferrals');
    
    if (savedCode) setReferralCode(savedCode);
    if (savedEarnings) setReferralEarnings(parseFloat(savedEarnings));
    if (savedReferrals) setTotalReferrals(parseInt(savedReferrals));
  }, []);

  // Check for referral code in URL when app loads
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
      console.log(`User arrived with referral code: ${refCode}`);
      localStorage.setItem('incomingReferralCode', refCode);
    }
  }, []);

  const userReferralLink = referralCode 
    ? `${window.location.origin}?ref=${referralCode}`
    : '';

  return (
    <ReferralContext.Provider value={{
      referralCode,
      userReferralLink,
      referralEarnings,
      totalReferrals,
      generateReferralCode,
      trackReferral,
      addReferralEarnings
    }}>
      {children}
    </ReferralContext.Provider>
  );
};

export const useReferral = () => {
  const context = useContext(ReferralContext);
  if (context === undefined) {
    throw new Error('useReferral must be used within a ReferralProvider');
  }
  return context;
};
