import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { paths } from '../routes/paths';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const NavLinks = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lg:flex lg:items-center">
      <motion.ul
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={`hidden md:hidden lg:flex lg:items-center space-y-4 lg:space-y-0 lg:space-x-8 bg-white bg-opacity-80 rounded-full sm:flex sm:items-center sm:space-y-4 sm:space-x-8 ${isOpen ? 'hidden' : 'block'}`}
      >
        {Object.entries(paths.navbar).map(([key, value]) => (
          <motion.li
            key={key}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-2"
          >
            {key.toLowerCase() === 'contacto' ? (
              <Link href="/contacto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-500 text-white text-lg font-medium rounded-full py-2 px-6 hover:bg-yellow-600"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </motion.button>
              </Link>
            ) : (
              <a href={value} className="text-black hover:text-calagreen text-lg font-medium flex items-center">
                {key.toLowerCase() === 'inicio' ? (
                  <div className="bg-calagreen w-8 h-8 flex items-center justify-center rounded-full mr-2">
                    <Icon icon="fa:home" width="24" height="24" style={{ color: '#ffffff' }} />
                  </div>
                ) : null}
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </a>
            )}
          </motion.li>
        ))}
      </motion.ul>
      <button onClick={toggleMenu} className={`lg:hidden bg-calagreen text-white text-lg font-medium rounded-full py-2 px-4 hover:bg-yellow-600 ${isOpen ? 'hidden' : 'block'}`}>
        <Icon icon="iconamoon:menu-burger-horizontal-fill" style={{ color: '#FCF775' }} />
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute top-6 right-4 bg-white px-8 py-3 rounded-lg shadow-lg lg:hidden"
        >
          <button onClick={toggleMenu} >
            <Icon icon="carbon:close-filled" width="32" height="32" style={{ color: '#EAB308' }} />
          </button>
          <ul>
            {Object.entries(paths.navbar).map(([key, value]) => (
              <motion.li
                key={key}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="my-4"
              >
                {key.toLowerCase() === 'contacto' ? (
                  <Link href="/contacto">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-calagreen text-white mt-1 text-xl font-medium rounded-full py-2 px-4 hover:bg-yellow-600"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </motion.button>
                  </Link>
                ) : (
                  <a href={value} className="text-black hover:text-calagreen text-xl font-medium">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </a>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default NavLinks;
