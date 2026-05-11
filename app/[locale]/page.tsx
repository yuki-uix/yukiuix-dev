import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Writing from "@/components/Writing";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Writing />
        <About />
      </main>
      <Footer />
    </>
  );
}
