
import React, { useState } from 'react';
import { Calendar, MapPin, Clock, User, MessageSquare, Lightbulb, Users, ArrowLeft, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import SubscriptionOverview from '@/components/dashboard/SubscriptionOverview';
import PickupSchedule from '@/components/dashboard/PickupSchedule';
import ReferralSection from '@/components/dashboard/ReferralSection';
import SupportSection from '@/components/dashboard/SupportSection';
import SuggestionsBox from '@/components/dashboard/SuggestionsBox';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f0fdf4' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="w-8 h-8 text-farm-green" />
              <div>
                <h1 className="text-2xl font-bold text-farm-green">My Dashboard</h1>
                <p className="text-farm-earth">Welcome back! Here's your Local Pickup Box overview.</p>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="pickup" className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Pickup</span>
            </TabsTrigger>
            <TabsTrigger value="referrals" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Referrals</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Support</span>
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="flex items-center space-x-2">
              <Lightbulb className="w-4 h-4" />
              <span>Suggestions</span>
            </TabsTrigger>
          </TabsList>

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
