"use client";

import React from "react";

import SessionEnd from "@/components/home/SessionEnd";
import HeroJob from "@/components/job/HeroJob";
import SessionListJob from "@/components/job/SessionListJob";

function JobsPage() {
  return (
    <>
      <HeroJob />
      <SessionListJob />
      <SessionEnd />
    </>
  );
}

export default JobsPage;
