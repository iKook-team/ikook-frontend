"use client";

import React, { useState } from 'react';

const ReferralProgress = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');

  return (
    <section className="w-full max-w-[391px] mt-9 max-sm:w-full max-sm:max-w-[300px]">
      <div className="w-full h-[38px] relative">
        <div className="w-full h-[38px] absolute bg-[#B7B7B6] rounded-[4.547px] left-0 top-0" />
        
        <button
          onClick={() => setActiveTab('pending')}
          className={`w-[181px] h-[30px] shadow-[0.568px_0px_5.683px_0px_rgba(0,0,0,0.10)] absolute rounded-sm left-1 top-1 transition-all duration-200 ${
            activeTab === 'pending' ? 'bg-[#FCC01C]' : 'bg-transparent'
          }`}
          aria-pressed={activeTab === 'pending'}
        />
        
        <button
          onClick={() => setActiveTab('completed')}
          className={`w-[181px] h-[30px] shadow-[0.568px_0px_5.683px_0px_rgba(0,0,0,0.10)] absolute rounded-sm right-1 top-1 transition-all duration-200 ${
            activeTab === 'completed' ? 'bg-[#FCC01C]' : 'bg-transparent'
          }`}
          aria-pressed={activeTab === 'completed'}
        />
        
        <div className="text-white text-xs font-normal leading-[11px] absolute w-[50px] h-3 left-[70px] top-[13px] pointer-events-none">
          Pending
        </div>
        
        <div className="text-white text-xs font-normal leading-[11px] absolute w-[69px] h-3 left-[261px] top-[13px] pointer-events-none">
          Completed
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-white rounded-md border border-[#EBEBEB]">
        {activeTab === 'pending' ? (
          <div>
            <h3 className="text-lg font-semibold mb-2">Pending Referrals</h3>
            <p className="text-sm text-gray-600">You have referrals waiting to be completed.</p>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-2">Completed Referrals</h3>
            <p className="text-sm text-gray-600">View your successfully completed referrals.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReferralProgress;
