import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <Link href="/">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex justify-center items-center mt-4"
      >
        <motion.img
          src="/cala_completo8.png"
          alt="Logo"
          className="h-12 w-auto lg:h-16 lg:w-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </Link>
  );
};

export default Logo;
