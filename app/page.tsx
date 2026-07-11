import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Ventures from "@/components/sections/Ventures";
import Timeline from "@/components/sections/Timeline";
import Journal from "@/components/sections/Journal";
import Playlist from "@/components/sections/Playlist";
import Now from "@/components/sections/Now";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Ventures />
        <Timeline />
        <Journal />
        <Playlist />
        <Now />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
