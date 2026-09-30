import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Courses from "../components/Courses";
import Workshops from "../components/Workshops";
import Testimonials from "../components/Testimonials";
import BookingSection from "../components/BookingSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Courses />
        <Workshops />
        <Testimonials />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
