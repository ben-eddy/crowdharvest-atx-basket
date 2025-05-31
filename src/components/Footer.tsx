
import React from 'react';
import { MessageCircle, HelpCircle, Award, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Footer: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <footer className="bg-white border-t border-green-100 mt-auto">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-4'} gap-3 sm:gap-6`}>
          {/* FAQ */}
          <div className="flex items-start space-x-2 sm:space-x-3">
            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-farm-lightgreen mt-1 flex-shrink-0" />
            <div className="min-w-0">
              <h4 className="font-medium text-farm-green mb-1 sm:mb-2 text-sm sm:text-base">FAQ</h4>
              <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                {isMobile ? 'Common questions' : 'Common questions about ordering, pickup, and our farm partners.'}
              </p>
              <Button variant="link" className="p-0 h-auto text-farm-lightgreen text-xs sm:text-sm">
                Learn more →
              </Button>
            </div>
          </div>

          {/* Farm Standards */}
          <div className="flex items-start space-x-2 sm:space-x-3">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-farm-lightgreen mt-1 flex-shrink-0" />
            <div className="min-w-0">
              <h4 className="font-medium text-farm-green mb-1 sm:mb-2 text-sm sm:text-base">Farm Standards</h4>
              <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                {isMobile ? 'Sustainable practices' : 'Our commitment to sustainable, local farming practices.'}
              </p>
              <Button variant="link" className="p-0 h-auto text-farm-lightgreen text-xs sm:text-sm">
                View standards →
              </Button>
            </div>
          </div>

          {/* Customer Chat */}
          <div className="flex items-start space-x-2 sm:space-x-3">
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-farm-lightgreen mt-1 flex-shrink-0" />
            <div className="min-w-0">
              <h4 className="font-medium text-farm-green mb-1 sm:mb-2 text-sm sm:text-base">Customer Chat</h4>
              <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                {isMobile ? 'Instant support' : 'Need help? Chat with our team for instant support.'}
              </p>
              <Button variant="link" className="p-0 h-auto text-farm-lightgreen text-xs sm:text-sm">
                Start chat →
              </Button>
            </div>
          </div>

          {/* Pickup Map */}
          <div className="flex items-start space-x-2 sm:space-x-3">
            <Map className="w-4 h-4 sm:w-5 sm:h-5 text-farm-lightgreen mt-1 flex-shrink-0" />
            <div className="min-w-0">
              <h4 className="font-medium text-farm-green mb-1 sm:mb-2 text-sm sm:text-base">Pickup Hubs</h4>
              <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                {isMobile ? 'Find locations' : 'Find all pickup locations across Austin on our interactive map.'}
              </p>
              <Button variant="link" className="p-0 h-auto text-farm-lightgreen text-xs sm:text-sm">
                View map →
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-8 pt-3 sm:pt-6 border-t border-green-100 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            © 2024 CrowdHarvest Austin. Supporting local farms{isMobile ? '' : ', one community buy at a time'}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
