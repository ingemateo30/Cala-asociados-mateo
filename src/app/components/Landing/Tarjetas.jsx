import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import getScrollAnimation from "../../utils/getScrollAnimation";
import { Icon } from "@iconify/react";

const servicios = [
  { id: 1, image: '/servicios/s1.jpg', title: 'Revisoría Fiscal', description: 'Ejercicio de la función de Revisor Fiscal en la entidad de acuerdo con las normas legales y profesionales, con Contadores Públicos de suficiente solvencia moral y profesional, apoyados por equipos de Auditoría interdisciplinarios.', icon: "bx:bx-check-shield" },
  { id: 2, image: '/servicios/s2.jpg', title: 'Auditorías Integrales', description: 'Evaluación global de la entidad y opinión calificada de especialistas en las ramas de Auditoría Financiera, Operativa y otras auditorías con fines especiales.', icon: "mdi:folder-account-outline" },
  { id: 3, image: '/servicios/s3.jpg', title: 'Auditorías de gestión', description: 'Análisis del nivel de eficiencia, eficacia, efectividad y productividad de los procesos generales y particulares de una entidad con el objeto de alcanzar sus objetivos.', icon: "mdi:account-cog" },
  { id: 4, image: '/servicios/s4.jpg', title: 'Auditoría e Interventoría de Proyectos', description: 'Servicio orientado a examinar la gestión financiero-administrativa de los proyectos y obtener una seguridad razonable que los recursos han sido administrados de acuerdo con los requerimientos...', icon: "mdi:clipboard-check-outline" },
  { id: 5, image: '/servicios/s5.jpg', title: 'Asesorías Tributarias', description: 'Los servicios de Asesoría Tributaria se enfocan principalmente, a la orientación y dirección de personal del declarante en la preparación y/o revisión de la Declaración de Renta y sus anexos, solicitud y trámite de saldos a favor...', icon: "mdi:file-document-edit-outline" },
  { id: 6, image: '/servicios/s6.jpg', title: 'Asesorías Contables, Económicas y Financieras Tributarias', description: 'Servicios de asesoría en cada una de estas actividades y sobre aspectos especializados en cada caso.', icon: "mdi:finance" },
  { id: 7, image: '/servicios/s7.jpg', title: 'Sector Público', description: 'Servicios de consultoría y asesoría en desarrollo e implementación de los nuevos modelos de administración en las áreas: Contable, Control Interno, Cartera, Tesorería, Calidad, Servicios Públicos y   Reportes e Informes.', icon: "mdi:account-group-outline" },
  { id: 8, image: '/servicios/niff.jpg', title: 'Normas Internacionales de Información Financiera. NIIF.', description: 'Servicios de asesoría, diagnóstico, implementación y capacitación sobre NIIF, comprendiendo el acompañamiento en la elaboración y presentación del diagnóstico, políticas contables...', icon: "mdi:book-open-variant" }
];

export const Tarjetas = () => {
  const ref = useRef(null);
  const [hoveredStates, setHoveredStates] = useState({});

  const handleMouseEnter = (index) => {
    setHoveredStates((prevState) => ({ ...prevState, [index]: true }));
  };

  const handleMouseLeave = (index) => {
    setHoveredStates((prevState) => ({ ...prevState, [index]: false }));
  };

  useEffect(() => {
    const handleScroll = () => {
      getScrollAnimation(ref.current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={ref} className="bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="flex-wrap items-center justify-center gap-8 text-center sm:flex">
        {servicios.map((servicio, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative w-full px-4 py-4 mt-2 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 h-[280px] ring-2 ring-green-200 hover:ring-green-600 ring-offset-2 ring-offset-gray-900 ${
              hoveredStates[index] ? "hover:shadow-calagreen" : ""
            } ${index === 1 || index === 4 ? 'mt-16 md:mt-20 lg:mt-12' : ''}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-200 rounded-full">
                <Icon icon={servicio.icon} className="text-green-600 text-3xl" />
              </div>
            </div>
            <h3 className="py-3 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-gray-700">
              {servicio.title}
            </h3>
            <p className="py-2 text-gray-500 text-md dark:text-gray-500">
              {servicio.description}
            </p>
            <button
              className="absolute inset-0 text-green-100 bg-calagreen text-2xl font-bold px-4 py-2 rounded-md opacity-0 transition ease-in-out delay-150 hover:opacity-90"
              onClick={() => {
                window.location.href = "/servicios";
              }}
              style={{ zIndex: hoveredStates[index] ? 1 : -1 }}
            >
              Ver más
            </button>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          className="rounded-full border-2 border-yellow-500 bg-transparent text-white text-lg px-4 py-2 flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 mt-4 mb-4 mr-16"
          onClick={() => {
            window.location.href = "/servicios";
          }}
        >
          Ir a todos los servicios
          <Icon
            icon="fe:arrow-right"
            style={{ color: "white", marginLeft: "6px" }}
          />
        </button>
      </div>
    </div>
  );
};
