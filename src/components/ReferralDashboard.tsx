
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Share2, Copy, DollarSign, Users } from 'lucide-react';
import { useReferral } from '@/contexts/ReferralContext';
import { toast } from '@/hooks/use-toast';

const ReferralDashboard: React.FC = () => {
  const { 
    referralCode, 
    userReferralLink, 
    referralEarnings, 
    totalReferrals, 
    generateReferralCode 
  } = useReferral();

  const [showDashboard, setShowDashboard] = useState(false);

  const handleGenerateCode = () => {
    if (!referralCode) {
      generateReferralCode();
      toast({
        title: "Referral code generated!",
        description: "Start sharing your link to earn rewards.",
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(userReferralLink);
      toast({
        title: "Link copied!",
        description: "Your referral link has been copied to clipboard.",
      });
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Local Pickup Box',
          text: 'Get fresh local farm products delivered! Use my referral link:',
          url: userReferralLink,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  if (!showDashboard) {
    return (
      <div className="text-center">
        <Button 
          onClick={() => setShowDashboard(true)}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          <Share2 className="w-4 h-4 mr-2" />
          View Referral Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-farm-green mb-2">Your Referral Dashboard</h2>
        <p className="text-farm-earth">Earn rewards by referring friends to Local Pickup Box!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${referralEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Account credit earned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalReferrals}</div>
            <p className="text-xs text-muted-foreground">Friends joined</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referral Code</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {referralCode || 'Not Generated'}
            </div>
            <p className="text-xs text-muted-foreground">Your unique code</p>
          </CardContent>
        </Card>
      </div>

      {!referralCode ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <p className="text-farm-earth">Generate your referral code to start earning!</p>
              <Button onClick={handleGenerateCode} className="bg-green-500 hover:bg-green-600">
                Generate Referral Code
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Share Your Referral Link</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={userReferralLink}
                readOnly
                className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-50"
              />
              <Button onClick={copyToClipboard} variant="outline">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={shareLink} className="flex-1 bg-green-500 hover:bg-green-600">
                <Share2 className="w-4 h-4 mr-2" />
                Share Link
              </Button>
            </div>

            <div className="text-sm text-farm-earth bg-green-50 p-3 rounded-md">
              <strong>How it works:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Share your unique link with friends and family</li>
                <li>When they sign up and commit to a monthly subscription, you both win!</li>
                <li>You earn $10 account credit for each successful referral</li>
                <li>Your friend gets a $5 discount on their first order</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="text-center">
        <Button 
          onClick={() => setShowDashboard(false)}
          variant="outline"
        >
          Close Dashboard
        </Button>
      </div>
    </div>
  );
};

export default ReferralDashboard;
