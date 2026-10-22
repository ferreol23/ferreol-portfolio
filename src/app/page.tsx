import { About } from "@/components/home/about";
import { Benefits } from "@/components/home/benefits";
import { Faq } from "@/components/home/faq";
import { FiverrCta } from "@/components/home/fiverr-cta";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { Portfolio } from "@/components/home/portfolio";
import { Process } from "@/components/home/process";
import { Services } from "@/components/home/services";

// Home page: the sections in order, top to bottom. Reorder or remove lines to change the page.
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <About />
      <Benefits />
      <Process />
      <Portfolio />
      <Faq />
      <FiverrCta />
    </>
  );
}
