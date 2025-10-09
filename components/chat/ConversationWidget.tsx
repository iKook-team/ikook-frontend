'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ConversationWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="bg-primary text-white p-3 flex justify-between items-center">
            <h3 className="font-semibold">Chat with us</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20"
              onClick={toggleChat}
            >
              ×
            </Button>
          </div>
          <div className="h-80 p-4 overflow-y-auto">
            <div className="flex flex-col space-y-4">
              <div className="text-sm text-gray-500 text-center py-8">
                Our support team is here to help!
                <p className="mt-2 text-xs">We'll respond as soon as possible.</p>
              </div>
              {/* Message list will go here */}
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 p-3">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <Button>
                Send
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          onClick={toggleChat}
          className="rounded-full w-14 h-14 p-0 flex items-center justify-center shadow-lg"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
}
