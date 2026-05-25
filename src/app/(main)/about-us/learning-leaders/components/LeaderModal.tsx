import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface Leader {
  id: string | number;
  name: string;
  position: string;
  image: string | null;
  startYear?: string | null;
  endYear?: string | null;
}

interface LeaderModalProps {
  leader: Leader;
  onClose: () => void;
}

export function LeaderModal({ leader, onClose }: LeaderModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-300">
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl" 
      />
      
      <div className="relative w-full max-w-4xl max-h-full flex flex-col items-center gap-10 animate-in zoom-in-95 duration-500">
         <button 
           onClick={onClose}
           className="absolute -top-4 md:-top-16 right-0 md:-right-16 p-4 bg-white/10 hover:bg-rose-500 text-white rounded-full transition-all border border-white/20 group"
         >
           <X size={24} className="group-hover:rotate-90 transition-transform" />
         </button>

         <div className="w-full bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/20 relative group/preview">
            <div className="relative aspect-[3/4] w-full max-h-[80vh]">
               <Image 
                 src={leader.image || '/images/leader-placeholder.webp'} 
                 alt={leader.name} 
                 fill
                 className="object-contain"
               />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
               <div className="max-w-2xl mx-auto text-center space-y-2">
                   <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                     {leader.name}
                   </h3>
                   <p className="text-blue-400 text-sm md:text-lg font-black italic uppercase tracking-widest">
                     {leader.position}
                   </p>
                   {leader.startYear && (
                      <p className="text-[10px] text-white/50 font-black uppercase tracking-[0.4em] pt-4 border-t border-white/10 mt-6 md:inline-block md:px-10">
                        Service Period: {leader.startYear} — {leader.endYear || 'Present'}
                      </p>
                   )}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
