import React from "react";
import { Helmet } from "react-helmet-async";
import { SEO_DATA } from "../../../config/constants";

const About = () => {
  return (
    <>
      <Helmet>
        <title>{SEO_DATA.about.title}</title>
        <meta name="description" content={SEO_DATA.about.description} />
        <meta name="keywords" content={SEO_DATA.about.keywords.join(", ")} />
        <meta name="author" content={SEO_DATA.about.author} />
        <meta name="url" content={SEO_DATA.about.url} />
        <meta name="image" content={SEO_DATA.about.image} />
      </Helmet>

      <section className="py-24 px-6 max-w-7xl mx-auto space-y-8">
        <h1 className="text-5xl font-serif tracking-tight">Sobre Nosotros</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Somos un grupo de personas que buscan mejorar cada día
        </p>
      </section>
    </>
  );
};

export default About;
