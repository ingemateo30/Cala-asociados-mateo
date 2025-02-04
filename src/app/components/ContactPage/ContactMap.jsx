import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "../Layout/ScrollAnimationWrapper";
import { Icon } from "@iconify/react";

const ContactMap = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  return (
    <ScrollAnimationWrapper>

    <section id="contact" className="overflow-hidden py-4 md:py-12 lg:py-12">
      <motion.div className="container mx-auto"variants={scrollAnimation}>
        <div className="-mx-4 flex flex-wrap justify-items-center">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp mb-12 rounded-lg bg-white px-8 py-11 shadow-lg dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s"
              style={{ borderRadius: "20px" }} 
            >
              <h2 className="mb-4 text-center text-2xl font-bold text-black dark:text-black sm:text-3xl lg:text-2xl xl:text-3xl">
                Nuestra oficina en San Gil  
              </h2>
              
              <div className="w-full mt-2">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.7567828384376!2d-73.13697352591909!3d6.5523603228292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e69c7fd40046891%3A0x169f63d16a26658b!2sCALA%20ASOSCIADOS!5e0!3m2!1ses!2sco!4v1713189993492!5m2!1ses!2sco"
                    width="100%"
                    height="471"
                    style={{ border: "2px" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="lg:w-[540px]"
                  ></iframe>
                </div>

            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12"></div>
        </div>
      </motion.div>
    </section>
    </ScrollAnimationWrapper>
  );
}
export default ContactMap;
