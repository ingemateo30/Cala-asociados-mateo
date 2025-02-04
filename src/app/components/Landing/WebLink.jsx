import { motion } from 'framer-motion';
import Link from 'next/link';

const WebLink = () => {

  const links = [
    {
      title: "DIAN",
      href: "https://www.dian.gov.co/",
      imageUrl: "/dian.webp",
      altText: "DIAN logo",
      linkText: "Dirección de Impuestos y Aduanas Nacionales"
    },
    {
      title: "Cámara de Comercio de Bucaramanga",
      href: "https://www.camaradirecta.com/",
      imageUrl: "/camara.png",
      altText: "Cámara de Comercio de Bucaramanga",
      linkText: "Cámara de Comercio de Bucaramanga"
    },
    {
      title: "Hacienda",
      href: "https://www.minhacienda.gov.co/webcenter/portal/Minhacienda",
      imageUrl: "/minh.png",
      altText: "Ministerio de Hacienda",
      linkText: "Ministerio de Hacienda"
    }
  ];

  return (
    <div className="flex flex-col items-center bg-white pb-16 p-10"> {/* Apply padding */}
      <h1 className="text-2xl text-gray-700 font-bold mb-8 mt-6 ml-6">Sitios web relevantes</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 w-full max-w-6xl"> {/* Grid layout */}
        {links.map((link, index) => (
          <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }} key={index} className="flex items-center cursor-pointer bg-gray-100 p-4 rounded-lg"> {/* Apply background, padding, and rounded corners */}
            <Link href={link.href} target="_blank" rel="noopener noreferrer">
              <div
              
                className="flex items-center"
              >
                <motion.img
                  src={link.imageUrl}
                  alt={link.altText}
                  className="w-32 h-32 rounded-lg shadow-lg mr-4" 
                />
                <motion.span
                  className="text-lg font-bold text-gray-800 max-w-40 text-center" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.2 } }}
                >
                  {link.linkText}
                </motion.span>
              </div>
            </Link>
            {index !== links.length && <div className="mt-4 border-t border-gray-400 w-auto"></div>} {/* Apply border */}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WebLink;
