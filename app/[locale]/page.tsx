import About from "@/components/About";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Writing from "@/components/Writing";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Writing />
      </main>
      <Footer />
    </>
  );
}
