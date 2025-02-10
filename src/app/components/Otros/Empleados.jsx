import React from 'react';

const Empleados = () => {
    const empresasAsociadas = [
        { id: 1, nombre: 'Lesmez y Valdes SAS', imagen: './images/1.png' },
        { id: 2, nombre: '.', imagen: './images/2.png' },
        { id: 3, nombre: '.', imagen: './images/3.png' },
        { id: 4, nombre: '.', imagen: './images/4.png' },
        { id: 5, nombre: '.', imagen: './images/5.png' },
        { id: 6, nombre: '.', imagen: './images/6.png' },
        { id: 7, nombre: '.', imagen: './images/7.png' },
        { id: 8, nombre: '.', imagen: './images/8.png' },
        { id: 9, nombre: '.', imagen: './images/9.png' },
        { id: 10, nombre: '.', imagen: './images/10.png' },
        { id: 11, nombre: '.', imagen: './images/11.png' },
        { id: 12, nombre: '.', imagen: './images/12.png' },
        { id: 13, nombre: '.', imagen: './images/13.png' },
        { id: 14, nombre: '.', imagen: './images/14.png' },
        { id: 15, nombre: '.', imagen: './images/17.png' },
        { id: 16, nombre: '.', imagen: './images/16.png' },
    ];

    return (
        <div className="p-8 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 place-items-center">
                {empresasAsociadas.map((empresa) => (
                    <div key={empresa.id} className="flex items-center justify-center w-64 h-64 bg-gray-50 p-4 rounded-xl shadow-md">
                        <img
                            src={empresa.imagen}
                            alt={empresa.nombre}
                            className="object-contain max-h-full max-w-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Empleados;

