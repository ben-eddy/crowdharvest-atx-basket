
import React, { useState } from 'react';
import { MapPin, Clock, Edit, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PickupSchedule = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('mueller');
  const [selectedTime, setSelectedTime] = useState('10am-12pm');

  const locations = [
    { id: 'mueller', name: 'Mueller Central', address: '1910 Aldrich St', hours: '8AM - 6PM' },
    { id: 'lamar', name: 'South Lamar', address: '1100 S Lamar Blvd', hours: '9AM - 5PM' },
    { id: 'roundrock', name: 'Round Rock', address: '201 W Main St', hours: '10AM - 4PM' }
  ];

  const timeSlots = [
    '8am-10am', '10am-12pm', '12pm-2pm', '2pm-4pm', '4pm-6pm'
  ];

  const upcomingPickups = [
    { date: '2024-02-01', location: 'Mueller Central', time: '10am-12pm', status: 'confirmed' },
    { date: '2024-02-08', location: 'Mueller Central', time: '10am-12pm', status: 'scheduled' },
    { date: '2024-02-15', location: 'Mueller Central', time: '10am-12pm', status: 'scheduled' }
  ];

  const handleSaveChanges = () => {
    // Here you would save to backend
    console.log('Saving pickup changes:', { selectedLocation, selectedTime });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Current Pickup Settings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Current Pickup Settings</CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="w-4 h-4 mr-2" />
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </CardHeader>
        <CardContent>
          {!isEditing ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-farm-green" />
                <div>
                  <h3 className="font-semibold">Mueller Central</h3>
                  <p className="text-sm text-gray-600">1910 Aldrich St</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-farm-green" />
                <div>
                  <h3 className="font-semibold">Weekly Pickup: Thursdays</h3>
                  <p className="text-sm text-gray-600">Preferred time: 10am-12pm</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Pickup Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        <div>
                          <div className="font-medium">{location.name}</div>
                          <div className="text-sm text-gray-500">{location.address}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Preferred Time Slot</label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSaveChanges} className="bg-farm-green hover:bg-farm-green/90">
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Pickups */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Pickups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingPickups.map((pickup, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Calendar className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{pickup.date}</h4>
                    <p className="text-sm text-gray-600">{pickup.location} • {pickup.time}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  pickup.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {pickup.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location Information */}
      <Card>
        <CardHeader>
          <CardTitle>Pickup Locations & Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {locations.map((location) => (
              <div key={location.id} className="border rounded-lg p-4">
                <h3 className="font-semibold text-farm-green">{location.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{location.address}</p>
                <p className="text-sm text-farm-earth mt-2">Hours: {location.hours}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PickupSchedule;
