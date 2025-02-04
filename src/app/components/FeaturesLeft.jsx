"use client";

import { Icon } from "@iconify/react";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "../components/Layout/ScrollAnimationWrapper";


const FeaturesLeft = ({ title1, title2, title3, info1, info2, info3 }) => {
    const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  return (
    // primero

    <div class="relative lg:p-2 px-2">
      <div class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-12 lg:items-center rounded-xl bg-white">
        <div class="lg:col-start-2 col-start-1 max-w-full md:pl-12 pl-2 mt-6 mb-6">
          <ScrollAnimationWrapper>
            <motion.div variants={scrollAnimation}>
              <p class="text-5xl font-extrabold tracking-tight text-gray-900">
                {title1}
              </p>
            </motion.div>
          </ScrollAnimationWrapper>
          <div class="mt-10">
            <hr className="w-48 border-t-4 border-calagreen mb-8"></hr>

            <div class="flex">
              <div class="lg:mr-24 mr-4">
                <p class="text-lg lg:text-lg leading-8 text-gray-900">
                  {info1}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="relative lg:ml-4 mt-8 mx-8 lg:mx-6 lg:mt-4 lg:col-start-1 lg:mb-4">
          <Image
            src="/images/Nuestra_historia.jpg"
            width={400}
            height={400}
            alt="Ilustración de nuestra historia Cala Asociados San Gil: un equipo de profesionales trabajando juntos en una oficina moderna."
            className="relative w-auto mx-auto mr-8 rounded-xl"
          />
        </div>
      </div>

      {/* segundo */}

      <div class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:mt-8 mt-6 lg:gap-12 lg:items-center rounded-xl bg-white">
        <div class="lg:col-start-1 col-start-1 max-w-full md:pl-12 pl-2 my-6">
          <ScrollAnimationWrapper>
            <motion.div variants={scrollAnimation}>
              <p class="text-5xl lg:ml-24 font-extrabold tracking-tight text-gray-900">
                {title2}
              </p>
            </motion.div>
          </ScrollAnimationWrapper>
          <div class="mt-10">
            <hr className="w-48 lg:ml-24 border-t-4 border-calagreen mb-8"></hr>

            <div class="flex">
              <div class="lg:ml-24 lg:mr-4">
                <p class="text-lg lg:text-lg leading-8 text-gray-900">
                  {info2}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="relative lg:mr-24 mt-8 lg:mx-0 lg:mt-4 lg:col-start-2 lg:mb-4">
          <Image
            src="/images/Nuestra_filosofia.jpg"
            width={400}
            height={400}
            alt="Ilustración de nuestra filosofía: Contadores públicos en San Gil y Bucaramanga trabajando juntos en valores y principios empresariales."
            className="relative w-auto mx-auto mr-8 rounded-xl"
          />
        </div>
      </div>

      {/* tercero */}

      <div class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:mt-8 mt-6 lg:gap-12 lg:items-center rounded-xl bg-white">
        <div class="lg:col-start-2 col-start-1 max-w-full md:pl-12 pl-2 mt-6 mb-8">
          <ScrollAnimationWrapper>
            <motion.div variants={scrollAnimation}>
              <p class="text-5xl font-extrabold tracking-tight text-gray-900">
                {title3}
              </p>
            </motion.div>
          </ScrollAnimationWrapper>
          <div class="mt-10">
            <hr className="w-48 border-t-4 border-calagreen mb-8"></hr>

            <div class="flex">
              <div class="lg:mr-24 mr-4">
                <p class="text-lg lg:text-lg leading-8 text-gray-900">
                  {info3}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="relative lg:ml-4 mt-8 mx-8 lg:mx-6 lg:mt-4 lg:col-start-1 lg:mb-6">
          <Image
            src="/images/Nuestra_mision.jpg"
            width={400}
            height={400}
            alt="Ilustración de nuestra misión: Contadores públicos comprometidos con la excelencia en San Gil y Bucaramanga."
            className="relative w-auto mx-auto mr-8 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesLeft;
