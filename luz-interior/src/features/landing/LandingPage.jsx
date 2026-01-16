import React from "react";
import { Helmet } from "react-helmet-async";
import Hero from "./components/Hero";
import DepressionSection from "./components/DepressionSection";
import PersonalDevelopment from "./components/PersonalDevelopment";
import LooksMaxxing from "./components/LooksMaxxing";
import { SEO_DATA } from "../../config/constants";

const Landing = () => {
  return (
    <>
      <Helmet>
        <title>{SEO_DATA.home.title}</title>
        <meta name="description" content={SEO_DATA.home.description} />
        <meta name="keywords" content={SEO_DATA.home.keywords.join(", ")} />
        <meta name="author" content={SEO_DATA.home.author} />
        <meta name="url" content={SEO_DATA.home.url} />
        <meta name="image" content={SEO_DATA.home.image} />
      </Helmet>

      <main>
        <Hero />
        <DepressionSection />
        <PersonalDevelopment />
        <LooksMaxxing />
      </main>
    </>
  );
};

export default Landing;
