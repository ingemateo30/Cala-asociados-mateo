"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const CalculadoraNomina = () => {
  // Constantes 2026
  const SALARIO_MINIMO = 1750905;
  const AUXILIO_TRANSPORTE = 249095;
  const UVT_2026 = 52374;

  // Obtener fecha actual
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();
  
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  // Festivos Colombia 2026
  const festivosColombia2026 = [
    { fecha: new Date(2026, 0, 1), nombre: 'Año Nuevo' },
    { fecha: new Date(2026, 0, 12), nombre: 'Epifanía' },
    { fecha: new Date(2026, 2, 23), nombre: 'San José' },
    { fecha: new Date(2026, 3, 9), nombre: 'Jueves Santo' },
    { fecha: new Date(2026, 3, 10), nombre: 'Viernes Santo' },
    { fecha: new Date(2026, 4, 1), nombre: 'Día del Trabajo' },
    { fecha: new Date(2026, 4, 18), nombre: 'Ascensión' },
    { fecha: new Date(2026, 5, 8), nombre: 'Corpus Christi' },
    { fecha: new Date(2026, 5, 15), nombre: 'Sagrado Corazón' },
    { fecha: new Date(2026, 5, 29), nombre: 'San Pedro y San Pablo' },
    { fecha: new Date(2026, 6, 20), nombre: 'Independencia' },
    { fecha: new Date(2026, 7, 7), nombre: 'Batalla de Boyacá' },
    { fecha: new Date(2026, 7, 17), nombre: 'Asunción' },
    { fecha: new Date(2026, 9, 12), nombre: 'Día de la Raza' },
    { fecha: new Date(2026, 10, 2), nombre: 'Todos los Santos' },
    { fecha: new Date(2026, 10, 16), nombre: 'Indep. Cartagena' },
    { fecha: new Date(2026, 11, 8), nombre: 'Inmaculada' },
    { fecha: new Date(2026, 11, 25), nombre: 'Navidad' },
  ];

  // Estados
  const [salarioBasico, setSalarioBasico] = useState(SALARIO_MINIMO);
  const [tipoCalculo, setTipoCalculo] = useState('mensual');
  
  // Nómina mensual
  const [diasTrabajados, setDiasTrabajados] = useState(30);
  const [tieneSubsidioTransporte, setTieneSubsidioTransporte] = useState(true);
  
  // Horas extras y recargos
  const [horasExtrasDiurnas, setHorasExtrasDiurnas] = useState(0);
  const [horasExtrasNocturnas, setHorasExtrasNocturnas] = useState(0);
  const [horasExtrasDiurnasDominicales, setHorasExtrasDiurnasDominicales] = useState(0);
  const [horasExtrasNocturnasDominicales, setHorasExtrasNocturnasDominicales] = useState(0);
  const [horasRecargoNocturno, setHorasRecargoNocturno] = useState(0);
  const [horasDominicalesFestivos, setHorasDominicalesFestivos] = useState(0);
  
  // Otros devengos
  const [comisiones, setComisiones] = useState(0);
  const [bonificaciones, setBonificaciones] = useState(0);
  
  // Deducciones
  const [prestamos, setPrestamos] = useState(0);
  const [embargos, setEmbargos] = useState(0);
  const [otrasRetenciones, setOtrasRetenciones] = useState(0);
  
  // Liquidación - Solo año actual
  const [fechaIngreso, setFechaIngreso] = useState(new Date(currentYear, 0, 1).toISOString().split('T')[0]);
  const [fechaRetiro, setFechaRetiro] = useState(new Date().toISOString().split('T')[0]);

  // Validar días trabajados (máximo 30)
  useEffect(() => {
    if (diasTrabajados > 30) {
      setDiasTrabajados(30);
    }
    if (diasTrabajados < 1) {
      setDiasTrabajados(1);
    }
  }, [diasTrabajados]);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const isFestivo = (date) => {
    return festivosColombia2026.some(festivo => 
      festivo.fecha.getDate() === date.getDate() && 
      festivo.fecha.getMonth() === date.getMonth()
    );
  };

  const getFestivosDelMes = () => {
    const festivos = [];
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayOfWeek = date.getDay();
      
      festivosColombia2026.forEach(festivo => {
        if (festivo.fecha.getDate() === date.getDate() && 
            festivo.fecha.getMonth() === date.getMonth() &&
            dayOfWeek !== 0) {
          festivos.push({
            dia: day,
            nombre: festivo.nombre,
            diaSemana: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][dayOfWeek]
          });
        }
      });
    }
    return festivos;
  };

  const getCalendarioLaboral = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    let diasLaborales = 0, domingos = 0, sabados = 0, festivos = 0;
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayOfWeek = date.getDay();
      
      if (dayOfWeek === 0) domingos++;
      else if (dayOfWeek === 6) sabados++;
      else if (isFestivo(date)) festivos++;
      else diasLaborales++;
    }
    
    return { diasLaborales, domingos, sabados, festivos, totalDias: daysInMonth };
  };

  const calendario = getCalendarioLaboral();
  const festivosDelMes = getFestivosDelMes();

  // Cálculos nómina mensual
  const calcularSalarioDevengado = () => {
    const salarioProporcional = (salarioBasico / 30) * diasTrabajados;
    const valorHora = salarioBasico / 240;
    
    const hed = horasExtrasDiurnas * valorHora * 1.25;
    const hen = horasExtrasNocturnas * valorHora * 1.75;
    const rn = horasRecargoNocturno * valorHora * 0.35;
    const hdf = horasDominicalesFestivos * valorHora * 1.75;
    const hedd = horasExtrasDiurnasDominicales * valorHora * 2.0;
    const hend = horasExtrasNocturnasDominicales * valorHora * 2.5;
    
    return {
      salarioBase: salarioProporcional,
      horasExtras: hed + hen + hedd + hend,
      recargos: rn + hdf,
      total: salarioProporcional + hed + hen + rn + hdf + hedd + hend
    };
  };

  const calcularAuxilioTransporte = () => {
    if (!tieneSubsidioTransporte || salarioBasico > (2 * SALARIO_MINIMO)) return 0;
    return (AUXILIO_TRANSPORTE / 30) * diasTrabajados;
  };

  const calcularPrestacionesSociales = () => {
    const dev = calcularSalarioDevengado();
    const aux = calcularAuxilioTransporte();
    const base = dev.salarioBase + aux;
    
    const prima = base * (diasTrabajados / 30) * 0.0833;
    const cesantias = base * (diasTrabajados / 30) * 0.0833;
    const intereses = cesantias * 0.01;
    const vacaciones = dev.salarioBase * (diasTrabajados / 30) * 0.0417;
    
    return { prima, cesantias, intereses, vacaciones, total: prima + cesantias + intereses + vacaciones };
  };

  const calcularSeguridadSocial = () => {
    const dev = calcularSalarioDevengado();
    const base = dev.total;
    
    const saludEmp = base * 0.04;
    const pensionEmp = base * 0.04;
    const fondoSol = salarioBasico >= (4 * SALARIO_MINIMO) ? base * 0.01 : 0;
    
    const saludEmpr = base * 0.085;
    const pensionEmpr = base * 0.12;
    const arl = base * 0.00522;
    
    return {
      empleado: { salud: saludEmp, pension: pensionEmp, fondoSolidaridad: fondoSol, 
                  get total() { return this.salud + this.pension + this.fondoSolidaridad; } },
      empleador: { salud: saludEmpr, pension: pensionEmpr, arl, 
                   get total() { return this.salud + this.pension + this.arl; } }
    };
  };

  const calcularParafiscales = () => {
    if (salarioBasico >= (10 * SALARIO_MINIMO)) {
      return { sena: 0, icbf: 0, caja: 0, total: 0 };
    }
    const dev = calcularSalarioDevengado();
    const base = dev.total;
    const sena = base * 0.02;
    const icbf = base * 0.03;
    const caja = base * 0.04;
    return { sena, icbf, caja, total: sena + icbf + caja };
  };

  // Liquidación - Solo año actual
  const calcularLiquidacion = () => {
    if (!fechaRetiro || !fechaIngreso) return null;
    
    const inicio = new Date(fechaIngreso);
    const fin = new Date(fechaRetiro);
    
    // Validar que las fechas estén en el año actual
    if (inicio.getFullYear() !== currentYear || fin.getFullYear() !== currentYear) {
      return null;
    }
    
    // Validar que fecha de retiro sea después de ingreso
    if (fin < inicio) return null;
    
    // Calcular días trabajados en el año (usando calendario real, pero para cálculo usamos base 30)
    const diffTime = Math.abs(fin - inicio);
    const diasReales = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    // Para cálculos laborales: convertir a base 30 días por mes
    const mesesCompletos = Math.floor(diasReales / 30);
    const diasRestantes = diasReales % 30;
    const diasLaborales = (mesesCompletos * 30) + Math.min(diasRestantes, 30);
    
    // Base de cálculo (incluye subsidio si aplica)
    const baseCalculo = salarioBasico + (tieneSubsidioTransporte && salarioBasico <= (2 * SALARIO_MINIMO) ? AUXILIO_TRANSPORTE : 0);
    
    // Salario proporcional del último mes
    const diasUltimoMes = Math.min(diasRestantes > 0 ? diasRestantes : 30, 30);
    const salarioUltimo = (salarioBasico / 30) * diasUltimoMes;
    const auxUltimo = (tieneSubsidioTransporte && salarioBasico <= (2 * SALARIO_MINIMO)) 
      ? (AUXILIO_TRANSPORTE / 30) * diasUltimoMes 
      : 0;
    
    // CESANTÍAS: (Base de cálculo × días trabajados) / 360
    const cesantias = (baseCalculo * diasLaborales) / 360;
    
    // INTERESES SOBRE CESANTÍAS: 12% anual proporcional
    // Se calculan sobre las cesantías acumuladas, proporcional al tiempo
    const interesesCesantias = cesantias * 0.12 * (diasLaborales / 360);
    
    // PRIMA DE SERVICIOS - Se paga en dos semestres
    // Primer semestre: Enero 1 - Junio 30
    // Segundo semestre: Julio 1 - Diciembre 31
    
    let primaAnterior = 0;
    let primaActual = 0;
    
    const inicioAño = new Date(currentYear, 0, 1);
    const finPrimerSemestre = new Date(currentYear, 5, 30); // 30 de junio
    const inicioSegundoSemestre = new Date(currentYear, 6, 1); // 1 de julio
    
    // Calcular prima del primer semestre (enero-junio)
    if (inicio <= finPrimerSemestre) {
      const inicioCalculo = inicio > inicioAño ? inicio : inicioAño;
      const finCalculo = fin <= finPrimerSemestre ? fin : finPrimerSemestre;
      
      if (finCalculo >= inicioCalculo) {
        const diffPrimer = Math.abs(finCalculo - inicioCalculo);
        const diasPrimer = Math.ceil(diffPrimer / (1000 * 60 * 60 * 24)) + 1;
        const diasLaboralesPrimer = Math.min(diasPrimer, 180); // Máximo 180 días (6 meses × 30)
        primaAnterior = (baseCalculo * diasLaboralesPrimer) / 360;
      }
    }
    
    // Calcular prima del segundo semestre (julio-diciembre)
    if (fin >= inicioSegundoSemestre) {
      const inicioCalculo = inicio > inicioSegundoSemestre ? inicio : inicioSegundoSemestre;
      const finCalculo = fin;
      
      if (finCalculo >= inicioCalculo) {
        const diffSegundo = Math.abs(finCalculo - inicioCalculo);
        const diasSegundo = Math.ceil(diffSegundo / (1000 * 60 * 60 * 24)) + 1;
        const diasLaboralesSegundo = Math.min(diasSegundo, 180); // Máximo 180 días (6 meses × 30)
        primaActual = (baseCalculo * diasLaboralesSegundo) / 360;
      }
    }
    
    // VACACIONES: 15 días hábiles por cada año (proporcional)
    // Por cada 360 días trabajados, corresponden 15 días de vacaciones
    const diasVacaciones = (diasLaborales / 360) * 15;
    const vacaciones = (salarioBasico / 30) * diasVacaciones;
    
    // Seguridad Social del último mes
    const devengadoUltimo = salarioUltimo + auxUltimo;
    const ss = {
      salud: devengadoUltimo * 0.04,
      pension: devengadoUltimo * 0.04,
      fondo: salarioBasico >= (4 * SALARIO_MINIMO) ? devengadoUltimo * 0.01 : 0
    };
    
    return {
      // Información del periodo
      fechaIngreso: inicio.toLocaleDateString('es-CO'),
      fechaRetiro: fin.toLocaleDateString('es-CO'),
      diasReales,
      diasLaborales,
      mesesCompletos,
      diasRestantes,
      
      // Salario del último mes
      salarioUltimo,
      auxUltimo,
      
      // Prestaciones
      cesantias,
      interesesCesantias,
      primaAnterior, // Prima primer semestre
      primaActual,   // Prima segundo semestre
      vacaciones,
      
      // Seguridad social
      ss,
      
      // Totales
      get totalPrestaciones() {
        return this.cesantias + this.interesesCesantias + this.primaAnterior + this.primaActual + this.vacaciones;
      },
      get totalDevengado() {
        return this.salarioUltimo + this.auxUltimo + this.totalPrestaciones;
      },
      get totalDescuentos() {
        return this.ss.salud + this.ss.pension + this.ss.fondo + prestamos + embargos + otrasRetenciones;
      },
      get neto() {
        return this.totalDevengado - this.totalDescuentos;
      }
    };
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const dev = calcularSalarioDevengado();
  const aux = calcularAuxilioTransporte();
  const prest = calcularPrestacionesSociales();
  const seg = calcularSeguridadSocial();
  const para = calcularParafiscales();
  
  const totalDev = dev.total + aux + comisiones + bonificaciones;
  const totalDed = seg.empleado.total + prestamos + embargos + otrasRetenciones;
  const neto = totalDev - totalDed;
  const costoEmpr = dev.total + aux + prest.total + seg.empleador.total + para.total + comisiones + bonificaciones;

  const liq = tipoCalculo === 'liquidacion' ? calcularLiquidacion() : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <NavBar />
      <div className="h-20"></div>

      {/* Header */}
      <div className="bg-gradient-to-r from-calagreen to-green-600 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white">
            <Icon icon="mdi:calculator-variant" className="mx-auto mb-4" width="64" height="64" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Calculadora Completa de Nómina 2026</h1>
            <p className="text-xl text-green-100 mb-2">
              {monthNames[currentMonth]} {currentYear} - Horas Extras, Recargos y Liquidación
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg">
                <p className="text-sm text-green-100">Salario Mínimo</p>
                <p className="text-2xl font-bold">{formatCurrency(SALARIO_MINIMO)}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg">
                <p className="text-sm text-green-100">Auxilio Transporte</p>
                <p className="text-2xl font-bold">{formatCurrency(AUXILIO_TRANSPORTE)}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg">
                <p className="text-sm text-green-100">Mes Laboral</p>
                <p className="text-2xl font-bold">30 Días Fijos</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>


      {/* Contenido */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        
        {/* Calendario */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Icon icon="mdi:calendar-month" className="mr-2 text-calagreen" width="28" />
            Calendario Laboral - {monthNames[currentMonth]} {currentYear}
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Icon icon="mdi:calendar-check" className="mx-auto mb-2 text-blue-600" width="32" />
              <p className="text-sm text-gray-600">Días Laborales</p>
              <p className="text-3xl font-bold text-blue-600">{calendario.diasLaborales}</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <Icon icon="mdi:calendar" className="mx-auto mb-2 text-red-600" width="32" />
              <p className="text-sm text-gray-600">Domingos</p>
              <p className="text-3xl font-bold text-red-600">{calendario.domingos}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Icon icon="mdi:calendar-weekend" className="mx-auto mb-2 text-purple-600" width="32" />
              <p className="text-sm text-gray-600">Sábados</p>
              <p className="text-3xl font-bold text-purple-600">{calendario.sabados}</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Icon icon="mdi:calendar-star" className="mx-auto mb-2 text-orange-600" width="32" />
              <p className="text-sm text-gray-600">Festivos</p>
              <p className="text-3xl font-bold text-orange-600">{calendario.festivos}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Icon icon="mdi:calendar-today" className="mx-auto mb-2 text-calagreen" width="32" />
              <p className="text-sm text-gray-600">Total Días</p>
              <p className="text-3xl font-bold text-calagreen">{calendario.totalDias}</p>
            </div>
          </div>
          {festivosDelMes.length > 0 && (
            <div className="mt-6 bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
              <h3 className="font-semibold text-orange-800 mb-2 flex items-center">
                <Icon icon="mdi:party-popper" className="mr-2" width="20" />
                Festivos de este mes:
              </h3>
              <div className="grid md:grid-cols-2 gap-2">
                {festivosDelMes.map((f, i) => (
                  <p key={i} className="text-sm text-orange-700">• {f.dia} - {f.nombre} ({f.diaSemana})</p>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Selector tipo */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Icon icon="mdi:format-list-checks" className="mr-2 text-calagreen" width="28" />
            Tipo de Cálculo
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <button onClick={() => setTipoCalculo('mensual')} className={`p-6 rounded-lg border-2 transition-all ${tipoCalculo === 'mensual' ? 'border-calagreen bg-green-50 shadow-lg' : 'border-gray-300 hover:border-gray-400'}`}>
              <Icon icon="mdi:cash-multiple" className={`mx-auto mb-3 ${tipoCalculo === 'mensual' ? 'text-calagreen' : 'text-gray-400'}`} width="40" />
              <p className={`font-bold text-lg mb-2 ${tipoCalculo === 'mensual' ? 'text-calagreen' : 'text-gray-700'}`}>Nómina Mensual</p>
              <p className="text-sm text-gray-600">Con horas extras y recargos</p>
            </button>
            <button onClick={() => setTipoCalculo('liquidacion')} className={`p-6 rounded-lg border-2 transition-all ${tipoCalculo === 'liquidacion' ? 'border-calagreen bg-green-50 shadow-lg' : 'border-gray-300 hover:border-gray-400'}`}>
              <Icon icon="mdi:file-document-check" className={`mx-auto mb-3 ${tipoCalculo === 'liquidacion' ? 'text-calagreen' : 'text-gray-400'}`} width="40" />
              <p className={`font-bold text-lg mb-2 ${tipoCalculo === 'liquidacion' ? 'text-calagreen' : 'text-gray-700'}`}>Liquidación Final</p>
              <p className="text-sm text-gray-600">Cálculo completo al terminar</p>
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Panel Izquierdo */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            
            {/* Datos Básicos */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Icon icon="mdi:account-cash" className="mr-2 text-calagreen" width="24" />
                Datos Básicos
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salario Básico Mensual</label>
                  <input type="number" value={salarioBasico} onChange={(e) => setSalarioBasico(Number(e.target.value))} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-calagreen text-gray-900 font-semibold text-lg bg-white" />
                  <p className="text-xs text-gray-500 mt-1">Mínimo: {formatCurrency(SALARIO_MINIMO)}</p>
                </div>

                {tipoCalculo === 'mensual' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Días Trabajados (Máx 30)</label>
                      <input type="number" min="1" max="30" value={diasTrabajados} onChange={(e) => setDiasTrabajados(Number(e.target.value))} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-calagreen text-gray-900 font-semibold text-lg bg-white" />
                      <p className="text-xs text-blue-600 mt-1 flex items-center">
                        <Icon icon="mdi:information" className="mr-1" width="14" />
                        Mes laboral en Colombia: 30 días fijos
                      </p>
                    </div>

                    <div className="border-2 border-gray-200 rounded-lg p-4">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" checked={tieneSubsidioTransporte} onChange={(e) => setTieneSubsidioTransporte(e.target.checked)} className="w-5 h-5 text-calagreen rounded" />
                        <div className="flex-1">
                          <span className="text-sm font-semibold text-gray-800">Tiene Subsidio de Transporte</span>
                          <p className="text-xs text-gray-600">Solo si salario {"<"} {formatCurrency(2 * SALARIO_MINIMO)}</p>
                        </div>
                        <Icon icon={tieneSubsidioTransporte ? "mdi:bus-multiple" : "mdi:bus-off"} className={tieneSubsidioTransporte ? "text-calagreen" : "text-gray-400"} width="32" />
                      </label>
                      {salarioBasico > (2 * SALARIO_MINIMO) && (
                        <p className="text-xs text-orange-600 mt-2 flex items-center">
                          <Icon icon="mdi:alert" className="mr-1" width="14" />
                          No aplica por salario superior a 2 SMMLV
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded mb-4">
                      <p className="text-sm font-semibold text-purple-800 mb-1">
                        Liquidación del Año {currentYear}
                      </p>
                      <p className="text-xs text-purple-700">
                        Solo se calcula para el año en curso
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Ingreso</label>
                      <input 
                        type="date" 
                        value={fechaIngreso} 
                        onChange={(e) => setFechaIngreso(e.target.value)} 
                        min={`${currentYear}-01-01`}
                        max={fechaRetiro}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-calagreen text-gray-900 font-semibold bg-white" 
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Desde el 1 de enero de {currentYear}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Retiro</label>
                      <input 
                        type="date" 
                        value={fechaRetiro} 
                        onChange={(e) => setFechaRetiro(e.target.value)} 
                        min={fechaIngreso}
                        max={`${currentYear}-12-31`}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-calagreen text-gray-900 font-semibold bg-white" 
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Hasta el 31 de diciembre de {currentYear}
                      </p>
                    </div>
                    
                    <div className="border-2 border-gray-200 rounded-lg p-4">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" checked={tieneSubsidioTransporte} onChange={(e) => setTieneSubsidioTransporte(e.target.checked)} className="w-5 h-5 text-calagreen rounded" />
                        <div className="flex-1">
                          <span className="text-sm font-semibold text-gray-800">Tiene Subsidio de Transporte</span>
                          <p className="text-xs text-gray-600">Solo si salario {"<"} {formatCurrency(2 * SALARIO_MINIMO)}</p>
                        </div>
                        <Icon icon={tieneSubsidioTransporte ? "mdi:bus-multiple" : "mdi:bus-off"} className={tieneSubsidioTransporte ? "text-calagreen" : "text-gray-400"} width="32" />
                      </label>
                      {salarioBasico > (2 * SALARIO_MINIMO) && (
                        <p className="text-xs text-orange-600 mt-2 flex items-center">
                          <Icon icon="mdi:alert" className="mr-1" width="14" />
                          No aplica por salario superior a 2 SMMLV
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {tipoCalculo === 'mensual' && (
              <>
                {/* Horas Extras */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Icon icon="mdi:clock-time-eight" className="mr-2 text-orange-600" width="24" />
                    Horas Extras y Recargos
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">HE Diurnas (+25%)</label>
                      <input type="number" min="0" value={horasExtrasDiurnas} onChange={(e) => setHorasExtrasDiurnas(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold bg-white" />
                      <p className="text-xs text-gray-500 mt-0.5">6:00 AM - 10:00 PM</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">HE Nocturnas (+75%)</label>
                      <input type="number" min="0" value={horasExtrasNocturnas} onChange={(e) => setHorasExtrasNocturnas(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold bg-white" />
                      <p className="text-xs text-gray-500 mt-0.5">10:00 PM - 6:00 AM</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Recargo Nocturno (+35%)</label>
                      <input type="number" min="0" value={horasRecargoNocturno} onChange={(e) => setHorasRecargoNocturno(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold bg-white" />
                      <p className="text-xs text-gray-500 mt-0.5">No es extra, solo recargo</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Horas Dom/Fest (+75%)</label>
                      <input type="number" min="0" value={horasDominicalesFestivos} onChange={(e) => setHorasDominicalesFestivos(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">HE Diurnas Dom/Fest (+100%)</label>
                      <input type="number" min="0" value={horasExtrasDiurnasDominicales} onChange={(e) => setHorasExtrasDiurnasDominicales(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">HE Nocturnas Dom/Fest (+150%)</label>
                      <input type="number" min="0" value={horasExtrasNocturnasDominicales} onChange={(e) => setHorasExtrasNocturnasDominicales(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold bg-white" />
                    </div>
                  </div>
                </div>

                {/* Otros Devengos */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Icon icon="mdi:cash-plus" className="mr-2 text-green-600" width="24" />
                    Otros Devengos
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Comisiones</label>
                      <input type="number" min="0" value={comisiones} onChange={(e) => setComisiones(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bonificaciones</label>
                      <input type="number" min="0" value={bonificaciones} onChange={(e) => setBonificaciones(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold bg-white" />
                    </div>
                  </div>
                </div>

                {/* Deducciones */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Icon icon="mdi:cash-minus" className="mr-2 text-red-600" width="24" />
                    Otras Deducciones
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Préstamos</label>
                      <input type="number" min="0" value={prestamos} onChange={(e) => setPrestamos(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Embargos</label>
                      <input type="number" min="0" value={embargos} onChange={(e) => setEmbargos(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Otras Retenciones</label>
                      <input type="number" min="0" value={otrasRetenciones} onChange={(e) => setOtrasRetenciones(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold bg-white" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>


          {/* Panel Derecho - Resultados */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            
            {tipoCalculo === 'mensual' ? (
              <>
                {/* Resultado Nómina */}
                <div className="bg-gradient-to-br from-calagreen to-green-600 rounded-xl shadow-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <Icon icon="mdi:cash-check" className="mr-2" width="32" />
                    Nómina Mensual
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-sm text-green-100 mb-1">Salario Base ({diasTrabajados} días)</p>
                      <p className="text-3xl font-bold">{formatCurrency(dev.salarioBase)}</p>
                    </div>

                    {dev.horasExtras > 0 && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-sm text-green-100 mb-1">Horas Extras</p>
                        <p className="text-2xl font-bold">+ {formatCurrency(dev.horasExtras)}</p>
                      </div>
                    )}

                    {dev.recargos > 0 && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-sm text-green-100 mb-1">Recargos</p>
                        <p className="text-2xl font-bold">+ {formatCurrency(dev.recargos)}</p>
                      </div>
                    )}

                    {aux > 0 && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-sm text-green-100 mb-1">Subsidio Transporte</p>
                        <p className="text-2xl font-bold">+ {formatCurrency(aux)}</p>
                      </div>
                    )}

                    {(comisiones + bonificaciones) > 0 && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-sm text-green-100 mb-1">Comisiones y Bonificaciones</p>
                        <p className="text-2xl font-bold">+ {formatCurrency(comisiones + bonificaciones)}</p>
                      </div>
                    )}

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-sm text-green-100 mb-1">Total Devengado</p>
                      <p className="text-3xl font-bold">{formatCurrency(totalDev)}</p>
                    </div>

                    <div className="bg-red-500/30 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-sm text-red-100 mb-1">Total Deducciones</p>
                      <p className="text-2xl font-bold">- {formatCurrency(totalDed)}</p>
                    </div>

                    <div className="bg-white rounded-lg p-6 text-calagreen">
                      <p className="text-sm font-medium mb-2">NETO A PAGAR</p>
                      <p className="text-5xl font-bold">{formatCurrency(neto)}</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border-2 border-white/30 mt-4">
                      <p className="text-sm text-green-100 mb-1">Costo Total Empleador</p>
                      <p className="text-3xl font-bold">{formatCurrency(costoEmpr)}</p>
                      <p className="text-xs text-green-200 mt-1">Incluye prestaciones y seguridad social</p>
                    </div>
                  </div>
                </div>

                {/* Desglose */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Icon icon="mdi:file-chart" className="mr-2 text-calagreen" width="24" />
                    Desglose Detallado
                  </h3>
                  
                  {/* Prestaciones */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center text-base">
                      <Icon icon="mdi:gift" className="mr-2 text-blue-600" width="20" />
                      Prestaciones Sociales
                    </h4>
                    <div className="space-y-2 pl-7">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">Prima (8.33%):</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(prest.prima)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">Cesantías (8.33%):</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(prest.cesantias)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">Int. Cesantías (1%):</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(prest.intereses)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">Vacaciones (4.17%):</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(prest.vacaciones)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold border-t-2 pt-2 mt-2">
                        <span className="text-gray-800">Total:</span>
                        <span className="text-calagreen text-base">{formatCurrency(prest.total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Seg Social Empleado */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center text-base">
                      <Icon icon="mdi:shield-account" className="mr-2 text-red-600" width="20" />
                      Seguridad Social - Empleado
                    </h4>
                    <div className="space-y-2 pl-7">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">Salud (4%):</span>
                        <span className="font-semibold text-red-600">- {formatCurrency(seg.empleado.salud)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">Pensión (4%):</span>
                        <span className="font-semibold text-red-600">- {formatCurrency(seg.empleado.pension)}</span>
                      </div>
                      {seg.empleado.fondoSolidaridad > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 font-medium">Fondo Solidaridad (1%):</span>
                          <span className="font-semibold text-red-600">- {formatCurrency(seg.empleado.fondoSolidaridad)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm font-bold border-t-2 pt-2 mt-2">
                        <span className="text-gray-800">Total Descuentos:</span>
                        <span className="text-red-600 text-base">- {formatCurrency(seg.empleado.total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Seg Social Empleador */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center text-base">
                      <Icon icon="mdi:office-building" className="mr-2 text-purple-600" width="20" />
                      Seguridad Social - Empleador
                    </h4>
                    <div className="space-y-2 pl-7">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">Salud (8.5%):</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(seg.empleador.salud)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">Pensión (12%):</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(seg.empleador.pension)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">ARL (0.522%):</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(seg.empleador.arl)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold border-t-2 pt-2 mt-2">
                        <span className="text-gray-800">Total Aportes:</span>
                        <span className="text-purple-600 text-base">{formatCurrency(seg.empleador.total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Parafiscales */}
                  {para.total > 0 ? (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center text-base">
                        <Icon icon="mdi:bank" className="mr-2 text-orange-600" width="20" />
                        Aportes Parafiscales
                      </h4>
                      <div className="space-y-2 pl-7">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 font-medium">SENA (2%):</span>
                          <span className="font-semibold text-gray-900">{formatCurrency(para.sena)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 font-medium">ICBF (3%):</span>
                          <span className="font-semibold text-gray-900">{formatCurrency(para.icbf)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 font-medium">Caja Comp (4%):</span>
                          <span className="font-semibold text-gray-900">{formatCurrency(para.caja)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold border-t-2 pt-2 mt-2">
                          <span className="text-gray-800">Total:</span>
                          <span className="text-orange-600 text-base">{formatCurrency(para.total)}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                      <p className="text-sm text-blue-800 flex items-center font-medium">
                        <Icon icon="mdi:information" className="mr-2" width="20" />
                        No aplican parafiscales (salario ≥ 10 SMMLV)
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              liq && (
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <Icon icon="mdi:file-document-check" className="mr-2" width="32" />
                    Liquidación Año {currentYear}
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Información del periodo */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border-2 border-white/30">
                      <p className="text-sm text-purple-100 mb-2">Período Trabajado</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-purple-200">Fecha Ingreso</p>
                          <p className="text-lg font-bold">{liq.fechaIngreso}</p>
                        </div>
                        <div>
                          <p className="text-xs text-purple-200">Fecha Retiro</p>
                          <p className="text-lg font-bold">{liq.fechaRetiro}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-purple-300/30">
                        <div className="text-center">
                          <p className="text-2xl font-bold">{liq.diasReales}</p>
                          <p className="text-xs text-purple-200">Días reales</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold">{liq.diasLaborales}</p>
                          <p className="text-xs text-purple-200">Días base 30</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold">{liq.mesesCompletos}</p>
                          <p className="text-xs text-purple-200">Meses</p>
                        </div>
                      </div>
                    </div>

                    {/* Salario y subsidio */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-sm text-purple-100 mb-3">Sueldo del Último Mes</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Salario Base:</span>
                          <span className="font-bold">{formatCurrency(liq.salarioUltimo)}</span>
                        </div>
                        {liq.auxUltimo > 0 && (
                          <div className="flex justify-between">
                            <span className="text-sm">Subsidio Transporte:</span>
                            <span className="font-bold">{formatCurrency(liq.auxUltimo)}</span>
                          </div>
                        )}
                        <div className="flex justify-between border-t border-purple-300/30 pt-2">
                          <span className="text-sm font-semibold">Total:</span>
                          <span className="font-bold text-lg">{formatCurrency(liq.salarioUltimo + liq.auxUltimo)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Prestaciones - Formato solicitado */}
                    <div className="bg-white rounded-lg p-6 text-gray-900">
                      <h4 className="font-bold text-purple-700 mb-4 text-lg flex items-center">
                        <Icon icon="mdi:cash-multiple" className="mr-2" width="24" />
                        Prestaciones Sociales
                      </h4>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <div>
                            <p className="font-semibold text-gray-800">Cesantías</p>
                            <p className="text-xs text-gray-500">{liq.diasLaborales} días trabajados</p>
                          </div>
                          <p className="text-xl font-bold text-purple-700">{formatCurrency(liq.cesantias)}</p>
                        </div>

                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <div>
                            <p className="font-semibold text-gray-800">Intereses sobre cesantías</p>
                            <p className="text-xs text-gray-500">12% anual proporcional</p>
                          </div>
                          <p className="text-xl font-bold text-purple-700">{formatCurrency(liq.interesesCesantias)}</p>
                        </div>

                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <div>
                            <p className="font-semibold text-gray-800">Prima primer semestre</p>
                            <p className="text-xs text-gray-500">Enero - Junio</p>
                          </div>
                          <p className="text-xl font-bold text-purple-700">{formatCurrency(liq.primaAnterior)}</p>
                        </div>

                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <div>
                            <p className="font-semibold text-gray-800">Prima segundo semestre</p>
                            <p className="text-xs text-gray-500">Julio - Diciembre</p>
                          </div>
                          <p className="text-xl font-bold text-purple-700">{formatCurrency(liq.primaActual)}</p>
                        </div>

                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <div>
                            <p className="font-semibold text-gray-800">Vacaciones</p>
                            <p className="text-xs text-gray-500">15 días hábiles por año</p>
                          </div>
                          <p className="text-xl font-bold text-purple-700">{formatCurrency(liq.vacaciones)}</p>
                        </div>

                        <div className="flex justify-between items-center py-3 bg-purple-50 -mx-6 px-6 mt-3">
                          <p className="font-bold text-gray-800 text-lg">TOTAL PRESTACIONES</p>
                          <p className="text-2xl font-bold text-purple-700">{formatCurrency(liq.totalPrestaciones)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Deducciones */}
                    <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-4 border-2 border-red-400/30">
                      <p className="text-sm text-red-100 mb-3 font-semibold">Descuentos</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Salud (4%):</span>
                          <span className="font-bold">- {formatCurrency(liq.ss.salud)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pensión (4%):</span>
                          <span className="font-bold">- {formatCurrency(liq.ss.pension)}</span>
                        </div>
                        {liq.ss.fondo > 0 && (
                          <div className="flex justify-between">
                            <span>Fondo Solidaridad (1%):</span>
                            <span className="font-bold">- {formatCurrency(liq.ss.fondo)}</span>
                          </div>
                        )}
                        {(prestamos + embargos + otrasRetenciones) > 0 && (
                          <div className="flex justify-between">
                            <span>Otros descuentos:</span>
                            <span className="font-bold">- {formatCurrency(prestamos + embargos + otrasRetenciones)}</span>
                          </div>
                        )}
                        <div className="flex justify-between border-t border-red-300/50 pt-2 mt-2">
                          <span className="font-semibold">Total Descuentos:</span>
                          <span className="font-bold text-base">- {formatCurrency(liq.totalDescuentos)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Total Final */}
                    <div className="bg-white rounded-lg p-6 text-purple-600 border-4 border-white/30">
                      <p className="text-sm font-medium mb-1 text-gray-600">TOTAL NETO A RECIBIR</p>
                      <p className="text-5xl font-bold mb-4">{formatCurrency(liq.neto)}</p>
                      
                      <div className="border-t-2 border-purple-200 pt-4 mt-4 text-sm space-y-2">
                        <div className="flex justify-between text-purple-600">
                          <span>Sueldo último mes:</span>
                          <span className="font-semibold">{formatCurrency(liq.salarioUltimo + liq.auxUltimo)}</span>
                        </div>
                        <div className="flex justify-between text-purple-600">
                          <span>Prestaciones:</span>
                          <span className="font-semibold">{formatCurrency(liq.totalPrestaciones)}</span>
                        </div>
                        <div className="flex justify-between text-purple-600 font-bold border-t border-purple-200 pt-2">
                          <span>Total Devengado:</span>
                          <span>{formatCurrency(liq.totalDevengado)}</span>
                        </div>
                        <div className="flex justify-between text-red-600">
                          <span>Descuentos:</span>
                          <span className="font-semibold">- {formatCurrency(liq.totalDescuentos)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}

            {/* CTA Contacto */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 text-white">
              <h4 className="text-xl font-bold mb-3">¿Necesitas asesoría personalizada?</h4>
              <p className="text-gray-300 mb-4">
                Expertos en nómina, liquidaciones y todo lo relacionado con obligaciones laborales.
              </p>
              <a href="/contacto" className="block w-full bg-calagreen hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-center">
                Contáctanos Ahora
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CalculadoraNomina;