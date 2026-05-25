import React from "react";
import Image from "next/image";
import { Award, Maximize2 } from "lucide-react";

interface Leader {
  id: string | number;
  name: string;
  position: string;
  image: string | null;
  startYear?: string | null;
  endYear?: string | null;
}

interface LeaderCardProps {
  leader: Leader;
  onSelect: (leader: Leader) => void;
}

export function LeaderCard({ leader, onSelect }: LeaderCardProps) {
  return (
    <div className="group relative bg-white rounded-[3rem] border border-slate-200 pb-12 text-center transition-all duration-700 hover:shadow-2xl hover:border-blue-200 hover:-translate-y-4">
      {/* Portrait Container */}
      <div 
        className="relative aspect-[3/4] w-full rounded-[3rem] overflow-hidden mb-8 cursor-zoom-in"
        onClick={() => onSelect(leader)}
      >
        <Image
          src={leader.image || '/images/leader-placeholder.webp'}
          alt={leader.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-2">
           <div className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30 scale-50 group-hover:scale-100 transition-transform duration-500">
              <Maximize2 size={24} />
           </div>
           <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
              Preview Portrait
           </span>
        </div>
      </div>

      {/* Info Group */}
      <div className="space-y-4 px-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-100">
          <Award size={12} className="text-blue-500" />
          <span>Archived Leader</span>
        </div>
        <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tighter leading-none group-hover:text-blue-600 transition-colors uppercase">
          {leader.name}
        </h3>
        <p className="text-sm md:text-base text-blue-600/60 font-black italic tracking-tight uppercase leading-tight">
          {leader.position}
        </p>
        
        {leader.startYear && (
          <div className="pt-4 flex items-center justify-center">
             <span className="w-1.5 h-1.5 bg-blue-100 rounded-full mr-4" />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
               S.Y. {leader.startYear} — {leader.endYear || 'Present'}
             </p>
             <span className="w-1.5 h-1.5 bg-blue-100 rounded-full ml-4" />
          </div>
        )}
      </div>
    </div>
  );
}
