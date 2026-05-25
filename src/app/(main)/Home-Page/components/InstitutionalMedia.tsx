"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export function InstitutionalMedia() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const videos = [
    { id: "aDD7lM0iO5Q", title: "Imus Hymn", author: "Engr. Aurello P. Bautista" },
    { id: "ACKqYOV2Urk", title: "National Anthem", author: "Jaime G. Caro Jr." }
  ];

  return (
    <div className="space-y-12">
      <div className="border-b border-slate-100 pb-6">
        <h2 className="heading-institutional">Institutional Media</h2>
        <p className="text-slate-500 font-medium">Hymns and national symbols of unity</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {videos.map((vid) => (
          <div key={vid.id} className="space-y-6">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-slate-100 group">
              {playingVideo === vid.id ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${vid.id}?autoplay=1&rel=0`}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <div 
                  onClick={() => setPlayingVideo(vid.id)}
                  className="w-full h-full relative cursor-pointer"
                >
                  <Image
                    src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`}
                    alt={vid.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-16 h-16 bg-[#191970] text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition duration-300">
                        <Play size={32} fill="currentColor" />
                     </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-800">{vid.title}</h4>
              <p className="text-xs font-bold text-[#191970] uppercase tracking-widest mt-1">{vid.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
