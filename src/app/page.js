"use client"

import React from "react";
import Head from "next/head"; 
import { FloatingWhatsApp } from "react-floating-whatsapp";
import Hero from "./components/Landing/Hero";
import NavBar from "./components/NavBar";
import BulletinPreview from "./components/Landing/BulletinPreview";
import Contact from "./components/ContactPage/Contact";
import { Tarjetas } from "./components/Landing/Tarjetas";
import { Carousel, StatsSection} from "./components/Landing/Carousel";
import Footer from "./components/Footer";
import WebLink from "./components/Landing/WebLink";
import MapComponent from "./components/ContactPage/MapComponent";
import DecretoSection from "./components/Otros/Decretosection";
import RetencionesSection from "./components/Landing/RetencionesSection";

export default function Home() {

  const scrollToBulletinPreview = () => {
    const bulletinPreview = document.getElementById("bulletin-preview");
    const yOffset = -125;
    const y = bulletinPreview.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  return (
    <>
      <Head>
        <title>Contadores en San Gil y Bucaramanga - Servicios Contables Profesionales</title>
        <meta
          name="description"
          content="Ofrecemos servicios contables profesionales en San Gil y Bucaramanga. Contáctanos para obtener asesoramiento contable y financiero de calidad."
        />
      </Head>
      <NavBar />
      <div className="bg-hero-image">
        <Hero scrollToBulletinPreview={scrollToBulletinPreview} />
        <Tarjetas />
        <BulletinPreview/>
        <DecretoSection />
        <RetencionesSection />
        <Carousel />
        
        <StatsSection />
        {/* <MapComponent /> */}
        <Contact />
        <WebLink />
        <Footer />
        <FloatingWhatsApp
          phoneNumber="+573153754395"
          accountName="Cala Asociados Contadores Públicos"
          avatar="./cala-icono.png"
          darkMode = {true}
          statusMessage="Normalmente responde en 1 hora"
          chatMessage="¡Hola! Somos Cala Asociados, ¿en qué te podemos ayudar?"
          placeholder="Escribe un mensaje"
          notification={true}
          chatboxHeight = {340}
        />
      </div>
    </>
  );
}
