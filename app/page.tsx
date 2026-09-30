import Navbar from "@/components/marketing/Navbar";
import Hero from "@/components/marketing/Hero";
import Features from "@/components/marketing/Features";
import Courses from "@/components/marketing/Courses";
import Workshops from "@/components/marketing/Workshops";
import Testimonials from "@/components/marketing/Testimonials";
import BookingSection from "@/components/marketing/BookingSection";
import Footer from "@/components/marketing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Courses />
      <Workshops />
      <Testimonials />
      <BookingSection />
      <Footer />
    </>
  );
}
