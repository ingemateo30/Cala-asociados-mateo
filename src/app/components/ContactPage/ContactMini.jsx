import React from "react";
import { motion } from "framer-motion";

const ContactMini = () => {
  const cards = [
    {
      title: "Email",
      description: "Aquí está nuestro correo institucional.",
      info: "contabilidad@calaasociados.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-calagreen"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      ),
    },
    {
      title: "Oficina San Gil",
      description: "",
      info: "Calle 10 # 12 - 184 Centro comercial El Puente Torre empresarial, local 506.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-calagreen"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      ),
    },
    
    {
      title: "Oficina Bucaramanga",
      description: "",
      info: "Calle 35 #19-41 Oficina 314 Centro Empresarial La Triada.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-calagreen"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      ),
    },

    {
      title: "Teléfono",
      description: "Lunes a viernes de 8 am a 12m  y de 2 a 6 pm",
      info: "(+57) 315 3754395",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-calagreen"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-gray-200 pt-16 ">
      <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-white shadow-md rounded-lg overflow-hidden ring-1 ring-green-200 ring-offset-2 ${index === 0 || index === cards.length - 1 ? 'ring-1 ring-gray-200 ring-offset-2' : ''}`}
          >
            <div className="p-6 flex flex-col items-center justify-center text-center">
              <span className={`p-3 rounded-full bg-green-100`}>
                {card.icon}
              </span>
              <h2 className="mt-4 text-lg font-semibold text-gray-800">
                {card.title}
              </h2>
              <p className="mt-2 text-gray-600">
                {card.description}
              </p>
              <p className={`mt-2 text-calagreen `}>{card.info}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ContactMini;
