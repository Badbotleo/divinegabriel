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
import { getContent } from "@/lib/content";
import { getContactQrDataUrl } from "@/lib/qr";

// Re-fetch dashboard-edited content at most once a minute.
export const revalidate = 60;

export default async function Home() {
  const content = await getContent();
  const qr = await getContactQrDataUrl();

  return (
    <>
      <Navbar />
      <main>
        <Hero hero={content.hero} contact={content.contact} />
        <About about={content.about} stats={content.stats} />
        <Ventures ventures={content.ventures} />
        <Timeline items={content.timeline} />
        <Journal posts={content.journal} />
        <Playlist playlist={content.playlist} />
        <Now now={content.now} />
        <Contact contact={content.contact} qr={qr} />
      </main>
      <Footer contact={content.contact} />
    </>
  );
}
