"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Lock, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { login } from "@/controllers/auth";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    }
  }

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Immersive Background Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/newbuilding.webp"
          alt="SDO Imus"
          fill
          className="object-cover object-center scale-105 brightness-[0.3] blur-[2px] transition-all duration-[2000ms]"
          priority
        />
        {/* Deep Institutional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#032977]/95 via-[#032977]/60 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-slate-950/20" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Institutional Branding */}
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-2xl mb-4 border border-white/20 p-4">
            <Image
              src="/images/logo/deped_logo.png"
              alt="DepEd Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <div className="space-y-1">
             <h2 className="text-white font-black text-2xl uppercase tracking-tight">Access Portal</h2>
             <p className="text-blue-200/60 text-[10px] font-black uppercase tracking-[0.2em]">Schools Division Office of Imus City</p>
          </div>
        </div>

        {/* Glassmorphic Login Card */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] p-10 md:p-12 space-y-8">
           
           {error && (
             <div className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/50 rounded-2xl animate-in shake duration-500">
                <AlertCircle className="text-red-400 shrink-0" size={18} />
                <p className="text-[10px] font-black text-red-200 uppercase tracking-widest">{error}</p>
             </div>
           )}

           <form onSubmit={handleSubmit} className="space-y-8">
             <div className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2">
                   <label className="block text-[10px] font-black text-blue-200 uppercase tracking-widest ml-1">Administrative Identity</label>
                   <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-blue-300 group-focus-within:text-white transition-colors">
                         <User size={18} />
                      </div>
                      <input 
                        name="username"
                        type="text" 
                        placeholder="Username"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-bold"
                      />
                   </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                   <label className="block text-[10px] font-black text-blue-200 uppercase tracking-widest ml-1">Security Credential</label>
                   <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-blue-300 group-focus-within:text-white transition-colors">
                         <Lock size={18} />
                      </div>
                      <input 
                        name="password"
                        type="password" 
                        placeholder="••••••••"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-bold"
                      />
                   </div>
                </div>
             </div>

             {/* Submit Button */}
             <button 
               disabled={isPending}
               className="w-full group relative flex items-center justify-center gap-3 px-8 py-5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:opacity-50 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-900/40 transition-all active:scale-95 overflow-hidden"
             >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {isPending ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <ShieldCheck size={18} className="transition-transform" />
                )}
                <span>{isPending ? "Verifying Identity..." : "Verify & Enter"}</span>
                {!isPending && <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />}
             </button>
           </form>

           {/* Footer Link */}
           <div className="text-center pt-2">
              <Link href="/" className="text-[10px] font-black text-blue-300/40 uppercase tracking-widest hover:text-white transition-colors">
                 Return to Public Portal
              </Link>
           </div>
        </div>

        {/* Legal/Compliance Text */}
        <p className="text-center mt-10 text-[9px] font-bold text-blue-100/20 uppercase tracking-[0.2em] leading-loose max-w-[280px] mx-auto">
           Authorized Access Only. All transactions and attempts are strictly monitored by SDO Imus ICT.
        </p>

      </div>
    </main>
  );
}
