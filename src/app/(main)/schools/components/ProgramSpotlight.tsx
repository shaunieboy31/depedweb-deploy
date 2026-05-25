import React from "react";
import { Sparkles, Award } from "lucide-react";

interface Track {
  title: string;
  desc: string;
}

interface ProgramSpotlightProps {
  title: string;
  subtitle: string;
  description: string;
  tracks: Track[];
}

export function ProgramSpotlight({ 
  title, 
  subtitle, 
  description, 
  tracks 
}: ProgramSpotlightProps) {
  return (
    <div className="bg-blue-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-125 transition-transform duration-1000">
        <Sparkles size={120} />
      </div>
      <div className="relative z-10 space-y-8">
        <div className="space-y-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl border border-blue-400/30">
            <Award size={24} />
          </div>
          <h3 className="text-xl font-black uppercase tracking-tight">{title}</h3>
        </div>
        
        <p className="text-blue-200 text-sm font-medium leading-relaxed">
          {description}
        </p>
        
        <div className="grid grid-cols-1 gap-4">
          {tracks.map((track, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-default">
              <div className="p-1 px-2.5 bg-blue-600 rounded text-blue-100 text-[10px] font-black">
                {track.title}
              </div>
              <div className="space-y-0.5">
                <p className="text-[11px] font-bold text-white tracking-tight uppercase leading-none">{track.title}</p>
                <p className="text-[9px] text-blue-300 italic opacity-80 leading-none">{track.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">{subtitle}</p>
          <p className="text-sm font-bold opacity-60 italic">Quality Education for All</p>
        </div>
      </div>
    </div>
  );
}
