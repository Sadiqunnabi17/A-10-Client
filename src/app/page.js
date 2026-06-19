import HeroSection from "@/components/home/HeroSection";
import FeaturedEbooks from "@/components/home/FeaturedEbooks";
import TopWriters from "@/components/home/TopWriters";
import GenresSection from "@/components/home/GenresSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedEbooks />
      <TopWriters />
      <GenresSection />
    </main>
  );
}