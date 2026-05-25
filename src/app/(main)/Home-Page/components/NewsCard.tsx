import React from "react";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";

interface NewsCardProps {
  news: {
    id: string;
    date: string;
    category: string;
    title: string;
    excerpt: string;
    image: string | null;
  };
  onClick: () => void;
}

export function NewsCard({ news, onClick }: NewsCardProps) {
  return (
    <article className="flex-shrink-0 w-[350px] group/card snap-start">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 shadow-sm border border-slate-100">
        <Image
          src={news.image || "/images/news-placeholder.webp"}
          alt={news.title}
          fill
          className="object-cover group-hover/card:scale-105 transition duration-700"
        />
        <div className="absolute top-4 left-4 bg-[#4279D2] text-white text-[9px] font-black px-4 py-1.5 tracking-widest uppercase rounded-full shadow-lg">
          {news.category}
        </div>
      </div>
      
      <div className="space-y-3 pr-4">
        <p className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <Calendar size={12} strokeWidth={3} />
          {news.date}
        </p>
        <h3 className="text-lg font-black text-slate-800 leading-[1.3] group-hover/card:text-[#4279D2] transition-colors line-clamp-2">
          {news.title}
        </h3>
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 font-medium">
          {news.excerpt}
        </p>
        <button 
          onClick={onClick}
          className="flex items-center gap-2 text-[10px] font-black text-[#4279D2] hover:gap-4 transition-all uppercase tracking-widest pt-2"
        >
          Read Details <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
}
