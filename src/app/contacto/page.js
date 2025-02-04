"use client"

import { Container } from '@mui/material';
import Head from 'next/head'; // Importamos Head para etiquetas meta
import MapComponent from '../components/ContactPage/MapComponent';
import Footer from '../components/Footer';
import Link from "next/link";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import ContactMini from '../components/ContactPage/ContactMini';
import ContactPrincipal from '../components/ContactPage/ContactPrincipal';

export default function Nosotros() {
  return (
    <>
      <Head>
        <title>Contacto - Cala Asociados Contadores Públicos en San Gil Y Bucaramanga</title>
        <meta
          name="description"
          content="Contacta a Cala Asociados Contadores Públicos para obtener asesoramiento contable y financiero de calidad. Estamos aquí para ayudarte con tus necesidades contables y fiscales."
        />
      </Head>
      <div className="h-500 w-auto bg-gray-200">
        <Container
          sx={{
            pt: 6,
            pb: 7,
            textAlign: { xs: "center", md: "left" },
          }}
        ></Container>

        <ContactMini />
        <MapComponent />
        <ContactPrincipal />
        <FloatingWhatsApp
            phoneNumber="+573153754395"
            accountName="Cala Asociados Contadores Publicos"
            avatar="./cala-icono.png"
            darkMode = {true}
            statusMessage="Normalmente responde en 1 hora"
            chatMessage="¡Hola! Somos Cala Asociados, ¿en qué te podemos ayudar?"
            placeholder="Escribe un mensaje"
            notification={true}
            chatboxHeight = {340}
          />
        
        <Footer />
      </div>
    </>
  );
}
