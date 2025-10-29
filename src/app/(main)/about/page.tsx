import React from "react";

import HeroAbout from "@/components/about/HeroAbout";
import SessionContent from "@/components/about/SessionContent";
import SessionEnd from "@/components/home/SessionEnd";

function AboutPage() {
  return (
    <>
      <HeroAbout />
      <SessionContent />
      <SessionEnd />
    </>
  );
}

export default AboutPage;
