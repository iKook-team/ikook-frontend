import * as React from "react";

import { ConversationList } from "../../components/chat/conversation-list";
import { ChatArea } from "../../components/chat/chat-area";
import { Button } from "../../components/ui/button";

export default function MessagingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 py-7">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-9 gap-4">
          <h1 className="text-2xl font-semibold text-black">Messages</h1>

          <div className="flex flex-col md:flex-row items-end md:items-center gap-4">
            <div className="text-right">
              <h2 className="text-xl font-semibold text-zinc-800">
                Chef Titilayo John
              </h2>
              <p className="text-sm text-neutral-500">Last seen 10hrs ago</p>
            </div>

            <div className="flex items-center gap-4">
              <Button className="w-[153px] min-w-max">Pay Quote</Button>
              <button className="p-2.5 bg-stone-50 rounded-full hover:bg-stone-100 transition-colors">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/ff501a58d59a405f99206348782d743c/9887df85a1575126fc9f0fc244329c47128dd8b9?placeholderIfAbsent=true"
                  className="w-6 h-6"
                  alt="More options"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col md:flex-row h-[calc(100vh-200px)] min-h-[600px]">
            <div className="w-full md:w-[37%] border-r border-gray-100">
              <ConversationList />
            </div>
            <div className="w-full md:w-[63%]">
              <ChatArea />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
