import Hero from "@/components/sections/Hero";
import StatsBand from "@/components/sections/StatsBand";
import Challenge from "@/components/sections/Challenge";
import Phases from "@/components/sections/Phases";
import Eligibility from "@/components/sections/Eligibility";
import WhyApply from "@/components/sections/WhyApply";
import Proof from "@/components/sections/Proof";
import Partners from "@/components/sections/Partners";
import Apply from "@/components/sections/Apply";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBand />
      <Challenge />
      <Phases />
      <Eligibility />
      <WhyApply />
      <Proof />
      <Partners />
      <Apply />
    </main>
  );
}
