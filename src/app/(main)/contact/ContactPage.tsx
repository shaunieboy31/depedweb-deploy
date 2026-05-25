"use client";

import { useState } from 'react';
import Image from 'next/image';
import { 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Youtube,
  Globe,
  ArrowRight
} from 'lucide-react';
import { ContactData } from '@/services/contact.service';

export default function ContactPage({ contactInfo }: { contactInfo: ContactData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
    alert("Thank you for your message. We will get back to you soon!");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      
      {/* Institutional Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/newbuilding.webp"
            alt="SDO Imus Building"
            fill
            className="object-cover object-center brightness-[0.35]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#032977] via-transparent to-transparent opacity-80" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-300 uppercase bg-blue-950/40 backdrop-blur-md rounded-full border border-blue-400/30">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl uppercase">
            Connect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              With Us
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-lg font-medium">
             Have questions or need assistance? Our team is dedicated to providing the support you need.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 -mt-20 relative z-20">
        
        {/* Contact info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { 
              title: "Our Location", 
              icon: <MapPin className="text-blue-600" />, 
              desc: contactInfo.location,
              color: "bg-blue-50"
            },
            { 
              title: "Call Details", 
              icon: <Phone className="text-emerald-600" />, 
              desc: contactInfo.phone,
              color: "bg-emerald-50"
            },
            { 
              title: "Email Support", 
              icon: <Mail className="text-amber-600" />, 
              desc: contactInfo.email,
              color: "bg-amber-50"
            },
            { 
              title: "Office Hours", 
              icon: <Clock className="text-rose-600" />, 
              desc: contactInfo.officeHours,
              color: "bg-rose-50"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500">
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                {item.icon}
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2">{item.title}</h3>
              <p className="text-slate-900 font-bold leading-relaxed whitespace-pre-line">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Map Section (Left side - spans 7) */}
          <div className="lg:col-span-7 space-y-10 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">Find Our Office</h2>
              <p className="text-slate-500 font-medium max-w-xl">
                Located in the heart of Imus City, our division office is easily accessible to all stakeholders and personnel.
              </p>
            </div>
            
            <div className="w-full aspect-video md:aspect-[4/3] lg:aspect-video bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white ring-1 ring-slate-100 relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1931.2587526671048!2d120.93498905!3d14.4375654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d28eba32a265%3A0xb302c807795d9c1b!2sDepEd%20Schools%20Division%20Office%20of%20Imus%20City!5e0!3m2!1sen!2sph!4v1713594751059!5m2!1sen!2sph" 
                className="w-full h-full grayscale-[0.2] contrast-[1.1] hover:grayscale-0 transition-all duration-700" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
                 <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">HQ Address</p>
                 <p className="text-slate-900 font-bold text-sm">{contactInfo.location}</p>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="pt-8 border-t border-slate-200">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Stay Connected</h4>
               <div className="flex flex-wrap gap-4">
                  {[
                    ...(contactInfo.facebook ? [{ name: 'Facebook', icon: <Facebook size={18} />, color: 'hover:bg-[#1877F2]', link: contactInfo.facebook }] : []),
                    ...(contactInfo.twitter ? [{ name: 'Twitter', icon: <Twitter size={18} />, color: 'hover:bg-[#1DA1F2]', link: contactInfo.twitter }] : []),
                    ...(contactInfo.youtube ? [{ name: 'YouTube', icon: <Youtube size={18} />, color: 'hover:bg-[#FF0000]', link: contactInfo.youtube }] : []),
                    ...(contactInfo.website ? [{ name: 'Website', icon: <Globe size={18} />, color: 'hover:bg-blue-600', link: contactInfo.website }] : []),
                  ].map((social) => (
                    <a 
                      key={social.name} 
                      href={social.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 px-6 py-3 bg-white border border-slate-100 rounded-full text-slate-600 font-bold text-sm shadow-sm transition-all hover:text-white ${social.color} hover:border-transparent hover:-translate-y-1 hover:shadow-lg`}
                    >
                      {social.icon}
                      <span>{social.name}</span>
                    </a>
                  ))}
               </div>
            </div>
          </div>

          {/* Form Section (Right side - spans 5) */}
          <div className="lg:col-span-5 order-1 lg:order-2">
             <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border border-slate-100 relative overflow-hidden ring-1 ring-slate-50">
               <div className="absolute top-0 right-0 p-10 opacity-5 -z-10 translate-x-1/4 -translate-y-1/4">
                  <Send size={200} />
               </div>
               
               <div className="space-y-4 mb-10 text-center lg:text-left">
                 <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Send Message</h2>
                 <p className="text-slate-500 font-medium text-sm">
                   Expect a response from our relevant unit within 24-48 working hours.
                 </p>
               </div>

               <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Your Full Name</label>
                   <input
                     type="text"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     placeholder="John Doe"
                     className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 text-slate-900 font-bold placeholder:text-slate-300 transition-all shadow-inner"
                     required
                   />
                 </div>

                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
                   <input
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     placeholder="john@example.com"
                     className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 text-slate-900 font-bold placeholder:text-slate-300 transition-all shadow-inner"
                     required
                   />
                 </div>

                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Subject</label>
                   <input
                     type="text"
                     name="subject"
                     value={formData.subject}
                     onChange={handleChange}
                     placeholder="Inquiry about..."
                     className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 text-slate-900 font-bold placeholder:text-slate-300 transition-all shadow-inner"
                     required
                   />
                 </div>

                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Message Details</label>
                   <textarea
                     name="message"
                     value={formData.message}
                     onChange={handleChange}
                     placeholder="How can we help you today?"
                     rows={5}
                     className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 text-slate-900 font-bold placeholder:text-slate-300 transition-all shadow-inner resize-none"
                     required
                   />
                 </div>

                 <button
                   type="submit"
                   className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-200 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 tracking-widest uppercase text-xs"
                 >
                   <Send size={18} />
                   Submit Inquiry
                   <ArrowRight size={18} className="opacity-50" />
                 </button>
               </form>
             </div>
          </div>
        </div>

        {/* Division Core Values Footer / Motto */}
        <div className="mt-20 text-center space-y-4">
           <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em]">SDO Imus City</p>
           <h2 className="text-2xl font-black text-slate-900 uppercase">Integrity ● Excellence ● Service</h2>
        </div>

      </div>

      {/* Footer Decoration */}
      <div className="w-full h-32 bg-gradient-to-t from-slate-200/50 to-transparent" />
    </div>
  );
}
