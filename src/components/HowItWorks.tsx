
import React from 'react';
import { Calendar, MapPin, ShoppingBag, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const HowItWorks = () => {
  const steps = [
    {
      icon: <ShoppingBag className="w-8 h-8 text-farm-green" />,
      title: "Pick Your Monthly Items",
      description: "Browse our selection of local beef shares, vegetables, dairy, eggs, and more. Use our sliders to customize your monthly box with exactly what your family needs.",
      highlight: "One-stop local vendor shop"
    },
    {
      icon: <Calendar className="w-8 h-8 text-farm-green" />,
      title: "Set Your Schedule",
      description: "Choose weekly, bi-weekly, or monthly pickup frequency that works for your lifestyle. Your box is automatically prepared based on your preferences.",
      highlight: "Flexible pickup schedule"
    },
    {
      icon: <MapPin className="w-8 h-8 text-farm-green" />,
      title: "Convenient Pickup",
      description: "Skip the grocery store lines and farmers market uncertainty. Your fresh local box is always ready and packed at a convenient Austin pickup location.",
      highlight: "Always in stock, always ready"
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-farm-green mb-4">
            How Does This Work?
          </h2>
          <p className="text-xl text-farm-earth max-w-3xl mx-auto">
            Secure your monthly food staples directly from local farmers with our simple, 
            hassle-free pickup solution.
          </p>
        </div>

        {/* Visual Box Section */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left side - Box visualization */}
            <div className="flex-1">
              <div className="relative">
                {/* Main box container */}
                <div className="bg-gradient-to-b from-orange-200 to-orange-300 rounded-lg p-8 shadow-lg border-4 border-orange-400">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-farm-green mb-2">FRESH LOCAL BOX</h3>
                    <p className="text-farm-earth font-semibold">Your Monthly Austin Farm Share</p>
                  </div>
                  
                  {/* Box contents visualization */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Beef share */}
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-12 bg-red-400 rounded-lg flex items-center justify-center">
                        🥩
                      </div>
                      <div>
                        <p className="font-semibold text-sm">1/15 beef share</p>
                        <p className="text-xs text-farm-earth">24 lbs mixed cuts</p>
                      </div>
                    </div>
                    
                    {/* Eggs */}
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-12 bg-yellow-200 rounded-lg flex items-center justify-center">
                        🥚
                      </div>
                      <div>
                        <p className="font-semibold text-sm">2 dozen eggs</p>
                        <p className="text-xs text-farm-earth">Pasture-raised</p>
                      </div>
                    </div>
                    
                    {/* Milk */}
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        🥛
                      </div>
                      <div>
                        <p className="font-semibold text-sm">2 gal raw milk</p>
                        <p className="text-xs text-farm-earth">Non-homogenized</p>
                      </div>
                    </div>
                    
                    {/* Vegetables */}
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                        🥕
                      </div>
                      <div>
                        <p className="font-semibold text-sm">8 lb vegetables</p>
                        <p className="text-xs text-farm-earth">Seasonal mix</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bread at bottom */}
                  <div className="flex justify-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                        🍞
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Sourdough loaves</p>
                        <p className="text-xs text-farm-earth">Fresh baked</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Price badge */}
                <div className="absolute -top-4 -right-4 bg-farm-green text-white px-4 py-2 rounded-full shadow-lg">
                  <p className="font-bold">$165</p>
                  <p className="text-xs">30 meals</p>
                </div>
              </div>
            </div>

            {/* Right side - Benefits */}
            <div className="flex-1">
              <div className="space-y-6">
                <div className="border-l-4 border-farm-green pl-6">
                  <h3 className="text-xl font-bold text-farm-green mb-2">EAT LOCAL, EFFORT-FREE</h3>
                  <p className="text-farm-earth">
                    No more grocery store lines or wondering if your favorite farmers market vendor 
                    has what you need in stock. Everything is always ready and packed for pickup.
                  </p>
                </div>
                
                <div className="bg-farm-cream p-6 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <Clock className="w-5 h-5 text-farm-green" />
                    <h4 className="font-semibold text-farm-green">Save Time & Hassle</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-farm-earth">
                    <li>• Skip grocery store crowds</li>
                    <li>• No more "sold out" disappointments</li>
                    <li>• Everything pre-packed and ready</li>
                    <li>• Convenient local pickup spots</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-farm-green mb-3">Direct From Local Farmers</h4>
                  <p className="text-sm text-farm-earth">
                    Connect directly with Austin-area farmers and ranchers. Your monthly box 
                    supports local agriculture while providing your family with the freshest, 
                    highest quality food available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-farm-cream rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-farm-green mb-3">{step.title}</h3>
                <p className="text-farm-earth mb-4">{step.description}</p>
                <div className="bg-farm-lightgreen/10 px-4 py-2 rounded-full">
                  <span className="text-sm font-semibold text-farm-green">{step.highlight}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-farm-green text-white px-8 py-4 rounded-lg inline-block">
            <p className="text-lg font-semibold mb-2">Ready to start eating local, effort-free?</p>
            <p className="text-farm-cream text-sm">Join 74 of 100 founding spots filled — 26 left</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
