import React from "react";
import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import DepressionSection from "../components/DepressionSection";
import PersonalDevelopment from "../components/PersonalDevelopment";
import LooksMaxxing from "../components/LooksMaxxing";

const Landing = () => {
  return (
    <>
      <Helmet>
        <title>Inicio | Luz Interior </title>
        <meta
          name="description"
          content="Descubre el camino hacia tu mejor versión. Disciplina, mentalidad y propósito."
        />
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
