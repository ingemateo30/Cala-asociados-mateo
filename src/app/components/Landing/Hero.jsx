import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';

const Hero = ({ scrollToBulletinPreview }) => {
  return (
    <>
      <Head>
        <title>Contadores en San Gil y Bucaramanga - Excelencia Contable Profesional</title>
        <meta
          name="description"
          content="Somos una Firma de Contadores Públicos en San Gil, ofrecemos servicios profesionales en las áreas de la Contaduría Pública desde 1990. Contáctanos para obtener asesoramiento contable y financiero de calidad."
        />
      </Head>
      <motion.div className="lg:bg-opacity-10 bg-gray-900 bg-opacity-60 lg:py-0 px-3 lg:px-30 h-screen flex justify-center items-center">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl lg:text-6xl font-bold text-white mb-6 lg:mb-4 lg:mt-32 sm:text-5xl text-center lg:text-left"
            >
               <motion.span
                className="animate-changeColor2"
                initial={{ color: "#efb810" }}
                animate={{ color: "#efb810" }}
                transition={{ duration: 1 }}
              >
                35 años
              </motion.span>{" "}
              
              de Excelencia contable{" "}
              <motion.span
                className="animate-changeColor"
                initial={{ color: "white" }}
                animate={{ color: "#d4af37" }}
                transition={{ duration: 1 }}
              >
                profesional
              </motion.span>{" "}
              a tu disposición
            </motion.h1>
            <motion.hr
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-32 lg:w-48 border-t-2 lg:border-t-4 border-calagreen mb-8"
            />
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-lg lg:text-xl text-gray-100 mb-6 sm:text-xl text-center lg:text-left"
              style={{
                background: "rgba(0, 0, 0, 0.6)",
                padding: "20px",
                borderRadius: "20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",
              }}
            >
              Somos una Firma de Contadores Públicos, constituida desde 1990, con
              el objetivo de ejercer una actividad profesional conjunta y ofrecer
              a la comunidad servicios calificados en las áreas propias de la
              Contaduría Pública.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-col lg:flex-row items-center justify-center lg:justify-start"
            >
              <Link href="/contacto">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-calagreen border border-calagreen text-white text-lg lg:text-xl font-bold py-3 px-16 rounded-full mb-4 lg:mb-0 lg:mr-4 transition-colors duration-300 ease-in-out"
                >
                  Contáctanos
                </motion.button>
              </Link>
              <motion.button
                onClick={scrollToBulletinPreview}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="border border-green-500 bg-gray-900 bg-opacity-20 hover:bg-calagreen hover:border-calagreen text-lg lg:text-xl font-bold py-3 px-12 rounded-full lg:ml-4 transition-colors duration-300 ease-in-out hover:text-white"
                style={{ color: "white" }}
              >
                Boletín tributario
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Hero;
