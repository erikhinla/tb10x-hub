import React from "react";
import { useNavigate } from "react-router-dom";
import DigitalFogSection from "../components/DigitalFogSection";
import Hero from "../components/Hero";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-[#07080a]">
      <Hero onPrimaryCtaClick={() => navigate("/social-assets")} />
      <DigitalFogSection />
    </main>
  );
};

export default HomePage;
