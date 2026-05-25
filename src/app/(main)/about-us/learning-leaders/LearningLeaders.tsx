"use client";

import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { LeaderHero } from './components/LeaderHero';
import { LeaderCard } from './components/LeaderCard';
import { LeadershipPhilosophy } from './components/LeadershipPhilosophy';
import { LeaderModal } from './components/LeaderModal';

export default function LearningLeaders({ initialLeaders = [] }: { initialLeaders?: any[] }) {
  const [selectedLeader, setSelectedLeader] = useState<any | null>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedLeader(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 pb-32">
      
      <LeaderHero />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        
        <div className="flex flex-col items-center text-center mb-28 px-4">
           <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Our Guiding Lights</h2>
           <div className="h-1.5 w-20 bg-[#4279D2] mx-auto mb-6" />
           <p className="text-slate-500 max-w-2xl font-medium text-lg">
             Honoring the visionary leaders who continue to inspire the <span className="text-blue-600 italic">BIDAng</span> Imusenyo spirit in every educator and student.
           </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-40">
          {initialLeaders.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm">
               <Users size={64} className="mx-auto text-slate-200 mb-4" strokeWidth={1} />
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs italic">Leadership Archive is currently being updated...</p>
            </div>
          ) : (
            initialLeaders.map((leader) => (
              <LeaderCard 
                key={leader.id} 
                leader={leader} 
                onSelect={setSelectedLeader} 
              />
            ))
          )}
        </div>

        <LeadershipPhilosophy />
      </div>

      {selectedLeader && (
        <LeaderModal 
          leader={selectedLeader} 
          onClose={() => setSelectedLeader(null)} 
        />
      )}

      <div className="w-full h-24 bg-gradient-to-t from-slate-200/50 to-transparent" />
    </div>
  );
}
