import Hero from "@/components/home/Hero/Hero";
import Ferjan from "@/components/home/Ferjan/Ferjan";
import About from "@/components/home/About/About";
import Packs from "@/components/home/Packs/Packs";
import Help from "@/components/home/Help/Help";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main>
      <Header />

      <Hero />
      <Ferjan />
      <About />
      <Packs />
      <Help />

      <Footer />
    </main>
  );
}
