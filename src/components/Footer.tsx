
import React from 'react';
import { MessageCircle, HelpCircle, Award, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-green-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* FAQ */}
          <div className="flex items-start space-x-3">
            <HelpCircle className="w-5 h-5 text-farm-lightgreen mt-1" />
            <div>
              <h4 className="font-medium text-farm-green mb-2">FAQ</h4>
              <p className="text-sm text-gray-600">
                Common questions about ordering, pickup, and our farm partners.
              </p>
              <Button variant="link" className="p-0 h-auto text-farm-lightgreen">
                Learn more →
              </Button>
            </div>
          </div>

          {/* Farm Standards */}
          <div className="flex items-start space-x-3">
            <Award className="w-5 h-5 text-farm-lightgreen mt-1" />
            <div>
              <h4 className="font-medium text-farm-green mb-2">Farm Standards</h4>
              <p className="text-sm text-gray-600">
                Our commitment to sustainable, local farming practices.
              </p>
              <Button variant="link" className="p-0 h-auto text-farm-lightgreen">
                View standards →
              </Button>
            </div>
          </div>

          {/* Customer Chat */}
          <div className="flex items-start space-x-3">
            <MessageCircle className="w-5 h-5 text-farm-lightgreen mt-1" />
            <div>
              <h4 className="font-medium text-farm-green mb-2">Customer Chat</h4>
              <p className="text-sm text-gray-600">
                Need help? Chat with our team for instant support.
              </p>
              <Button variant="link" className="p-0 h-auto text-farm-lightgreen">
                Start chat →
              </Button>
            </div>
          </div>

          {/* Pickup Map */}
          <div className="flex items-start space-x-3">
            <Map className="w-5 h-5 text-farm-lightgreen mt-1" />
            <div>
              <h4 className="font-medium text-farm-green mb-2">Pickup Hubs</h4>
              <p className="text-sm text-gray-600">
                Find all pickup locations across Austin on our interactive map.
              </p>
              <Button variant="link" className="p-0 h-auto text-farm-lightgreen">
                View map →
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-green-100 text-center">
          <p className="text-sm text-gray-500">
            © 2024 CrowdHarvest Austin. Supporting local farms, one community buy at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
