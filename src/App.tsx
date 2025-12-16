import { Hero } from "./components/Hero";
import { FeatureCards } from "./components/FeatureCards";
import LeadChat from "./components/LeadChat";
import { CardTypes } from "./components/CardTypes";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Benefits } from "./components/Benefits";
import { MastercardSurpreenda } from "./components/MastercardSurpreenda";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import ContactForm from "./pages/ContactForm";
import Privacy from "./pages/Privacy";
import { useEffect, useState } from "react";

export default function App() {
  const [hash, setHash] = useState<string>(() => (typeof window !== "undefined" ? window.location.hash : ""));

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const isContact = hash === "#/contato" || hash === "#contato";
  const isPrivacy = hash === "#/privacidade" || hash === "#privacidade";

  if (isContact) return <ContactForm />;
  if (isPrivacy) return <Privacy />;

  return (
    <div className="min-h-screen bg-white">
      {/* Shared gradient background for Hero + FeatureCards to ensure seamless continuity */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#44216a] via-[#5f5275] to-[#44216a]" />
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        <div className="relative">
          <Hero />
          <FeatureCards />
        </div>
      </section>
      <MastercardSurpreenda />
      <Features />
      <CardTypes />
      <HowItWorks />
      <Benefits />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
      <LeadChat />
    </div>
  );
}
