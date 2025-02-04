import React from "react";
import Carousel from "../Carousel";

const data = [
  { id: 1, title: 'Revisoría Fiscal', description: 'Servicios de revisoría fiscal para empresas en San Gil y Bucaramanga.', imageUrl: 'https://assets-global.website-files.com/64075f5f68279c72a6308831/6480d25d73d83cccd71644bb_Away%20day%20header.jpg' },
  { id: 2, title: 'Auditorías Integrales', description: 'Servicios de auditorías integrales en San Gil y Bucaramanga.', imageUrl: 'https://pics.craiyon.com/2023-05-27/99e818fb96974f31a0367cce0a30a1dc.webp' },
  { id: 3, title: 'Auditorías de gestión', description: 'Servicios de auditorías de gestión para empresas en San Gil y Bucaramanga.', imageUrl: 'https://images.pexels.com/photos/15476106/pexels-photo-15476106/free-photo-of-the-inside-of-a-large-building-with-a-large-dome.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 4, title: 'Auditoría e Interventoría de Proyectos', description: 'Servicios de auditoría e interventoría de proyectos en San Gil y Bucaramanga.', imageUrl: 'https://images.pexels.com/photos/13344830/pexels-photo-13344830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 5, title: 'Asesorías Tributarias', description: 'Servicios de asesorías tributarias en San Gil y Bucaramanga.', imageUrl: 'https://lh3.googleusercontent.com/Kv48bq0iMB48nLt0na8iVX3Ban7uZ2WUtX7AliVXKfc3Nm9GKXhYdLtwHo8HhFQTiHpM9IzvtPHr1bc-bI3snD-W1NI-MJbKjhasL7Eieqi12GtGFDbZNK1cPU4yds9vFd152VJV9MhGzBkfkSJVA9g' },
  { id: 6, title: 'Asesorías Contables, Económicas y Financieras Tributarias', description: 'Servicios de asesorías contables, económicas y financieras tributarias en San Gil y Bucaramanga.', imageUrl: 'https://exactera.com/wp-content/uploads/2023/06/AdobeStock_299751307-scaled-1.jpeg' },
  { id: 7, title: 'Sector Público', description: 'Servicios contables para el sector público en San Gil y Bucaramanga.', imageUrl: 'https://edicionesdelau.com/wp-content/uploads/2019/07/Normas-internacionales_2dEd-scaled.jpg' },
  { id: 8, title: 'Normas Internacionales de Información Financiera. NIIF.', description: 'Normas internacionales de información financiera para empresas en San Gil y Bucaramanga.', imageUrl: 'https://daily.jstor.org/wp-content/uploads/2017/08/nyc_skyline_1050x700.jpg' },
];

const Services = () => {
  return (
    <>
      <div className="bg-white">
        <div className="bg-slate-90">
          <h1 className="pt-12 text-center text-gray-700 font-bold text-4xl bg-slate-50">
            Nuestros Servicios
          </h1>
          {/* <div className="border-t-2 border-calagreen mx-auto w-1/2"></div> */}
          <Carousel data={data} />
        </div>
      </div>
    </>
  );
};

export default Services;
