import { AboutPreview } from "@/sections/about-preview";
import { AcademicsOverview } from "@/sections/academics-overview";
import { CTASection } from "@/sections/cta-section";
import { EventsActivities } from "@/sections/events-activities";
import { Hero } from "@/sections/hero";
import { NewsAnnouncements } from "@/sections/news-announcements";
import { Testimonials } from "@/sections/testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <AcademicsOverview />
      <NewsAnnouncements />
      <EventsActivities />
      <CTASection />
      <Testimonials />
    </>
  );
}
