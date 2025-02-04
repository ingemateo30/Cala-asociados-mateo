import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "../Layout/ScrollAnimationWrapper";
import { Icon } from "@iconify/react";

const ContactForm = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <ScrollAnimationWrapper>

    <section id="contact" className="overflow-hidden py-2 md:py-8 lg:py-28">
      <motion.div className="container mx-auto"variants={scrollAnimation}>
        <div className="-mx-4 flex flex-wrap justify-items-center">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp mb-12 rounded-lg bg-white px-8 py-11 shadow-lg dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s"
              style={{ borderRadius: "20px" }} 
            >
              <h2 className="mb-3 text-center text-2xl font-bold text-black dark:text-black sm:text-3xl lg:text-2xl xl:text-3xl">
                ¡ENVÍANOS UN MENSAJE!
              </h2>
              <p className="mb-12 text-center text-black font-medium text-body-color">
                Estamos atentos a tus necesidades.
              </p>
              <form action="https://formspree.io/f/xeqyogaw" method="POST">
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <input
                        name="Nombre:"
                        type="text"
                        placeholder="Ingresa tu nombre"
                        className="w-full rounded-md border border-gray-400 bg-transparent px-6 py-3 text-base text-gray-800 outline-none focus:border-sky-700 shadow-md focus:shadow-inner dark:border-green-300 dark:bg-transparent dark:text-gray-700 dark:shadow-xl dark:focus:border-sky-700"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <input
                        type="email"
                        name="Email:"
                        placeholder="Ingresa tu Email"
                        className="w-full rounded-md border border-gray-400 bg-transparent px-6 py-3 text-base text-gray-800 outline-none focus:border-sky-700 shadow-md focus:shadow-inner dark:border-green-300 dark:bg-transparent dark:text-gray-700 dark:shadow-xl dark:focus:border-sky-700"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 ">
                    <div className="mb-8">
                      <input
                        type="tel"
                        name="Número de celular:"
                        placeholder="Ingresa tu número de celular"
                        className="w-full rounded-md border border-gray-400 bg-transparent px-6 py-3 text-base text-gray-800 outline-none focus:border-sky-700 shadow-md focus:shadow-inner dark:border-green-300 dark:bg-transparent dark:text-gray-700 dark:shadow-xl dark:focus:border-sky-700"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <textarea
                        name="Mensaje"
                        rows={5}
                        placeholder="Ingresa tu mensaje"
                        className="w-full rounded-md border border-gray-400 bg-transparent px-6 py-3 text-base text-gray-800 outline-none focus:border-sky-700 shadow-md focus:shadow-inner dark:border-green-300 dark:bg-transparent dark:text-gray-700 dark:shadow-xl dark:focus:border-sky-700"
                        style={{ resize: "none" }} 
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex w-full justify-center px-4">
                    <button
                      className="rounded-md bg-calagreen px-8 py-4 text-base font-medium text-white shadow-md duration-300 hover:bg-lime-400 dark:shadow-md dark:hover:bg-calagreen_light"
                      type="submit"
                    >
                      Enviar mensaje
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12"></div>
        </div>
      </motion.div>
    </section>
    </ScrollAnimationWrapper>
  );
}

export default ContactForm;
