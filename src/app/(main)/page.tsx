import { HomeCarousel } from "./Home-Page/HomeCarousel";
import { AboutSection } from "./Home-Page/AboutSection";
import { NewsUpdates } from "./Home-Page/NewsUpdates";
import { SchoolStats } from "./Home-Page/SchoolStats";

export default function Home() {
  return (
    <div className="w-full bg-white min-h-screen">
      <main className="grid-main section-container mb-16">
        {/* Hero / Carousel Section */}
        <section className="relative z-10">
          <HomeCarousel />
        </section>

        {/* School Statistics Dashboard Section */}
        <section>
          <SchoolStats />
        </section>

        {/* News & Announcements Section */}
        <section id="news-section">
          <NewsUpdates />
        </section>

        {/* About & Institutional Media Section */}
        <section>
          <AboutSection />
        </section>
      </main>
    </div>
  );
}



