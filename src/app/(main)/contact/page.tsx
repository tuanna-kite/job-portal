"use client";

import React from "react";

import FormContact from "@/components/contact/FormContact";
import HeroContact from "@/components/contact/HeroContact";
import SessionEnd from "@/components/home/SessionEnd";

function ContactPage() {
  return (
    <>
      <HeroContact />
      <FormContact />
      <SessionEnd />
    </>
  );
}

export default ContactPage;
