"use client";

import { Container } from '@mui/material';
import Empleados from '../components/otros/Empleados';
import Footer from '../components/Footer';

export default function EmpresasAsociadas() {
  return (
    <div className="h-auto w-auto bg-gradient-to-r from-green-50 to-green-100 py-10">
      <Container>
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6 mt-20">
          Empresas Asociadas
        </h2>
        <Empleados />
      </Container>
      <Footer></Footer>
    </div>
  );
}


