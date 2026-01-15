"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const DecretoSection = () => {
  const scrollAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const handleDownloadDecreto = () => {
    window.open('https://dapre.presidencia.gov.co/normativa/normativa/DECRETO%201474%20DEL%2029%20DE%20DICIEMBRE%20DE%202025.pdf', '_blank');
  };

  // Color base: rgb(21 128 61) -> Tailwind: green-700
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollAnimation}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
        >
          {/* Header con gradiente basado en rgb(21 128 61) */}
          <div className="bg-gradient-to-r from-[#15803d] to-[#166534] p-8 text-white">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-3"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              ¿Conoces el Decreto 1474 de 2025 y cómo te puede impactar?
            </motion.h2>
            <motion.p 
              className="text-center text-green-50 text-lg opacity-90"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Medidas tributarias extraordinarias en el marco del Estado de Emergencia Económica
            </motion.p>
          </div>

          {/* Contenido principal */}
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Columna izquierda - Imagen y descripción */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <div className="relative w-full h-64 md:h-80 mb-6 rounded-lg overflow-hidden shadow-lg border border-green-100">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
                  <Icon 
                    icon="mdi:file-document-outline" 
                    className="text-[#15803d] opacity-10" 
                    width="200" 
                    height="200"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-[#15803d] p-6">
                    <Icon icon="mdi:scale-balance" width="80" height="80" className="mb-4" />
                    <p className="text-2xl font-bold text-center">DECRETO 1474</p>
                    <p className="text-lg text-center mt-2 font-medium">29 de Diciembre 2025</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-[#15803d]">
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong className="text-[#15803d]">Importante:</strong> Este decreto establece medidas tributarias 
                  temporales para el año gravable 2026, incluyendo cambios en IVA, impuesto al patrimonio, 
                  y beneficios de normalización tributaria.
                </p>
              </div>
            </motion.div>

            {/* Columna derecha - Información clave */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col justify-center space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Principales Impactos:
              </h3>

              {/* Lista de impactos */}
              <div className="space-y-4">
                {[
                  {
                    icon: "mdi:account-cash",
                    title: "Impuesto al Patrimonio",
                    desc: "Reducción del umbral a 40.000 UVT (~$2.095 millones)"
                  },
                  {
                    icon: "mdi:receipt",
                    title: "IVA en Licores",
                    desc: "Tarifa general del 19% durante 2026"
                  },
                  {
                    icon: "mdi:gamepad-variant",
                    title: "Juegos en Línea",
                    desc: "IVA del 19% a juegos de suerte y azar por internet"
                  },
                  {
                    icon: "mdi:file-check",
                    title: "Normalización Tributaria",
                    desc: "Oportunidad de regularizar activos omitidos o pasivos inexistentes"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg hover:bg-green-50 transition-colors group"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#15803d] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Icon icon={item.icon} className="text-white" width="24" height="24" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Botón de descarga con el color rgb(21 128 61) */}
              <motion.button
                onClick={handleDownloadDecreto}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#15803d] hover:bg-[#166534] text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <Icon icon="mdi:download" width="24" height="24" />
                <span>Descargar Decreto Oficial (PDF)</span>
              </motion.button>

              <p className="text-xs text-gray-500 text-center">
                Fuente: Presidencia de la República de Colombia
              </p>
            </motion.div>
          </div>

          {/* Footer con llamado a la acción */}
          <div className="bg-green-50/50 px-8 py-6 border-t border-green-100">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-800 font-semibold mb-1">
                  ¿Necesitas asesoría sobre este decreto?
                </p>
                <p className="text-gray-600 text-sm">
                  Nuestro equipo de expertos puede ayudarte a entender su impacto en tu negocio
                </p>
              </div>
              <a
                href="/contacto"
                className="bg-[#15803d] hover:bg-[#166534] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 whitespace-nowrap shadow-md hover:shadow-lg"
              >
                Contáctanos
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DecretoSection;