import { Navbar } from '../components/landing/Navbar';
import { Hero3D } from '../components/Hero3D';
import { Features } from '../components/landing/Features';
import { Explore } from '../components/landing/Explore';
import { Community } from '../components/landing/Community';
import { Testimonials } from '../components/landing/Testimonials';
import { Footer } from '../components/landing/Footer';

/**
 * Home page.
 */
export const Home = () => {
  return (
    <div className="bg-black text-white font-sans min-h-screen">
      <Navbar />
      <Hero3D />
      <Features />
      <Explore />
      <Testimonials />
      <Community />
      <Footer />
    </div>
  );
};
