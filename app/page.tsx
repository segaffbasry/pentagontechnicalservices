import Accreditations from "@/components/home/Accreditations";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import News from "@/components/home/News";
import Pillars from "@/components/home/Pillars";
import Projects from "@/components/home/Projects";
import SafeHands from "@/components/home/SafeHands";
import Services from "@/components/home/Services";
import Values from "@/components/home/Values";

/* Section order (live order in brackets): hero [1], intro + 300 MW [2], the four pillars [3], services list
   [menu], safe-hands band [3b], projects [4], why Pentagon [6], accreditations [5], news [7]. */
export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Pillars />
      <Services />
      <SafeHands />
      <Projects />
      <Values />
      <Accreditations />
      <News />
    </>
  );
}
