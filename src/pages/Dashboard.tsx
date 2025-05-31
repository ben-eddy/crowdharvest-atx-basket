
import React, { useState } from 'react';
import { Calendar, MapPin, Clock, User, MessageSquare, Lightbulb, Users, ArrowLeft, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import SubscriptionOverview from '@/components/dashboard/SubscriptionOverview';
import PickupSchedule from '@/components/dashboard/PickupSchedule';
import ReferralSection from '@/components/dashboard/ReferralSection';
import SupportSection from '@/components/dashboard/SupportSection';
import SuggestionsBox from '@/components/dashboard/SuggestionsBox';

const Dashboard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f0fdf4' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-farm-green flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold text-farm-green leading-tight">
                  {isMobile ? 'Dashboard' : 'My Dashboard'}
                </h1>
                <p className="text-xs sm:text-sm text-farm-earth leading-tight">
                  {isMobile ? 'Your overview' : 'Welcome back! Here\'s your Local Pickup Box overview.'}
                </p>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"}
                onClick={() => navigate('/')}
                className="flex items-center space-x-1 sm:space-x-2"
              >
                <Home className="w-3 h-3 sm:w-4 sm:h-4" />
                {!isMobile && <span>Home</span>}
              </Button>
              <Button 
                variant="ghost" 
                size={isMobile ? "sm" : "default"}
                onClick={() => navigate(-1)}
                className="flex items-center space-x-1 sm:space-x-2"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                {!isMobile && <span>Back</span>}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-5'} gap-1`}>
            <TabsTrigger value="overview" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">Home</span>
            </TabsTrigger>
            <TabsTrigger value="pickup" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Pickup</span>
            </TabsTrigger>
            <TabsTrigger value="referrals" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Referrals</span>
              <span className="sm:hidden">Refer</span>
            </TabsTrigger>
            {!isMobile && (
              <>
                <TabsTrigger value="support" className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Support</span>
                </TabsTrigger>
                <TabsTrigger value="suggestions" className="flex items-center space-x-2">
                  <Lightbulb className="w-4 h-4" />
                  <span>Suggestions</span>
                </TabsTrigger>
              </>
            )}
          </TabsList>

          {/* Mobile-only second row for support and suggestions */}
          {isMobile && (
            <TabsList className="grid w-full grid-cols-2 gap-1 mt-2">
              <TabsTrigger value="support" className="flex items-center space-x-1 text-xs">
                <MessageSquare className="w-3 h-3" />
                <span>Support</span>
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="flex items-center space-x-1 text-xs">
                <Lightbulb className="w-3 h-3" />
                <span>Ideas</span>
              </TabsTrigger>
            </TabsList>
          )}

          <TabsContent value="overview">
            <SubscriptionOverview />
          </TabsContent>

          <TabsContent value="pickup">
            <PickupSchedule />
          </TabsContent>

          <TabsContent value="referrals">
            <ReferralSection />
          </TabsContent>

          <TabsContent value="support">
            <SupportSection />
          </TabsContent>

          <TabsContent value="suggestions">
            <SuggestionsBox />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
