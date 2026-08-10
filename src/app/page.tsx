import CTA from "@/components/home/CTA";
import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import Herosection from "@/components/home/Herosection";
import Howitworks from "@/components/home/howItworks";
import Technology from "@/components/home/Technology";
import React from "react";

const Home = () => {
  return (
    <main className="page-shell">
      <Herosection />
      <Features />
      <Technology />
      <Howitworks />
      <CTA />
      <Footer />
    </main>
  );
};

export default Home;
