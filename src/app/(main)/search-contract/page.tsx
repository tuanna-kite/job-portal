"use client";

import React from "react";

import SessionEnd from "@/components/home/SessionEnd";
import FormSearchContract from "@/components/search-contract/FormSearchContract";
import HeroSearchContract from "@/components/search-contract/HeroSearchContract";

function ContactPage() {
  return (
    <>
      <HeroSearchContract />
      <FormSearchContract />
      <SessionEnd />
    </>
  );
}

export default ContactPage;
