import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/sections/Stats";
import { Programs } from "@/components/sections/Programs";
import { Why } from "@/components/sections/Why";
import { Steps } from "@/components/sections/Steps";
import { Teachers } from "@/components/sections/Teachers";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Contacts } from "@/components/sections/Contacts";

export default function Page() {
  return (
    <div id="top" className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Programs />
      <Why />
      <Steps />
      <Teachers />
      <Pricing />
      <FAQ />
      <Contacts />

      <div className="py-10 text-center text-xs text-muted">
        © {new Date().getFullYear()} Foundation.
      </div>
    </div>
  );
}
