import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { paths } from '../routes/paths';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const NavLinks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [calculadorasOpen, setCalculadorasOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCalculadoras = () => {
    setCalculadorasOpen(!calculadorasOpen);
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
            className="mx-2 relative"
          >
            {/* Menú de Calculadoras con Dropdown */}
            {key === 'calculadoras' ? (
              <div 
                className="relative"
                onMouseEnter={() => setCalculadorasOpen(true)}
                onMouseLeave={() => setCalculadorasOpen(false)}
              >
                <button 
                  className="text-black hover:text-calagreen text-lg font-medium transition-colors"
                >
                  {value.label}
                </button>
                
                <AnimatePresence>
                  {calculadorasOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100"
                    >
                      {value.submenu.map((item, index) => (
                        <Link key={index} href={item.path}>
                          <div className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-calagreen cursor-pointer transition-colors text-sm font-medium">
                            {item.label}
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : key.toLowerCase() === 'contacto' ? (
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
              <a href={typeof value === 'string' ? value : '#'} className="text-black hover:text-calagreen text-lg font-medium flex items-center">
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

      {/* Botón hamburguesa para móvil */}
      <button onClick={toggleMenu} className={`lg:hidden bg-calagreen text-white text-lg font-medium rounded-full py-2 px-4 hover:bg-yellow-600 ${isOpen ? 'hidden' : 'block'}`}>
        <Icon icon="iconamoon:menu-burger-horizontal-fill" style={{ color: '#FCF775' }} />
      </button>

      {/* Menú móvil */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute top-6 right-4 bg-white px-8 py-3 rounded-lg shadow-lg lg:hidden max-h-[80vh] overflow-y-auto"
        >
          <button onClick={toggleMenu}>
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
                {/* Menú de Calculadoras en móvil */}
                {key === 'calculadoras' ? (
                  <div>
                    <button 
                      onClick={toggleCalculadoras}
                      className="text-black hover:text-calagreen text-xl font-medium w-full text-left"
                    >
                      {value.label}
                    </button>
                    <AnimatePresence>
                      {calculadorasOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-4 mt-2 space-y-2"
                        >
                          {value.submenu.map((item, index) => (
                            <Link key={index} href={item.path}>
                              <div className="text-gray-700 hover:text-calagreen text-base py-2">
                                {item.label}
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : key.toLowerCase() === 'contacto' ? (
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
                  <a href={typeof value === 'string' ? value : '#'} className="text-black hover:text-calagreen text-xl font-medium">
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
