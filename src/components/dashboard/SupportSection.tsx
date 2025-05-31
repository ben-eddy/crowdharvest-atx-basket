
import React, { useState } from 'react';
import { MessageSquare, Send, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';

const SupportSection = () => {
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle support message submission
    console.log('Support message:', { category, message });
    setMessage('');
    setCategory('');
  };

  const supportCategories = [
    'Delivery Issues',
    'Product Quality',
    'Billing Questions',
    'Account Changes',
    'Pickup Location',
    'General Questions'
  ];

  const faqs = [
    {
      question: 'How do I change my pickup location?',
      answer: 'You can change your pickup location in the Pickup tab of your dashboard.'
    },
    {
      question: 'Can I skip a delivery?',
      answer: 'Yes, you can skip deliveries from your subscription overview. Just click "Skip Delivery".'
    },
    {
      question: 'What if I miss my pickup?',
      answer: 'Please contact us immediately. We may be able to arrange an alternative pickup time.'
    },
    {
      question: 'How do referral credits work?',
      answer: 'You earn $10 credit for each friend who signs up and commits to a monthly subscription.'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Contact Methods */}
      <div className={`grid grid-cols-1 ${isMobile ? 'gap-3' : 'md:grid-cols-3 gap-4'}`}>
        <Card>
          <CardContent className="pt-4 sm:pt-6 text-center">
            <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-farm-green mx-auto mb-2 sm:mb-3" />
            <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Live Chat</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Available Mon-Fri 9AM-6PM</p>
            <Button 
              size={isMobile ? "sm" : "default"} 
              className="bg-farm-green hover:bg-farm-green/90 text-xs sm:text-sm"
            >
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 sm:pt-6 text-center">
            <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-farm-green mx-auto mb-2 sm:mb-3" />
            <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Phone Support</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">(512) 555-FARM</p>
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              className="text-xs sm:text-sm"
            >
              Call Now
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 sm:pt-6 text-center">
            <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-farm-green mx-auto mb-2 sm:mb-3" />
            <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Email Support</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">support@localpickupbox.com</p>
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              className="text-xs sm:text-sm"
            >
              Send Email
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Support Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Send Us a Message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {supportCategories.map((cat) => (
                    <SelectItem key={cat} value={cat.toLowerCase().replace(' ', '-')}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you today?"
                rows={isMobile ? 3 : 4}
                className="text-sm"
              />
            </div>

            <Button 
              type="submit" 
              className="bg-farm-green hover:bg-farm-green/90"
              disabled={!category || !message}
              size={isMobile ? "sm" : "default"}
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 sm:pb-4 last:border-b-0">
                <h4 className="font-medium text-farm-green mb-1 sm:mb-2 text-sm sm:text-base">{faq.question}</h4>
                <p className="text-xs sm:text-sm text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportSection;
