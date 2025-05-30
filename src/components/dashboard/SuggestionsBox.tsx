
import React, { useState } from 'react';
import { Lightbulb, Send, ThumbsUp, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SuggestionsBox = () => {
  const [suggestion, setSuggestion] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Suggestion submitted:', { category, suggestion });
    setSuggestion('');
    setCategory('');
  };

  const suggestionCategories = [
    'New Products',
    'Pickup Locations',
    'Website Features',
    'Packaging',
    'Farmer Partnerships',
    'Other'
  ];

  const recentSuggestions = [
    {
      id: 1,
      text: 'Would love to see more organic dairy options in the weekly boxes!',
      category: 'New Products',
      votes: 12,
      status: 'Under Review'
    },
    {
      id: 2,
      text: 'Could we have a pickup location in Cedar Park?',
      category: 'Pickup Locations',
      votes: 8,
      status: 'Considering'
    },
    {
      id: 3,
      text: 'Add a mobile app for easier ordering and pickup notifications',
      category: 'Website Features',
      votes: 23,
      status: 'In Development'
    },
    {
      id: 4,
      text: 'More seasonal fruit options during summer months',
      category: 'New Products',
      votes: 15,
      status: 'Implemented'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Considering': return 'bg-blue-100 text-blue-800';
      case 'In Development': return 'bg-purple-100 text-purple-800';
      case 'Implemented': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Submit Suggestion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-farm-green" />
            <span>Share Your Ideas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="What type of suggestion?" />
                </SelectTrigger>
                <SelectContent>
                  {suggestionCategories.map((cat) => (
                    <SelectItem key={cat} value={cat.toLowerCase().replace(' ', '-')}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your Suggestion</label>
              <Textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder="Tell us your idea to improve Local Pickup Box..."
                rows={4}
              />
            </div>

            <Button 
              type="submit" 
              className="bg-farm-green hover:bg-farm-green/90"
              disabled={!category || !suggestion}
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Suggestion
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Community Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Community Suggestions</CardTitle>
          <p className="text-sm text-gray-600">See what other customers are suggesting and vote on ideas you like!</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSuggestions.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                  <span className="text-sm text-gray-500">{item.category}</span>
                </div>
                
                <p className="text-gray-800 mb-3">{item.text}</p>
                
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    {item.votes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Comment
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggestion Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Suggestion Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Be specific and detailed in your suggestions</p>
            <p>• Check existing suggestions before submitting duplicates</p>
            <p>• Vote on suggestions you'd like to see implemented</p>
            <p>• We review all suggestions and update their status regularly</p>
            <p>• Popular suggestions (high votes) get priority consideration</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuggestionsBox;
