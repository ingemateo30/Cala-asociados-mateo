"use client";

import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { client, urlFor } from "../lib/sanity";
import Image from "next/image";
import { Container } from "@mui/material";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData() {
  const query = `
    *[_type == 'blog'] | order(_createdAt desc) {
      title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage,
      _createdAt
    }`;

  const data = await client.fetch(query);
  return data;
}

export default function Noticias() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newData = await getData();
      setData(newData);
    };
    fetchData();
  }, []);

  const filteredData = data.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="w-full p-8 md:p-14 bg-white">
        <Container
          sx={{
            pt: 6,
            pb: 6,
            textAlign: { xs: "center", md: "left" },
          }}
        />
        
        {/* Título y Formulario */}
        <div className="mb-12">
          <p className="mb-4 text-4xl md:text-5xl font-bold text-gray-800">
            Últimas publicaciones
          </p>
          <p className="text-lg md:text-xl font-light text-gray-400">
            Todos los artículos y noticias de CALA Asociados, contadores públicos.
          </p>

          {/* Contenedor del formulario de búsqueda */}
          <div className="flex justify-center md:justify-start mt-6">
            <form className="flex flex-col md:flex-row w-full max-w-lg gap-3">
              <input
                type="text"
                id="form-subscribe-Search"
                className="flex-grow rounded-lg border border-calagreen py-2 px-4 bg-white text-gray-700 placeholder-green-800 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Ingresar título"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="px-4 py-2 text-base font-semibold text-white bg-calagreen rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-calayellow focus:ring-offset-2"
                type="submit"
              >
                Buscar
              </button>
            </form>
          </div>
        </div>

        {/* Contenido de publicaciones */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-2">
          {filteredData.map((post, idx) => (
            <div key={idx} className="m-auto overflow-hidden rounded-lg shadow-xl cursor-pointer lg:w-90">
              <a href={`/blog/${post.currentSlug}`} className="block w-full h-full">
                <Image
                  src={urlFor(post.titleImage).url()}
                  alt="blog photo"
                  className="object-cover w-full max-h-40"
                  width={500}
                  height={500}
                />
                <div className="w-full p-8 bg-white">
                  <p className="font-medium text-yellow-400 text-md">Reciente</p>
                  <p className="my-2 text-2xl font-medium text-gray-800">{post.title}</p>
                  <p className="font-light text-gray-600 text-md">{post.smallDescription}</p>
                  <div className="flex items-center mt-4">
                    <div className="flex flex-col justify-between ml-8 text-sm">
                      <p className="text-gray-400">Fecha de publicación</p>
                      <p className="text-calagreen">
                        {new Date(post._createdAt).toISOString().split("T")[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}


