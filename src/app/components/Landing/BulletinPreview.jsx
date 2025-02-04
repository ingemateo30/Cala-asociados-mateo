import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "../Layout/ScrollAnimationWrapper";
import { Icon } from "@iconify/react";

const BulletinPreview = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const [isHovered, setIsHovered] = useState(false);

  const downloadFile = () => {
    const link = document.createElement("a");
    link.href = "/files/BOLETIN CALA ASOCIADOS 2025.pdf";
    link.download = "BOLETIN CALA ASOCIADOS 2025";
    link.click();
  };

  return (
    <div id="bulletin-preview" className="bg-gradient-to-r from-green-50 to-green-100 bg-waves">
      <div className="max-w-screen-xl lg:mx-36 px-8 xl:px-16">
        <ScrollAnimationWrapper>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-16"
            variants={scrollAnimation}
          >
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl lg:text-5xl font-medium text-calagreen">
                <strong>Boletín tributario 2025 </strong>
              </h1>
              <p className="text-gray-500 text-lg mt-6 mb-6">
                Aquí puedes obtener nuestro último boletín tributario.
              </p>
              
              <button className="bg-calagreen border border-calagreen text-white text-xl font-bold lg:w-72 lg:ml-12 py-3 px-6 rounded-full mb-4 lg:mb-0 lg:mr-6 transition-colors duration-300 ease-in-out hover:bg-transparent hover:text-calagreen"
              onClick={downloadFile}
              >
                
                Descargar
              </button>
            </div>
            <div className="flex items-center justify-center sm:justify-end">
              <motion.div className="relative w-full h-72 overflow-hidden rounded-lg shadow-xl" variants={scrollAnimation}>
                <div className={`relative w-full h-full bg-blue-500 duration-300 overflow-hidden ${isHovered ? "opacity-40 bg-calagreen transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500" : ""}`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={downloadFile}
                >
                  <Image src="/boletin05.png" alt="Boletin Cala Asociados" quality={100} layout="fill" objectFit="cover" />
                  {isHovered && (
                    <div className="absolute inset-0 flex items-center justify-center ">
                      <Icon icon="mingcute:download-line" width="72" height="72"  style={{color: '#EAB308'}} />
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
};

export default BulletinPreview;
