"use client"

import { Container } from '@mui/material';
import EmpleadosView from '../components/Otros/EmpleadosView';
import Footer from '../components/Footer';

export default function Empleados() {
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
            <EmpleadosView></EmpleadosView>
            <Footer></Footer>
        </div>
    );
}