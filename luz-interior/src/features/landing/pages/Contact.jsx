import React from "react";
import { Helmet } from "react-helmet-async";
import { SEO_DATA } from "../../../config/constants";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>{SEO_DATA.contact.title}</title>
        <meta name="description" content={SEO_DATA.contact.description} />
        <meta name="keywords" content={SEO_DATA.contact.keywords.join(", ")} />
        <meta name="author" content={SEO_DATA.contact.author} />
        <meta name="url" content={SEO_DATA.contact.url} />
        <meta name="image" content={SEO_DATA.contact.image} />
      </Helmet>

      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-serif tracking-tight mb-6">Contáctanos</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-12">
          ¿Listo para empezar tu reconstrucción personal?
        </p>
      </section>
    </>
  );
};

export default Contact;
