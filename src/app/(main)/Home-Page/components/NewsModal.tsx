import React from "react";
import Image from "next/image";
import { X, Calendar } from "lucide-react";

interface NewsModalProps {
  news: any;
  onClose: () => void;
}

export function NewsModal({ news, onClose }: NewsModalProps) {
  if (!news) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div onClick={onClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 flex flex-col">
        
        <div className="relative h-64 md:h-96 w-full flex-shrink-0">
           <Image 
             src={news.image || "/images/news-placeholder.webp"} 
             alt="" 
             fill 
             className="object-cover" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
           <button 
             onClick={onClose}
             className="absolute top-8 right-8 p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-slate-900 transition-all border border-white/30"
           >
             <X size={20} />
           </button>
           <div className="absolute bottom-8 left-10">
              <span className="badge-premium bg-blue-600 text-white">
                {news.category}
              </span>
           </div>
        </div>

        <div className="p-10 md:p-14 overflow-y-auto space-y-8 custom-scrollbar">
           <div className="space-y-4">
              <p className="flex items-center gap-2 text-xs font-bold text-blue-500/60 uppercase tracking-widest">
                <Calendar size={14} strokeWidth={3} />
                {news.date}
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {news.title}
              </h2>
           </div>
           <div className="h-1.5 w-20 bg-blue-600" />
           <div className="space-y-6">
              <p className="text-lg text-slate-600 leading-relaxed font-bold italic">
                {news.excerpt}
              </p>
              <p className="text-slate-500 leading-relaxed text-sm font-medium">
                Official announcement from the Schools Division Office of Imus City. For more details, coordniate with your respective school administrators.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
