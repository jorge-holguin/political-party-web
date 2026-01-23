import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocialButtons from "@/components/SocialButtons";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <SocialButtons />
      {children}
      <Footer />
    </main>
  );
}
