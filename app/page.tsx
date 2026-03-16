import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Leadership } from "@/components/Leadership";
import { Materials } from "@/components/Materials";
import { Services } from "@/components/Services";
import Gallery from "@/components/Gallery";
import { WhyUs } from "@/components/WhyUs";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Materials />
        <WhyUs />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
