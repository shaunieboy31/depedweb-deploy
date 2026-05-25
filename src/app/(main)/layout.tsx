import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import PageSeals from "@/components/PageSeals";
import Footer from "@/components/Footer";
import React from "react";
import { ContactService } from "@/services/contact.service";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactInfo = await ContactService.getInfo();

  return (
    <div className="bg-[#ECEFF1] min-h-screen">
      <Navbar />
      <Header contactInfo={contactInfo} />
      <main className="max-w-7xl mx-auto px-10 py-2">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">{children}</div>
      </main>
      <PageSeals />
      <Footer />
    </div>
  );
}
