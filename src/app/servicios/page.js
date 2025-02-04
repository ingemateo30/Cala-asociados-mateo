"use client"

import { Container } from '@mui/material';
import ServiciosView from '../components/Otros/ServiciosView';
import Footer from '../components/Footer';
export default function Servicios() {
  return (
    <div className='h-500 w-auto' style={{ backgroundColor: 'white' }}>
      
      <Container
        sx={{
          pt: 8,
          pb: 2,
          textAlign: { xs: 'center', md: 'left' },
        }}
        
      >
      
      </Container>
    
      <ServiciosView></ServiciosView>
      
     
      <Footer></Footer>
    </div>
  );
}

