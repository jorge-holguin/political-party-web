import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocialButtons from "@/components/SocialButtons";
import HeroSection from "@/sections/HeroSection";
import BiografiaSection from "@/sections/BiografiaSection";
import TrayectoriaSection from "@/sections/TrayectoriaSection";
import PrensaSection from "@/sections/PrensaSection";
import InscribeteSection from "@/sections/InscribeteSection";
import ContactoSection from "@/sections/ContactoSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <SocialButtons />
      
      <HeroSection />
      <BiografiaSection />
      <TrayectoriaSection />
      <PrensaSection />
      <InscribeteSection />
      <ContactoSection />
      
      <Footer />
    </main>
  );
}
