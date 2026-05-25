"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, X, ArrowRight, ChevronRight, Newspaper } from "lucide-react";
import { getNewsAction } from "@/controllers/news";
import Link from "next/link";

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<any | null>(null);

  useEffect(() => {
    async function loadNews() {
      const result = await getNewsAction();
      if (result.success && result.data) {
        setNews(result.data);
      }
      setLoading(false);
    }
    loadNews();
  }, []);

  return (
    <div className="w-full bg-slate-50/30 min-h-screen pb-20">
      {/* Header Section */}
      <section className="bg-white border-b border-slate-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                 <div className="flex items-center gap-3 text-blue-600">
                    <Newspaper size={20} strokeWidth={2.5} />
                    <span className="text-xs font-black uppercase tracking-[0.3em]">Official Feed</span>
                 </div>
                 <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none uppercase">
                    News & <br/> Announcements
                 </h1>
              </div>
              <p className="max-w-md text-slate-500 font-medium leading-relaxed">
                 The latest updates, events, and official statements from the Schools Division Office of Imus City.
              </p>
           </div>
        </div>
      </section>

      {/* Main Content / Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[1,2,3,4,5,6].map(i => (
               <div key={i} className="bg-white rounded-[2rem] aspect-[4/5] animate-pulse border border-slate-100" />
             ))}
          </div>
        ) : news.length === 0 ? (
          <div className="py-32 text-center space-y-6 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
             <div className="p-8 bg-slate-50 w-fit mx-auto rounded-full text-slate-200">
                <Newspaper size={64} strokeWidth={1} />
             </div>
             <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-800">No Announcements Found</h3>
                <p className="text-slate-400 text-sm max-w-xs mx-auto">Please check back later for more updates from the division office.</p>
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article 
                key={item.id} 
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-50/50 transition-all duration-500"
              >
                {/* Image Area */}
                <div className="relative aspect-[4/3] overflow-hidden">
                   <Image 
                     src={item.image || "/images/news-placeholder.webp"} 
                     alt={item.title} 
                     fill 
                     className="object-cover group-hover:scale-105 transition-transform duration-700"
                   />
                   <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm border border-white">
                        {item.category}
                      </span>
                   </div>
                </div>

                {/* Text Content */}
                <div className="p-8 space-y-4">
                   <p className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <Calendar size={12} strokeWidth={3} />
                      {item.date}
                   </p>
                   <h2 className="text-xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                      {item.title}
                   </h2>
                   <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 font-medium">
                      {item.excerpt}
                   </p>
                   <button 
                     onClick={() => setSelectedNews(item)}
                     className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest pt-4 group/btn"
                   >
                     Read Story <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                   </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* READ MORE MODAL (Unified with Home Page Style) */}
      {selectedNews && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div onClick={() => setSelectedNews(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 flex flex-col">
            
            {/* Modal Image Area */}
            <div className="relative h-64 md:h-96 w-full flex-shrink-0">
               <Image 
                 src={selectedNews.image || "/images/news-placeholder.webp"} 
                 alt="" 
                 fill 
                 className="object-contain bg-slate-100" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
               <button 
                 onClick={() => setSelectedNews(null)}
                 className="absolute top-8 right-8 p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-slate-900 transition-all border border-white/30"
               >
                 <X size={20} />
               </button>
               <div className="absolute bottom-8 left-10">
                  <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    {selectedNews.category}
                  </span>
               </div>
            </div>

            {/* Modal Content Area */}
            <div className="p-10 md:p-14 overflow-y-auto space-y-8 custom-scrollbar">
               <div className="space-y-4">
                  <p className="flex items-center gap-2 text-xs font-bold text-blue-500/60 uppercase tracking-widest">
                    <Calendar size={14} strokeWidth={3} />
                    {selectedNews.date}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                    {selectedNews.title}
                  </h2>
               </div>
               <div className="h-1.5 w-20 bg-blue-600" />
               <div className="space-y-6">
                  <p className="text-lg text-slate-600 leading-relaxed font-bold italic">
                    {selectedNews.excerpt}
                  </p>
                  <p className="text-slate-500 leading-relaxed text-sm font-medium">
                     This is the official announcement from the Schools Division Office of Imus City division. For additional inquiries regarding this update, please refer to the official communications issued by the respective offices or contact the division office directly.
                  </p>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-10">
         <div className="bg-blue-600 rounded-[3rem] p-8 md:p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-20 opacity-10 group-hover:scale-110 transition-transform duration-1000">
               <Newspaper size={300} />
            </div>
            <div className="relative z-10 space-y-6">
               <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Stay Informed</h2>
               <p className="max-w-xl mx-auto text-blue-100 font-medium">
                  Be the first to know about division memos, school updates, and educational breakthroughs in Imus City.
               </p>
               <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto pt-4">
                  <input 
                    type="email" 
                    placeholder="official.email@example.com" 
                    className="flex-1 px-8 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-blue-200 outline-none focus:bg-white/20 transition-all font-bold"
                  />
                  <button className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-50 transition-all">
                     Subscribe
                  </button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
