import React from "react";

import HeroSection from "@/components/home/HeroSection";
import SessionConnect from "@/components/home/SessionConnect";
import SessionEnd from "@/components/home/SessionEnd";
import SessionReview from "@/components/home/SessionReview";
import SessionTutorial from "@/components/home/SessionTutorial";
import SessionValue from "@/components/home/SessionValue";

function HomePage() {
  return (
    <>
      <HeroSection />
      <SessionConnect />
      <SessionTutorial />
      <SessionValue />
      <SessionReview />
      <SessionEnd />
    </>
  );
}

export default HomePage;
