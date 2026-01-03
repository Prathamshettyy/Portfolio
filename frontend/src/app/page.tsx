import type { Metadata } from "next";
import dynamic from "next/dynamic";

// ✅ Safe for SSR
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

// ❗ Likely uses browser APIs (video, window, observers)
const VideoIntro = dynamic(
  () => import("@/components/VideoIntro"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Home | Interactive Portfolio",
  description:
    "Welcome to my interactive portfolio showcasing my work as a Full-Stack and AI Developer.",
};

export default function Home() {
  return (
    <main className="space-y-20 md:space-y-32">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <VideoIntro />
      <Contact />
    </main>
  );
}
