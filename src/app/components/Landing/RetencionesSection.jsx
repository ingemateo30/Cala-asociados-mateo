"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const RetencionesSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const retencionesData = [
    {
      categoria: 'Laboral',
      items: [
        {
          concepto: 'Salarios y demás rentas de trabajo',
          baseUVT: '95',
          basePesos: '$4.976.000',
          tarifa: 'Art. 383 ET',
          icon: 'mdi:account-cash'
        },
        {
          concepto: 'Indemnizaciones de la relación laboral (ingresos > 204 UVT)',
          baseUVT: '0',
          basePesos: '100%',
          tarifa: '20%',
          icon: 'mdi:hand-coin'
        }
      ]
    },
    {
      categoria: 'Compras y Servicios',
      items: [
        {
          concepto: 'Compras generales (declarantes renta)',
          baseUVT: '10',
          basePesos: '$524.000',
          tarifa: '2,5%',
          icon: 'mdi:cart'
        },
        {
          concepto: 'Compras generales (no declarantes renta)',
          baseUVT: '10',
          basePesos: '$524.000',
          tarifa: '3,5%',
          icon: 'mdi:cart-outline'
        },
        {
          concepto: 'Servicios generales (declarantes renta)',
          baseUVT: '2',
          basePesos: '$105.000',
          tarifa: '4%',
          icon: 'mdi:tools'
        },
        {
          concepto: 'Servicios generales (no declarantes renta)',
          baseUVT: '2',
          basePesos: '$105.000',
          tarifa: '6%',
          icon: 'mdi:wrench'
        }
      ]
    },
    {
      categoria: 'Honorarios',
      items: [
        {
          concepto: 'Honorarios y comisiones (personas jurídicas)',
          baseUVT: '0',
          basePesos: '100%',
          tarifa: '11%',
          icon: 'mdi:briefcase'
        },
        {
          concepto: 'Honorarios y comisiones (no declarantes renta)',
          baseUVT: '0',
          basePesos: '100%',
          tarifa: '10%',
          icon: 'mdi:briefcase-outline'
        },
        {
          concepto: 'Honorarios contratos > 3.300 UVT',
          baseUVT: '0',
          basePesos: '100%',
          tarifa: '11%',
          icon: 'mdi:file-document-edit'
        }
      ]
    },
    {
      categoria: 'Arrendamientos',
      items: [
        {
          concepto: 'Arrendamiento de bienes muebles',
          baseUVT: '0',
          basePesos: '100%',
          tarifa: '4%',
          icon: 'mdi:office-building'
        },
        {
          concepto: 'Arrendamiento de bienes inmuebles',
          baseUVT: '10',
          basePesos: '$524.000',
          tarifa: '3,5%',
          icon: 'mdi:home-city'
        }
      ]
    },
    {
      categoria: 'Transporte',
      items: [
        {
          concepto: 'Servicios de transporte nacional de carga',
          baseUVT: '2',
          basePesos: '$105.000',
          tarifa: '1%',
          icon: 'mdi:truck'
        },
        {
          concepto: 'Servicios de transporte nacional de pasajeros',
          baseUVT: '10',
          basePesos: '$524.000',
          tarifa: '3,5%',
          icon: 'mdi:bus'
        }
      ]
    },
    {
      categoria: 'Otros Servicios',
      items: [
        {
          concepto: 'Servicios de hoteles y restaurantes',
          baseUVT: '2',
          basePesos: '$105.000',
          tarifa: '3,5%',
          icon: 'mdi:silverware-fork-knife'
        },
        {
          concepto: 'Servicios de vigilancia y aseo (sobre AIU ≥ 10%)',
          baseUVT: '2',
          basePesos: '$105.000',
          tarifa: '2%',
          icon: 'mdi:shield-check'
        },
        {
          concepto: 'Servicios integrales de salud por IPS',
          baseUVT: '2',
          basePesos: '$105.000',
          tarifa: '2%',
          icon: 'mdi:hospital-box'
        },
        {
          concepto: 'Servicios temporales (sobre AIU ≥ 10%)',
          baseUVT: '2',
          basePesos: '$105.000',
          tarifa: '1%',
          icon: 'mdi:account-multiple'
        }
      ]
    },
    {
      categoria: 'Construcción y Software',
      items: [
        {
          concepto: 'Contratos de construcción y urbanización',
          baseUVT: '10',
          basePesos: '$524.000',
          tarifa: '2%',
          icon: 'mdi:hammer-wrench'
        },
        {
          concepto: 'Licenciamiento y derecho de uso del software',
          baseUVT: '0',
          basePesos: '100%',
          tarifa: '3,5%',
          icon: 'mdi:application'
        }
      ]
    },
    {
      categoria: 'Financiero',
      items: [
        {
          concepto: 'Intereses y rendimientos financieros',
          baseUVT: '0',
          basePesos: '100%',
          tarifa: '7%',
          icon: 'mdi:bank'
        },
        {
          concepto: 'Compras con tarjeta débito o crédito',
          baseUVT: '0',
          basePesos: '100%',
          tarifa: '1,5%',
          icon: 'mdi:credit-card'
        },
        {
          concepto: 'Compras de combustibles',
          baseUVT: '0',
          basePesos: '100%',
          tarifa: '0,10%',
          icon: 'mdi:gas-station'
        }
      ]
    },
    {
      categoria: 'Bienes Raíces',
      items: [
        {
          concepto: 'Enajenación de activos fijos de personas naturales',
          baseUVT: '0',
          basePesos: '100%',
          tarifa: '1%',
          icon: 'mdi:home-export-outline'
        },
        {
          concepto: 'Adquisición vivienda habitación (primeras 20.000 UVT)',
          baseUVT: '≥10 hasta 10.000',
          basePesos: '≤ $523.740.000',
          tarifa: '1%',
          icon: 'mdi:home'
        },
        {
          concepto: 'Adquisición vivienda habitación (exceso > 20.000 UVT)',
          baseUVT: 'Exceso 10.000',
          basePesos: '> $523.740.000',
          tarifa: '2,5%',
          icon: 'mdi:home-plus'
        },
        {
          concepto: 'Adquisición bienes raíces (uso diferente a vivienda)',
          baseUVT: '≥10',
          basePesos: '≥ $524.000',
          tarifa: '2,5%',
          icon: 'mdi:office-building-outline'
        }
      ]
    },
    {
      categoria: 'IVA',
      items: [
        {
          concepto: 'Rete IVA por compras (15% sobre el IVA)',
          baseUVT: '10',
          basePesos: '$524.000',
          tarifa: '15%',
          icon: 'mdi:receipt-text'
        },
        {
          concepto: 'Rete IVA por servicios (15% sobre el IVA)',
          baseUVT: '2',
          basePesos: '$105.000',
          tarifa: '15%',
          icon: 'mdi:file-percent'
        }
      ]
    },
    {
      categoria: 'Otros Ingresos',
      items: [
        {
          concepto: 'Otros ingresos tributarios (declarantes)',
          baseUVT: '10',
          basePesos: '$524.000',
          tarifa: '2,5%',
          icon: 'mdi:currency-usd'
        },
        {
          concepto: 'Otros ingresos tributarios (no declarantes)',
          baseUVT: '10',
          basePesos: '$524.000',
          tarifa: '3,5%',
          icon: 'mdi:cash-multiple'
        }
      ]
    }
  ];

  const categorias = ['todos', ...retencionesData.map(cat => cat.categoria)];

  const filteredData = retencionesData
    .map(cat => ({
      ...cat,
      items: cat.items.filter(item =>
        item.concepto.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(cat =>
      (selectedCategory === 'todos' || cat.categoria === selectedCategory) &&
      cat.items.length > 0
    );

  return (
    <section className="bg-gradient-to-b from-white to-green-50 py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Icon icon="mdi:file-table-box-multiple" className="text-calagreen text-5xl mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              Tabla de Retenciones 2026
            </h2>
          </div>
          <p className="text-xl text-gray-600 mt-4">
            Tarifas más usadas | UVT: <span className="font-bold text-calagreen">$52.374</span>
          </p>
          <div className="mt-6 bg-green-100 border-l-4 border-calagreen p-4 rounded-lg max-w-3xl mx-auto">
            <p className="text-gray-700">
              <Icon icon="mdi:information" className="inline text-calagreen mr-2" />
              <strong>Importante:</strong> Esta tabla incluye las retenciones en la fuente más utilizadas para el año gravable 2026.
            </p>
          </div>
        </motion.div>

        {/* Búsqueda y Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="grid md:grid-cols-2 gap-4">
            {/* Buscador */}
            <div className="relative">
              <Icon
                icon="mdi:magnify"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                width="20"
              />
              <input
                type="text"
                placeholder="Buscar concepto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
             text-gray-700 placeholder-gray-400 
             focus:ring-2 focus:ring-calagreen focus:border-transparent"
              />
            </div>

            {/* Selector de categoría */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
             text-gray-700 bg-white 
             focus:ring-2 focus:ring-calagreen focus:border-transparent"
            >
              {categorias.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'todos' ? 'Todas las categorías' : cat}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Tarjetas de Retenciones */}
        <div className="space-y-8">
          {filteredData.map((categoria, catIndex) => (
            <motion.div
              key={categoria.categoria}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Título de categoría */}
              <div className="bg-gradient-to-r from-calagreen to-green-600 px-6 py-4">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <Icon icon="mdi:tag" className="mr-2" width="28" />
                  {categoria.categoria}
                </h3>
              </div>

              {/* Items de la categoría */}
              <div className="divide-y divide-gray-200">
                {categoria.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: itemIndex * 0.05 }}
                    className="p-6 hover:bg-green-50 transition-colors duration-200"
                  >
                    <div className="grid md:grid-cols-4 gap-4 items-center">
                      {/* Concepto */}
                      <div className="md:col-span-2 flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Icon icon={item.icon} className="text-calagreen" width="24" />
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-lg">
                            {item.concepto}
                          </p>
                        </div>
                      </div>

                      {/* Base UVT y Pesos */}
                      <div className="text-center md:text-left">
                        <p className="text-sm text-gray-500 font-medium">Base Mínima</p>
                        <p className="text-calagreen font-bold">{item.baseUVT} UVT</p>
                        <p className="text-gray-700 text-sm">{item.basePesos}</p>
                      </div>

                      {/* Tarifa */}
                      <div className="text-center md:text-right">
                        <div className="inline-block bg-gradient-to-r from-green-600 to-calagreen text-white px-6 py-3 rounded-full">
                          <p className="text-sm font-medium">Tarifa</p>
                          <p className="text-2xl font-bold">{item.tarifa}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer informativo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-2xl p-8 text-white"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-4 flex items-center">
                <Icon icon="mdi:lightbulb-on" className="mr-2" width="28" />
                Información Importante
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <Icon icon="mdi:check-circle" className="text-green-400 mr-2 mt-1 flex-shrink-0" width="20" />
                  <span>UVT 2026: <strong className="text-white">$52.374</strong></span>
                </li>
                <li className="flex items-start">
                  <Icon icon="mdi:check-circle" className="text-green-400 mr-2 mt-1 flex-shrink-0" width="20" />
                  <span>AIU: Administración, Imprevistos y Utilidad (mínimo 10%)</span>
                </li>
                <li className="flex items-start">
                  <Icon icon="mdi:check-circle" className="text-green-400 mr-2 mt-1 flex-shrink-0" width="20" />
                  <span>Las retenciones aplican cuando se supera la base mínima</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold mb-3">¿Necesitas asesoría personalizada?</h4>
                <p className="text-gray-300 mb-4">
                  Nuestro equipo de expertos puede ayudarte a calcular y aplicar correctamente las retenciones en tu empresa.
                </p>
              </div>
              <div className="flex gap-4">
                <a
                  href="/contacto"
                  className="flex-1 bg-calagreen hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-center"
                >
                  Contáctanos
                </a>
                <button
                  onClick={() => window.open('/Tabla_de_retención_en_la_fuente_2026_Más_usadas.pdf', '_blank')}
                  className="flex-1 bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-center flex items-center justify-center"
                >
                  <Icon icon="mdi:download" className="mr-2" width="20" />
                  Descargar PDF
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Nota de resultados vacíos */}
        {filteredData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Icon icon="mdi:alert-circle-outline" className="text-gray-400 mx-auto mb-4" width="64" />
            <p className="text-gray-600 text-xl">
              No se encontraron resultados para "{searchTerm}"
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('todos');
              }}
              className="mt-4 text-calagreen hover:text-green-700 font-semibold"
            >
              Limpiar filtros
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RetencionesSection;