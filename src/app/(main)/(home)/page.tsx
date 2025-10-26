import React from "react";

import HeroSection from "@/components/home/HeroSection";
import SessionConnect from "@/components/home/SessionConnect";
import SessionEnd from "@/components/home/SessionEnd";
import SessionTutorial from "@/components/home/SessionTutorial";
import SessionValue from "@/components/home/SessionValue";

function HomePage() {
  return (
    <>
      <HeroSection />
      <SessionConnect />
      <SessionTutorial />
      <SessionValue />
      <SessionEnd />
    </>
  )
}

export default HomePage;
