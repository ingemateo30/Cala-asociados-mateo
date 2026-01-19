import Link from 'next/link';
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';


const ServiciosView = () => {
  const servicios = [
    {
      id: 1,
      image: '/servicios/s1.jpg',
      title: 'Revisoría Fiscal',
      description: 'Ejercicio de la función de Revisor Fiscal en la entidad de acuerdo con las normas legales y profesionales, con Contadores Públicos de suficiente solvencia moral y profesional, apoyados por equipos de Auditoría interdisciplinarios.',
      items: [
        'Revisor Fiscal en la entidad de acuerdo con las normas legales y profesionales.',
        'Contadores Públicos de suficiente solvencia moral y profesional.',
        'Equipos de Auditoría interdisciplinarios.'
      ]
    },
    {
      id: 2,
      image: '/servicios/s2.jpg',
      title: 'Auditorías Integrales',
      description: 'Evaluación global de la entidad y opinión calificada de especialistas en las ramas de Auditoría Financiera, Operativa y otras auditorías con fines especiales.',
      items: [
        'Evaluación global de la entidad.',
        'Opinión calificada de especialistas en las ramas de Auditoría Financiera.',
        'Análisis detallado de los estados financieros.'
      ]
    },
    {
      id: 3,
      image: '/servicios/s3.jpg',
      title: 'Auditorías de gestión',
      description: 'Análisis del nivel de eficiencia, eficacia, efectividad y productividad.',
      items: [
        'Análisis del nivel de eficiencia, eficacia, efectividad y productividad.',
        'Identificación de áreas de mejora.',
        'Recomendaciones para alcanzar objetivos.'
      ]
    },
    {
      id: 4,
      image: '/servicios/s4.jpg',
      title: 'Auditoría e Interventoría de Proyectos',
      description: 'Servicio orientado a examinar la gestión financiero-administrativa de los proyectos y obtener una seguridad razonable que los recursos han sido administrados de acuerdo con los requerimientos del proyecto preestablecidos.',
      items: [
        'Examen de la gestión financiero-administrativa de los proyectos.',
        'Obtención de seguridad razonable sobre la correcta administración de los recursos.',
        'Evaluación de cumplimiento de normas y procedimientos internos.'
      ]
    },
    {
      id: 5,
      image: '/servicios/s5.jpg',
      title: 'Asesorías Tributarias',
      description: 'Los servicios de Asesoría Tributaria se enfocan principalmente, a la orientación y dirección de personal del declarante en la preparación y/o revisión de la Declaración de Renta y sus anexos, solicitud y trámite de saldos a favor, consultas en materia tributaria e información actualizada sobre los cambios importantes.',
      items: [
        'Orientación y dirección en la preparación y/o revisión de la Declaración de Renta.',
        'Solicitud y trámite de saldos a favor.',
        'Consultas en materia tributaria e información actualizada sobre cambios importantes.'
      ]
    },
    {
      id: 6,
      image: '/servicios/s6.jpg',
      title: 'Asesorías Contables, Económicas y Financieras Tributarias',
      description: 'Servicios de asesoría en cada una de estas actividades y sobre aspectos especializados en cada caso. Identificación de los cambios que pudieran requerirse, presentando las recomendaciones al respecto para que su implementación conduzca a la optimización de los recursos de la empresa.',
      items: [
        'Asesoría en actividades contables, económicas y financieras.',
        'Identificación de cambios requeridos.',
        'Recomendaciones para optimización de recursos.'
      ]
    },
    {
      id: 7,
      image: '/servicios/s7.jpg',
      title: 'Sector Público',
      description: 'Servicios de consultoría y asesoría en desarrollo e implementación de los nuevos modelos de administración en las áreas: Contable, Control Interno, Cartera, Tesorería, Calidad, Servicios Públicos y   Reportes e Informes.',
      items: [
        'Consultoría y asesoría en desarrollo e implementación de los nuevos modelos de administración.',
        'Mejora de procesos en áreas contables, control interno, tesorería, entre otras.',
        'Optimización de servicios públicos y elaboración de informes.'
      ]
    },
    {
      id: 8,
      image: '/servicios/NIFF.jpg',
      title: 'Normas Internacionales de Información Financiera. NIIF.',
      description: 'Servicios de asesoría, diagnóstico, implementación y capacitación sobre NIIF, comprendiendo el acompañamiento en la elaboración y presentación del diagnóstico, políticas contables, revelaciones y el estado de situación financiera de apertura de la ESFA',
      items: [
        'Asesoría, diagnóstico, implementación y capacitación sobre NIIF.',
        'Elaboración y presentación del diagnóstico.',
        'Definición de políticas contables y revelaciones conforme a NIIF.'
      ]
    }
  ];

  const [hoveredId, setHoveredId] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };
  return (
    <section className="px-4 py-8 md:py-24 mx-auto max-w-7xl bg-white">
      <div className="grid grid-cols-1 gap-y-8 md:gap-y-16">
        {servicios.map((servicio, index) => (
          <motion.div
            key={servicio.id}
            className={`rounded-lg overflow-hidden shadow-lg bg-white md:flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:w-1/2 relative overflow-hidden">
              <img
                src={servicio.image}
                alt={servicio.title}
                className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-6 md:w-1/2">
              <h2 className="text-3xl font-semibold text-gray-800 mb-2">{servicio.title}</h2>
              <p className="text-gray-600 mb-4">{servicio.description}</p>
              <ul className="text-gray-600 mb-4 list-disc pl-5">
                {servicio.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="relative overflow-hidden bg-green-50/50 px-8 py-8 border-t border-green-100">
        {/* brillo suave decorativo */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-green-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green-300/20 rounded-full blur-3xl" />

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-gray-900 font-semibold text-lg mb-1">
              ¿Estás interesado en nuestros servicios?
            </p>
            <p className="text-gray-600 text-sm max-w-md">
              Nuestro equipo de expertos está listo para asesorarte y ayudarte de la mejor manera posible.
            </p>
          </div>

          <a
            href="/contacto"
            className="group inline-flex items-center justify-center gap-2
                 bg-[#15803d] hover:bg-[#166534]
                 text-white font-bold
                 py-3 px-10 rounded-xl
                 transition-all duration-300
                 shadow-lg hover:shadow-xl
                 hover:-translate-y-0.5
                 whitespace-nowrap"
          >
            Contáctanos
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>

    </section>
  );
};

export default ServiciosView;