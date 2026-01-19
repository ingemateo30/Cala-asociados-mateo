export const paths = {
    principal: {
        root: '/',
    },
    navbar: {
     inicio: '/',
      nosotros: `/nosotros`,
      servicios: '/servicios',
      calculadoras: {
        label: 'Calculadoras',
        submenu: [
          { label: 'Calculadora de Nómina', path: '/calculadora-nomina' },
          { label: 'Retención en la Fuente', path: '/calculadora-retencion' }
        ]
      },
      noticias: '/noticias',
      'nuestros clientes': '/Empresas',
      contacto: '/contacto',
    },
  };
  