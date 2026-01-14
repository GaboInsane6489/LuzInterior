import React from "react";
import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import DepressionSection from "../components/DepressionSection";

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
      </main>
    </>
  );
};

export default Landing;
