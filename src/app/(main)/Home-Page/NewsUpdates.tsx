"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, Calendar, ChevronLeft } from "lucide-react";
import { getNewsAction } from "@/controllers/news";
import { NewsCard } from "./components/NewsCard";
import { NewsModal } from "./components/NewsModal";

export function NewsUpdates() {
  const [news, setNews] = useState<any[]>([]);
  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    async function loadNews() {
      const result = await getNewsAction();
      if (result.success && result.data) {
        setNews(result.data.map((n: any) => ({ ...n, id: n.id.toString() })));
      }
    }
    loadNews();
  }, []);

  return (
    <div className="pt-4 pb-4 bg-white relative group">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-[#4279D2] tracking-tight uppercase">Announcements</h2>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest italic">Live from SDO News Desk</p>
        </div>
        <a href="/news" className="text-[10px] font-black text-[#4279D2] uppercase tracking-[0.2em] flex items-center gap-2 group/all">
          View all updates <ChevronRight size={14} className="group-hover/all:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        {news.length > 3 && (
          <>
            <button onClick={() => scroll('left')} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white border border-slate-100 rounded-full shadow-lg text-slate-400 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white border border-slate-100 rounded-full shadow-lg text-slate-400 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">
              <ChevronRight size={20} />
            </button>
          </>
        )}

        <div ref={scrollRef} className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar scroll-smooth">
          {news.length > 0 ? (
            news.map((n) => (
              <NewsCard key={n.id} news={n} onClick={() => setSelectedNews(n)} />
            ))
          ) : (
            <div className="w-full py-16 text-center space-y-4 bg-slate-50 border border-slate-100 rounded-[2.5rem]">
               <div className="p-4 bg-white w-fit mx-auto rounded-full text-slate-200">
                  <Calendar size={48} strokeWidth={1} />
               </div>
               <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">No active announcements</p>
            </div>
          )}
        </div>
      </div>

      {/* READ MORE MODAL */}
      <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
    </div>
  );
}
