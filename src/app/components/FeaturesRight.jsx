"use client"

import { Icon } from "@iconify/react";


const FeaturesRight = () => {

    return ( 

<div class="relative p-4 mb-4">
    <div class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-12 lg:items-center">

    <div class="relative ml-8 mt-10 -mx-4 md:-mx-12 lg:mt-0 lg:col-start-2">
            <img src="/images/features02.jpg" alt="illustration" class="relative w-auto mx-auto rounded-xl shadow-lg"/>
        </div>

        <div class="lg:col-start-1 lg:ml-8 md:pl-12">
            <p class="text-6xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-white sm:leading-9">
            Filosofía
            </p>
            <div class="mt-10">
            <hr className="w-48 border-t-4 border-calagreen mb-8"></hr>
              
                    <div class="flex">
                        {/* <div class="flex-shrink-0">
                        <Icon icon="mdi:about-circle-outline" width="24" height="24"  style={{color: 'white'}} />
                        </div> */}
                        <div class="mr-24">
                            <p class="text-lg leading-8 text-gray-900 dark:text-white">
                            Presentamos servicios personalizados, acorde a las necesidades del cliente, que den valor agregado al servicio, con criterio de conceptos de calidad para lo cual se dispone de recursos humanos, técnicos y físicos apropiados al trabajo a realizar.
                            </p>

                        </div>
                    </div>
           
 
            </div>
        </div>
        
    </div>
</div>
);
}

export default FeaturesRight;