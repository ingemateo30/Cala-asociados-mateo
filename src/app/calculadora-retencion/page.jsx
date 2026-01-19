"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const CalculadoraRetencionCompleta2026 = () => {
  const UVT_2026 = 52374;

  // Tipos de retención disponibles
  const tiposRetencion = [
    { id: 'salarios', label: 'Salarios (Empleados)', icon: 'mdi:briefcase' },
    { id: 'honorarios', label: 'Honorarios (Profesionales)', icon: 'mdi:account-tie' },
    { id: 'servicios', label: 'Servicios (Independientes)', icon: 'mdi:tools' },
    { id: 'arrendamientos', label: 'Arrendamientos', icon: 'mdi:home-city' },
    { id: 'dividendos', label: 'Dividendos', icon: 'mdi:chart-line' },
    { id: 'compras', label: 'Compras', icon: 'mdi:cart' },
    { id: 'comisiones', label: 'Comisiones', icon: 'mdi:percent' },
    { id: 'rendimientos', label: 'Rendimientos Financieros', icon: 'mdi:bank' },
  ];

  const [tipoSeleccionado, setTipoSeleccionado] = useState('salarios');
  const [esDeclarante, setEsDeclarante] = useState(true);
  const [valorBruto, setValorBruto] = useState('');
  const [resultado, setResultado] = useState(null);

  // Datos específicos para salarios
  const [datosSalario, setDatosSalario] = useState({
    salud: '',
    pension: '',
    pensionVoluntaria: '',
    dependientes: 0,
    interesVivienda: '',
    medicinaPrepagada: ''
  });

  const calcularRetencion = () => {
    const valor = parseFloat(valorBruto);
    if (!valor || valor <= 0) {
      alert('Por favor ingresa un valor válido');
      return;
    }

    let retencion = 0;
    let tasaAplicada = 0;
    let baseMinima = 0;
    let detalles = [];
    let aplicaRetencion = false;

    switch (tipoSeleccionado) {
      case 'salarios':
        const resultadoSalario = calcularRetencionSalario(valor);
        retencion = resultadoSalario.retencion;
        detalles = resultadoSalario.detalles;
        tasaAplicada = resultadoSalario.tasaEfectiva;
        aplicaRetencion = resultadoSalario.aplicaRetencion;
        break;

      case 'honorarios':
        baseMinima = 27 * UVT_2026; // 27 UVT = $1,414,098
        if (valor >= baseMinima) {
          tasaAplicada = esDeclarante ? 10 : 11;
          retencion = valor * (tasaAplicada / 100);
          aplicaRetencion = true;
          detalles = [
            { label: 'Tipo', valor: 'Honorarios profesionales' },
            { label: 'Base mínima', valor: `${(baseMinima).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} (27 UVT)` },
            { label: 'Tarifa', valor: `${tasaAplicada}%` },
            { label: 'Es declarante', valor: esDeclarante ? 'Sí' : 'No' }
          ];
        }
        break;

      case 'servicios':
        baseMinima = 2 * UVT_2026; // 2 UVT = $104,748
        if (valor >= baseMinima) {
          tasaAplicada = esDeclarante ? 4 : 6;
          retencion = valor * (tasaAplicada / 100);
          aplicaRetencion = true;
          detalles = [
            { label: 'Tipo', valor: 'Prestación de servicios' },
            { label: 'Base mínima', valor: `${baseMinima.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} (2 UVT)` },
            { label: 'Tarifa', valor: `${tasaAplicada}%` },
            { label: 'Es declarante', valor: esDeclarante ? 'Sí' : 'No' }
          ];
        }
        break;

      case 'arrendamientos':
        // Arrendamiento de bienes inmuebles - NO tiene base mínima
        tasaAplicada = 3.5;
        retencion = valor * (tasaAplicada / 100);
        aplicaRetencion = true;
        detalles = [
          { label: 'Tipo', valor: 'Arrendamiento de bienes inmuebles' },
          { label: 'Base mínima', valor: 'No aplica' },
          { label: 'Tarifa', valor: `${tasaAplicada}%` },
          { label: 'Nota', valor: 'Aplica desde el primer peso' }
        ];
        break;

      case 'dividendos':
        const resultadoDividendos = calcularRetencionDividendos(valor);
        retencion = resultadoDividendos.retencion;
        detalles = resultadoDividendos.detalles;
        tasaAplicada = resultadoDividendos.tasaEfectiva;
        aplicaRetencion = resultadoDividendos.aplicaRetencion;
        break;

      case 'compras':
        baseMinima = 10 * UVT_2026; // 10 UVT = $523,740
        if (valor >= baseMinima) {
          tasaAplicada = 2.5;
          retencion = valor * (tasaAplicada / 100);
          aplicaRetencion = true;
          detalles = [
            { label: 'Tipo', valor: 'Compras generales' },
            { label: 'Base mínima', valor: `${baseMinima.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} (10 UVT)` },
            { label: 'Tarifa', valor: `${tasaAplicada}%` }
          ];
        }
        break;

      case 'comisiones':
        baseMinima = 10 * UVT_2026; // 10 UVT
        if (valor >= baseMinima) {
          tasaAplicada = 11;
          retencion = valor * (tasaAplicada / 100);
          aplicaRetencion = true;
          detalles = [
            { label: 'Tipo', valor: 'Comisiones' },
            { label: 'Base mínima', valor: `${baseMinima.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} (10 UVT)` },
            { label: 'Tarifa', valor: `${tasaAplicada}%` }
          ];
        }
        break;

      case 'rendimientos':
        tasaAplicada = 7;
        retencion = valor * (tasaAplicada / 100);
        aplicaRetencion = true;
        detalles = [
          { label: 'Tipo', valor: 'Rendimientos financieros' },
          { label: 'Tarifa', valor: `${tasaAplicada}%` },
          { label: 'Nota', valor: 'Intereses, CDTs, bonos, etc.' }
        ];
        break;
    }

    setResultado({
      valorBruto: valor,
      retencion: retencion,
      valorNeto: valor - retencion,
      tasaAplicada: tasaAplicada,
      baseMinima: baseMinima,
      detalles: detalles,
      aplicaRetencion: aplicaRetencion
    });
  };

  const calcularRetencionSalario = (salarioBruto) => {
    // Paso 1: Deducciones obligatorias
    const salud = parseFloat(datosSalario.salud) || (salarioBruto * 0.04);
    const pension = parseFloat(datosSalario.pension) || (salarioBruto * 0.04);
    const pensionVoluntaria = parseFloat(datosSalario.pensionVoluntaria) || 0;

    const deduccionesObligatorias = salud + pension + pensionVoluntaria;

    // Paso 2: Ingreso neto
    const ingresoNeto = salarioBruto - deduccionesObligatorias;

    // Paso 3: Renta exenta 25% (máx 240 UVT mensuales = $12,569,760)
    const maxRentaExenta = 240 * UVT_2026;
    const rentaExenta25 = Math.min(ingresoNeto * 0.25, maxRentaExenta);

    // Paso 4: Deducciones permitidas
    const interesVivienda = parseFloat(datosSalario.interesVivienda) || 0;
    const medicinaPrepagada = Math.min(parseFloat(datosSalario.medicinaPrepagada) || 0, 16 * UVT_2026);
    const deduccionDependientes = Math.min((datosSalario.dependientes * ingresoNeto * 0.10), datosSalario.dependientes * 32 * UVT_2026);

    const totalDeducciones = interesVivienda + medicinaPrepagada + deduccionDependientes;

    // Paso 5: Aplicar límite del 40%
    const limite40 = ingresoNeto * 0.40;
    const limiteUVT = 1340 * UVT_2026; // mensual
    const deduccionesYExentas = rentaExenta25 + totalDeducciones;
    const deduccionPermitida = Math.min(deduccionesYExentas, limite40, limiteUVT);

    // Paso 6: Base gravable
    const baseGravable = Math.max(ingresoNeto - deduccionPermitida, 0);

    // Paso 7: Convertir a UVT
    const baseGravableUVT = baseGravable / UVT_2026;

    // Paso 8: Aplicar tabla progresiva (Art. 383)
    let retencion = 0;
    if (baseGravableUVT < 95) {
      retencion = 0;
    } else if (baseGravableUVT < 150) {
      retencion = (baseGravableUVT - 95) * 0.19 * UVT_2026;
    } else if (baseGravableUVT < 360) {
      retencion = (10.45 + (baseGravableUVT - 150) * 0.28) * UVT_2026;
    } else if (baseGravableUVT < 640) {
      retencion = (69.25 + (baseGravableUVT - 360) * 0.33) * UVT_2026;
    } else if (baseGravableUVT < 945) {
      retencion = (161.65 + (baseGravableUVT - 640) * 0.35) * UVT_2026;
    } else if (baseGravableUVT < 2300) {
      retencion = (268.40 + (baseGravableUVT - 945) * 0.37) * UVT_2026;
    } else {
      retencion = (769.75 + (baseGravableUVT - 2300) * 0.39) * UVT_2026;
    }

    const tasaEfectiva = salarioBruto > 0 ? (retencion / salarioBruto) * 100 : 0;

    const detalles = [
      { label: 'Salario bruto', valor: salarioBruto.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) },
      { label: 'Salud (4%)', valor: salud.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) },
      { label: 'Pensión (4%)', valor: pension.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) },
      { label: 'Pensión voluntaria', valor: pensionVoluntaria.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) },
      { label: 'Ingreso neto', valor: ingresoNeto.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) },
      { label: 'Renta exenta 25%', valor: rentaExenta25.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) },
      { label: 'Interés vivienda', valor: interesVivienda.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) },
      { label: 'Medicina prepagada', valor: medicinaPrepagada.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) },
      { label: `Dependientes (${datosSalario.dependientes})`, valor: deduccionDependientes.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) },
      { label: 'Límite 40% aplicado', valor: deduccionPermitida.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) },
      { label: 'Base gravable', valor: baseGravable.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) },
      { label: 'Base en UVT', valor: baseGravableUVT.toFixed(2) + ' UVT' },
    ];

    return {
      retencion,
      tasaEfectiva,
      aplicaRetencion: baseGravableUVT >= 95,
      detalles
    };
  };

  const calcularRetencionDividendos = (valorDividendo) => {
    // Primer tramo: hasta 300 UVT = exentos
    const primeraExencion = 300 * UVT_2026; // $15,712,200

    let retencion = 0;
    let detalles = [];

    if (valorDividendo <= primeraExencion) {
      detalles = [
        { label: 'Tipo', valor: 'Dividendos exentos' },
        { label: 'Primer tramo (hasta 300 UVT)', valor: `${primeraExencion.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}` },
        { label: 'Tarifa', valor: '0%' },
        { label: 'Estado', valor: 'Completamente exento' }
      ];
      return { retencion: 0, detalles, tasaEfectiva: 0, aplicaRetencion: false };
    }

    // Si excede 300 UVT
    const exceso = valorDividendo - primeraExencion;

    // Segundo tramo: de 300 a 600 UVT = 10%
    const segundoTramo = 300 * UVT_2026;
    if (exceso <= segundoTramo) {
      retencion = exceso * 0.10;
      detalles = [
        { label: 'Tipo', valor: 'Dividendos gravados' },
        { label: 'Tramo exento (0-300 UVT)', valor: `${primeraExencion.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}` },
        { label: 'Tramo gravado (300-600 UVT)', valor: `${exceso.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}` },
        { label: 'Tarifa aplicada', valor: '10%' }
      ];
    } else {
      // Excede 600 UVT: primeros 300 UVT del exceso al 10%, el resto al 20%
      const retencionSegundoTramo = segundoTramo * 0.10;
      const tercerExceso = exceso - segundoTramo;
      const retencionTercerTramo = tercerExceso * 0.20;
      retencion = retencionSegundoTramo + retencionTercerTramo;

      detalles = [
        { label: 'Tipo', valor: 'Dividendos gravados' },
        { label: 'Tramo exento (0-300 UVT)', valor: `${primeraExencion.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}` },
        { label: 'Tramo al 10% (300-600 UVT)', valor: `${segundoTramo.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} → ${retencionSegundoTramo.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}` },
        { label: 'Tramo al 20% (>600 UVT)', valor: `${tercerExceso.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} → ${retencionTercerTramo.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}` }
      ];
    }

    const tasaEfectiva = (retencion / valorDividendo) * 100;
    return { retencion, detalles, tasaEfectiva, aplicaRetencion: true };
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      <NavBar />
      
      <div className="container mx-auto px-4 py-24">
        {/* Header mejorado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="bg-gradient-to-r from-calagreen via-green-600 to-green-700 rounded-3xl shadow-2xl p-12 mb-8">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Icon icon="mdi:calculator-variant" className="text-white" width="48" />
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  Calculadora de Retención en la Fuente
                </h1>
              </div>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
                <span className="text-white font-bold text-xl">2026</span>
              </div>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
                Calcula retención para salarios, honorarios, servicios, arrendamientos, dividendos y más
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:chart-line" className="text-calagreen" width="24" />
                    <div className="text-left">
                      <p className="text-xs text-gray-600 font-medium">UVT 2026</p>
                      <p className="text-lg font-bold text-calagreen">{formatCurrency(UVT_2026)}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:file-document-check" className="text-blue-600" width="24" />
                    <div className="text-left">
                      <p className="text-xs text-gray-600 font-medium">Normativa</p>
                      <p className="text-sm font-bold text-blue-600">Decreto 572/2025</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:folder-multiple" className="text-purple-600" width="24" />
                    <div className="text-left">
                      <p className="text-xs text-gray-600 font-medium">Tipos disponibles</p>
                      <p className="text-lg font-bold text-purple-600">8</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Selector de tipo de retención */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Selecciona el tipo de retención</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {tiposRetencion.map((tipo) => (
              <motion.button
                key={tipo.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setTipoSeleccionado(tipo.id);
                  setResultado(null);
                }}
                className={`p-4 rounded-xl border-2 transition-all ${
                  tipoSeleccionado === tipo.id
                    ? 'border-calagreen bg-green-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <Icon 
                  icon={tipo.icon} 
                  width="32" 
                  className={`mx-auto mb-2 ${tipoSeleccionado === tipo.id ? 'text-calagreen' : 'text-gray-400'}`}
                />
                <p className={`text-sm font-medium ${tipoSeleccionado === tipo.id ? 'text-calagreen' : 'text-gray-700'}`}>
                  {tipo.label}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Panel de entrada */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="bg-gradient-to-r from-calagreen to-green-600 p-4 -mx-8 -mt-8 mb-6 rounded-t-2xl">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <Icon icon="mdi:clipboard-text" width="32" />
                Datos de la Transacción
              </h3>
              <p className="text-white/80 text-sm mt-1">Ingresa la información requerida</p>
            </div>

            {/* Valor bruto */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Icon icon="mdi:currency-usd" className="text-calagreen" width="20" />
                Valor Bruto {tipoSeleccionado === 'salarios' ? '(Salario Mensual)' : ''}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-bold text-lg">$</span>
                <input
                  type="number"
                  value={valorBruto}
                  onChange={(e) => setValorBruto(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 border-2 border-gray-400 rounded-xl focus:border-calagreen focus:ring-2 focus:ring-calagreen/20 focus:outline-none text-lg font-semibold bg-gray-50 text-gray-900 hover:border-gray-500 transition-all"
                  placeholder="Ingresa el valor"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <Icon icon="mdi:information-outline" width="14" />
                Ingresa el valor total de la transacción
              </p>
            </div>

            {/* Campos específicos para cada tipo */}
            {tipoSeleccionado === 'salarios' && (
              <div className="space-y-4 mb-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                  <Icon icon="mdi:file-document-edit" className="text-blue-600" width="24" />
                  Deducciones y Beneficios Tributarios
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Salud (4%)</label>
                    <input
                      type="number"
                      value={datosSalario.salud}
                      onChange={(e) => setDatosSalario({...datosSalario, salud: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-white text-gray-900 font-medium"
                      placeholder="Calculado automático"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Pensión (4%)</label>
                    <input
                      type="number"
                      value={datosSalario.pension}
                      onChange={(e) => setDatosSalario({...datosSalario, pension: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-white text-gray-900 font-medium"
                      placeholder="Calculado automático"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pensión Voluntaria</label>
                  <input
                    type="number"
                    value={datosSalario.pensionVoluntaria}
                    onChange={(e) => setDatosSalario({...datosSalario, pensionVoluntaria: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-white text-gray-900 font-medium"
                    placeholder="Ingresa el valor (opcional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Número de Dependientes</label>
                  <input
                    type="number"
                    value={datosSalario.dependientes}
                    onChange={(e) => setDatosSalario({...datosSalario, dependientes: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-white text-gray-900 font-medium"
                    placeholder="0"
                    min="0"
                  />
                  <p className="text-xs text-gray-600 mt-1">Hijos menores de 18 o estudiantes hasta 25 años</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Intereses Vivienda (máx 100 UVT)</label>
                  <input
                    type="number"
                    value={datosSalario.interesVivienda}
                    onChange={(e) => setDatosSalario({...datosSalario, interesVivienda: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-white text-gray-900 font-medium"
                    placeholder="Ingresa el valor mensual"
                  />
                  <p className="text-xs text-gray-600 mt-1">Máximo: {formatCurrency(100 * UVT_2026)}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Medicina Prepagada (máx 16 UVT)</label>
                  <input
                    type="number"
                    value={datosSalario.medicinaPrepagada}
                    onChange={(e) => setDatosSalario({...datosSalario, medicinaPrepagada: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-white text-gray-900 font-medium"
                    placeholder="Ingresa el valor mensual"
                  />
                  <p className="text-xs text-gray-600 mt-1">Máximo: {formatCurrency(16 * UVT_2026)}</p>
                </div>
              </div>
            )}

            {/* Toggle declarante para tipos que lo requieren */}
            {['honorarios', 'servicios'].includes(tipoSeleccionado) && (
              <div className="mb-6 p-5 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={esDeclarante}
                      onChange={(e) => setEsDeclarante(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 rounded-full peer peer-checked:bg-calagreen transition-all"></div>
                    <div className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-all peer-checked:translate-x-7 shadow-md"></div>
                  </div>
                  <div>
                    <span className="text-base font-bold text-gray-800 block">
                      Soy declarante de renta
                    </span>
                    <span className="text-sm text-gray-600">
                      {esDeclarante 
                        ? `Tarifa aplicable: ${tipoSeleccionado === 'honorarios' ? '10%' : '4%'}` 
                        : `Tarifa aplicable: ${tipoSeleccionado === 'honorarios' ? '11%' : '6%'}`
                      }
                    </span>
                  </div>
                </label>
                <div className="mt-3 pt-3 border-t border-yellow-200">
                  <p className="text-xs text-gray-600 flex items-start gap-2">
                    <Icon icon="mdi:information" className="text-yellow-600 flex-shrink-0 mt-0.5" width="16" />
                    <span>Los declarantes de renta tienen una tarifa de retención más favorable</span>
                  </p>
                </div>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(2, 144, 61, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={calcularRetencion}
              className="w-full bg-gradient-to-r from-calagreen via-green-600 to-green-700 text-white font-bold py-5 px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 text-lg group"
            >
              <Icon icon="mdi:calculator-variant" width="28" className="group-hover:rotate-12 transition-transform" />
              <span>Calcular Retención</span>
              <Icon icon="mdi:arrow-right" width="24" className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
              <Icon icon="mdi:shield-check" width="16" />
              Cálculos actualizados según normativa 2026
            </p>
          </motion.div>

          {/* Panel de resultados */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {resultado && (
              <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 -mx-8 -mt-8 mb-6 rounded-t-2xl">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Icon icon="mdi:chart-box" width="32" />
                  Resultado del Cálculo
                </h3>
                <p className="text-white/80 text-sm mt-1">Desglose detallado de la retención</p>
              </div>

                {resultado.aplicaRetencion ? (
                  <>
                    {/* Resumen principal */}
                    <div className="space-y-4 mb-6">
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Valor Bruto</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(resultado.valorBruto)}</p>
                      </div>

                      <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Retención en la Fuente</p>
                        <p className="text-2xl font-bold text-red-600">{formatCurrency(resultado.retencion)}</p>
                        {resultado.tasaAplicada > 0 && (
                          <p className="text-sm text-gray-500 mt-1">Tasa efectiva: {resultado.tasaAplicada.toFixed(2)}%</p>
                        )}
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border-2 border-calagreen">
                        <p className="text-sm text-gray-600 mb-1">Valor Neto a Recibir</p>
                        <p className="text-3xl font-bold text-calagreen">{formatCurrency(resultado.valorNeto)}</p>
                      </div>
                    </div>

                    {/* Detalles */}
                    {resultado.detalles && resultado.detalles.length > 0 && (
                      <div className="border-t pt-6">
                        <h4 className="font-semibold text-gray-700 mb-4">Detalles del Cálculo</h4>
                        <div className="space-y-2">
                          {resultado.detalles.map((detalle, index) => (
                            <div key={index} className="flex justify-between text-sm py-2 border-b border-gray-100">
                              <span className="text-gray-600">{detalle.label}:</span>
                              <span className="font-medium text-gray-900">{detalle.valor}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Icon icon="mdi:check-circle" className="mx-auto mb-4 text-green-500" width="64" />
                    <h4 className="text-xl font-bold text-gray-800 mb-2">No Aplica Retención</h4>
                    <p className="text-gray-600">
                      El valor ingresado no supera la base mínima para retención.
                    </p>
                    {resultado.baseMinima > 0 && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Base mínima requerida:</p>
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(resultado.baseMinima)}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {!resultado && (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <Icon icon="mdi:information-outline" className="mx-auto mb-4 text-gray-300" width="64" />
                <p className="text-gray-500">Ingresa los datos y presiona "Calcular Retención" para ver el resultado</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 max-w-7xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Información Importante 2026</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <Icon icon="mdi:calendar" className="text-blue-600 mb-2" width="32" />
                <h4 className="font-semibold text-gray-800 mb-2">UVT 2026</h4>
                <p className="text-sm text-gray-600">Unidad de Valor Tributario: {formatCurrency(UVT_2026)}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <Icon icon="mdi:file-document" className="text-green-600 mb-2" width="32" />
                <h4 className="font-semibold text-gray-800 mb-2">Decreto 0572/2025</h4>
                <p className="text-sm text-gray-600">Nuevas bases mínimas vigentes desde junio 2025</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <Icon icon="mdi:account-group" className="text-purple-600 mb-2" width="32" />
                <h4 className="font-semibold text-gray-800 mb-2">¿Necesitas Ayuda?</h4>
                <p className="text-sm text-gray-600">Contáctanos para asesoría tributaria personalizada</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default CalculadoraRetencionCompleta2026;