import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EmpleadosView = () => {
    const empleados = [
        { 
                id: 1, 
                image: '/empleados/e1.jpg', 
                name: 'Juan Pérez', 
                position: 'Gerente General', 
                functions: [
                        'Supervisar todas las operaciones de la empresa.',
                        'Tomar decisiones estratégicas.',
                        'Representar a la empresa ante terceros.'
                ]
        },
        { 
                id: 2, 
                image: '/empleados/e2.jpg', 
                name: 'María López', 
                position: 'Directora Financiera', 
                functions: [
                        'Gestionar las finanzas de la empresa.',
                        'Elaborar presupuestos y previsiones.',
                        'Supervisar el departamento de contabilidad.'
                ]
        },
        { 
                id: 3, 
                image: '/empleados/e3.jpg', 
                name: 'Carlos García', 
                position: 'Jefe de Recursos Humanos', 
                functions: [
                        'Gestionar el personal de la empresa.',
                        'Desarrollar políticas de recursos humanos.',
                        'Supervisar el proceso de contratación.'
                ]
        },
        // Agrega más empleados según sea necesario
    ];

    const [hoveredId, setHoveredId] = useState(null);

    const handleMouseEnter = (id) => {
        setHoveredId(id);
    };

    const handleMouseLeave = () => {
        setHoveredId(null);
    };

    return (
        <section className="px-4 py-8 md:py-24 mx-auto max-w-7xl bg-white">
            <div className="grid grid-cols-1 gap-y-8 md:gap-y-16">
                {empleados.map((empleado, index) => (
                    <motion.div
                        key={empleado.id}
                        className={`rounded-lg overflow-hidden shadow-lg bg-white md:flex ${
                            index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                        }`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        onMouseEnter={() => handleMouseEnter(empleado.id)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="md:w-1/2 relative overflow-hidden">
                            <img
                                src={empleado.image}
                                alt={empleado.name}
                                className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                            />
                        </div>
                        <div className="p-6 md:w-1/2">
                            <h2 className="text-3xl font-semibold text-gray-800 mb-2">{empleado.name}</h2>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">{empleado.position}</h3>
                            <ul className="text-gray-600 mb-4 list-disc pl-5">
                                {empleado.functions.map((func, i) => (
                                    <li key={i}>{func}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default EmpleadosView;

