import Link from "next/link";
import { fullBlog } from "../../lib/interface";
import { client, urlFor } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
        title,
        content,
        titleImage,
        _createdAt
    }[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);

  return (
    <div className="bg-white p-4 lg:px-24 lg:py-16">
      <div className="flex justify-between items-center px-24">
        <Link href="/">
          <div className="flex items-center">
            <img
              src="/cala_completo.png"
              alt="Logo"
              className="h-12 w-auto lg:h-16 lg:w-auto mr-4"
            />
          </div>
        </Link>
        <Link href="/noticias">
          <button className="text-calagreen border px-4 py-2 text-xl font-bold rounded-lg border-calagreen shadow-md hover:shadow-lg bg-green-50 text-semibold">Volver a Noticias 👈🏻</button>
          
        </Link>
      </div>

      <h1 className="mt-12 px-36 text-5xl text-gray-800 text-center leading-8 font-bold tracking-tight sm:text-4xl">
        {data.title}
      </h1>
      <div className="flex flex-col items-center mt-4">

               
                    <p className="text-gray-400 mx-4">Fecha de publicación</p>
                    <p className="text-calagreen">
                    {new Date(data._createdAt).toISOString().split("T")[0]}
                    </p>
      
                </div>

      <div className="flex flex-col items-center mt-8">
        <Image
          src={urlFor(data.titleImage).url()}
          width={600}
          height={600}
          alt="Title Image"
          priority
          className="rounded-lg border shadow-lg"
        />
        {/* <div className="mt-8 text-gray-700 text-lg leading-10 text-left">
          <PortableText value={data.content} />
        </div> */}

  

        {/* Usando puluggin de texto tailwind */}
        <div className="mt-16 prose prose-lg prose-li:marker:text-primary prose-a:text-primary">
        <PortableText value={data.content} />
      </div>
      </div>
    </div>
  );
}
