
import React, { useState } from 'react';
import { MessageSquare, Send, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SupportSection = () => {
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');

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
    <div className="space-y-6">
      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <MessageSquare className="w-8 h-8 text-farm-green mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600 mb-3">Available Mon-Fri 9AM-6PM</p>
            <Button size="sm" className="bg-farm-green hover:bg-farm-green/90">
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <Phone className="w-8 h-8 text-farm-green mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Phone Support</h3>
            <p className="text-sm text-gray-600 mb-3">(512) 555-FARM</p>
            <Button variant="outline" size="sm">
              Call Now
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <Mail className="w-8 h-8 text-farm-green mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-gray-600 mb-3">support@localpickupbox.com</p>
            <Button variant="outline" size="sm">
              Send Email
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Support Form */}
      <Card>
        <CardHeader>
          <CardTitle>Send Us a Message</CardTitle>
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
                rows={4}
              />
            </div>

            <Button 
              type="submit" 
              className="bg-farm-green hover:bg-farm-green/90"
              disabled={!category || !message}
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
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                <h4 className="font-medium text-farm-green mb-2">{faq.question}</h4>
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportSection;
