import Hero from "../components/Hero";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import CTABanner from "../components/CTABanner";

const Home = () => {
  return (
    <div className="bg-page">
      <Hero />
      <Features />
      <Pricing />
      <CTABanner />
    </div>
  );
};

export default Home;
