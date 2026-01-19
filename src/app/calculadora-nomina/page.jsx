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
  
  // Horas extras y recargos - ACTUALIZADAS 2026
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
  
  // Liquidación - Función helper para manejar fechas locales sin problemas de zona horaria
  const toLocalISOString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const [fechaIngreso, setFechaIngreso] = useState(toLocalISOString(new Date(currentYear, 0, 1)));
  const [fechaRetiro, setFechaRetiro] = useState(toLocalISOString(new Date()));

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

  // CÁLCULOS NÓMINA MENSUAL - ACTUALIZADOS 2026
  const calcularSalarioDevengado = () => {
    const salarioProporcional = (salarioBasico / 30) * diasTrabajados;
    
    // Determinar jornada según fecha (44 horas hasta julio 14, 42 horas después)
    const esSegundoSemestre = currentMonth >= 6 && currentDay >= 15;
    const horasMes = esSegundoSemestre ? 210 : 220; // 42hrs vs 44hrs semanales
    const valorHora = salarioBasico / horasMes;
    
    // PORCENTAJES ACTUALIZADOS SEGÚN REFORMA LABORAL 2026
    // Hora Extra Diurna: 6:00 AM - 7:00 PM (+25%)
    const hed = horasExtrasDiurnas * valorHora * 1.25;
    
    // Hora Extra Nocturna: 7:00 PM - 6:00 AM (+75%)
    const hen = horasExtrasNocturnas * valorHora * 1.75;
    
    // Recargo Nocturno (solo recargo, no extra): 7:00 PM - 6:00 AM (+35%)
    const rn = horasRecargoNocturno * valorHora * 0.35;
    
    // Trabajo Dominical/Festivo Diurno: +80% (hasta junio 30), +90% (desde julio 1)
    const recargoDominical = (currentMonth >= 6 && currentDay >= 1) ? 1.90 : 1.80;
    const hdf = horasDominicalesFestivos * valorHora * (recargoDominical - 1);
    
    // Hora Extra Diurna Dominical/Festivo: +100% (base) + 25% (extra) = 125% total = 2.25
    const hedd = horasExtrasDiurnasDominicales * valorHora * 2.25;
    
    // Hora Extra Nocturna Dominical/Festivo: 
    // Hasta junio: +80% (dom) + 75% (nocturna extra) = 155% = 2.55
    // Desde julio: +90% (dom) + 75% (nocturna extra) = 165% = 2.65
    const recargoNocturnoDom = (currentMonth >= 6 && currentDay >= 1) ? 2.65 : 2.55;
    const hend = horasExtrasNocturnasDominicales * valorHora * recargoNocturnoDom;
    
    return {
      salarioBase: salarioProporcional,
      horasExtras: hed + hen + hedd + hend,
      recargos: rn + hdf,
      valorHora,
      horasMes,
      total: salarioProporcional + hed + hen + rn + hdf + hedd + hend,
      detalle: { hed, hen, rn, hdf, hedd, hend }
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

  // LIQUIDACIÓN FINAL - CORREGIDA Y MEJORADA
  const calcularLiquidacion = () => {
    if (!fechaRetiro || !fechaIngreso) {
      return { error: "Debe ingresar fechas de ingreso y retiro" };
    }
    
    // Crear fechas locales sin problemas de zona horaria
    const [yearIni, monthIni, dayIni] = fechaIngreso.split('-').map(Number);
    const [yearFin, monthFin, dayFin] = fechaRetiro.split('-').map(Number);
    
    const inicio = new Date(yearIni, monthIni - 1, dayIni);
    const fin = new Date(yearFin, monthFin - 1, dayFin);
    
    // Validar fechas
    if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
      return { error: "Fechas inválidas" };
    }
    
    if (fin < inicio) {
      return { error: "La fecha de retiro debe ser posterior a la fecha de ingreso" };
    }
    
    // Calcular días reales trabajados
    const diffTime = fin.getTime() - inicio.getTime();
    const diasReales = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    // Para cálculos laborales en Colombia: base 360 días al año (12 meses × 30 días)
    const diasLaborales = diasReales;
    const mesesCompletos = Math.floor(diasLaborales / 30);
    const diasRestantes = diasLaborales % 30;
    
    // Base de cálculo (salario + subsidio si aplica)
    const tieneSubsidio = tieneSubsidioTransporte && salarioBasico <= (2 * SALARIO_MINIMO);
    const baseCalculo = salarioBasico + (tieneSubsidio ? AUXILIO_TRANSPORTE : 0);
    
    // ========== SALARIO DEL ÚLTIMO MES ==========
    const diasUltimoMes = diasRestantes > 0 ? diasRestantes : 30;
    const salarioUltimo = (salarioBasico / 30) * diasUltimoMes;
    const auxUltimo = tieneSubsidio ? (AUXILIO_TRANSPORTE / 30) * diasUltimoMes : 0;
    
    // ========== CESANTÍAS ==========
    // Fórmula: (Salario base + Auxilio transporte) × Días trabajados / 360
    const cesantias = (baseCalculo * diasLaborales) / 360;
    
    // ========== INTERESES SOBRE CESANTÍAS ==========
    // 12% anual sobre las cesantías, proporcional a los días trabajados
    const interesesCesantias = (cesantias * 0.12 * diasLaborales) / 360;
    
    // ========== PRIMA DE SERVICIOS ==========
    // Se paga en dos semestres: enero-junio y julio-diciembre
    let primaAnterior = 0;
    let primaActual = 0;
    
    const inicioAño = new Date(inicio.getFullYear(), 0, 1);
    const finPrimerSemestre = new Date(inicio.getFullYear(), 5, 30); // 30 de junio
    const inicioSegundoSemestre = new Date(inicio.getFullYear(), 6, 1); // 1 de julio
    const finAño = new Date(inicio.getFullYear(), 11, 31);
    
    // Primer semestre (enero-junio)
    if (inicio <= finPrimerSemestre && fin >= inicioAño) {
      const inicioPrima = inicio > inicioAño ? inicio : inicioAño;
      const finPrima = fin < finPrimerSemestre ? fin : finPrimerSemestre;
      
      if (finPrima >= inicioPrima) {
        const diffPrima = finPrima.getTime() - inicioPrima.getTime();
        const diasPrima = Math.floor(diffPrima / (1000 * 60 * 60 * 24)) + 1;
        primaAnterior = (baseCalculo * diasPrima) / 360;
      }
    }
    
    // Segundo semestre (julio-diciembre)
    if (fin >= inicioSegundoSemestre) {
      const inicioPrima = inicio > inicioSegundoSemestre ? inicio : inicioSegundoSemestre;
      const finPrima = fin < finAño ? fin : finAño;
      
      if (finPrima >= inicioPrima) {
        const diffPrima = finPrima.getTime() - inicioPrima.getTime();
        const diasPrima = Math.floor(diffPrima / (1000 * 60 * 60 * 24)) + 1;
        primaActual = (baseCalculo * diasPrima) / 360;
      }
    }
    
    // ========== VACACIONES ==========
    // 15 días hábiles por cada año trabajado (proporcional)
    // Solo se calcula sobre el salario base (sin auxilio de transporte)
    const diasVacaciones = (diasLaborales / 360) * 15;
    const vacaciones = (salarioBasico / 30) * diasVacaciones;
    
    // ========== SEGURIDAD SOCIAL DEL ÚLTIMO MES ==========
    // IMPORTANTE: La seguridad social se calcula sobre el IBC (Ingreso Base de Cotización)
    // que es el SALARIO MENSUAL COMPLETO, no sobre el proporcional
    // Solo se descuenta proporcionalmente si el trabajador no laboró el mes completo
    
    // Si trabajó menos de 30 días en el último mes, se calcula proporcionalmente
    const ibc = salarioBasico; // IBC siempre es el salario completo
    const factorProporcional = diasUltimoMes / 30; // Factor para proporcionar
    
    const ss = {
      salud: ibc * 0.04 * factorProporcional,
      pension: ibc * 0.04 * factorProporcional,
      fondo: salarioBasico >= (4 * SALARIO_MINIMO) ? ibc * 0.01 * factorProporcional : 0
    };
    
    // ========== TOTALES ==========
    const totalPrestaciones = cesantias + interesesCesantias + primaAnterior + primaActual + vacaciones;
    const totalDevengado = salarioUltimo + auxUltimo + totalPrestaciones;
    const totalDescuentos = ss.salud + ss.pension + ss.fondo + prestamos + embargos + otrasRetenciones;
    const neto = totalDevengado - totalDescuentos;
    
    return {
      // Información del periodo
      fechaIngreso: inicio.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }),
      fechaRetiro: fin.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }),
      diasReales,
      diasLaborales,
      mesesCompletos,
      diasRestantes,
      
      // Salario del último mes
      salarioUltimo,
      auxUltimo,
      diasUltimoMes,
      
      // Prestaciones
      cesantias,
      interesesCesantias,
      primaAnterior,
      primaActual,
      vacaciones,
      diasVacaciones,
      
      // Seguridad social
      ss,
      
      // Totales
      totalPrestaciones,
      totalDevengado,
      totalDescuentos,
      neto,
      
      // Sin errores
      error: null
    };
  };

  const formatCurrency = (value) => {
    if (value === null || value === undefined || isNaN(value)) return '$0';
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
              {monthNames[currentMonth]} {currentYear} - Actualizada con Reforma Laboral
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
                <p className="text-sm text-green-100">Jornada Laboral</p>
                <p className="text-2xl font-bold">{dev.horasMes} hrs/mes</p>
                <p className="text-xs text-green-200">{dev.horasMes === 220 ? '44 hrs/sem hasta jul 14' : '42 hrs/sem desde jul 15'}</p>
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
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-4">
                      <p className="text-sm font-semibold text-blue-800 mb-1 flex items-center">
                        <Icon icon="mdi:information" className="mr-2" width="18" />
                        Liquidación de Contrato Laboral
                      </p>
                      <p className="text-xs text-blue-700">
                        Calcula todas las prestaciones sociales y valores a liquidar al finalizar el contrato
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Ingreso</label>
                      <input 
                        type="date" 
                        value={fechaIngreso} 
                        onChange={(e) => setFechaIngreso(e.target.value)} 
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-calagreen text-gray-900 font-semibold bg-white" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Retiro</label>
                      <input 
                        type="date" 
                        value={fechaRetiro} 
                        onChange={(e) => setFechaRetiro(e.target.value)} 
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-calagreen text-gray-900 font-semibold bg-white" 
                      />
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

                    {/* Deducciones adicionales para liquidación */}
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-800 mb-3 text-sm flex items-center">
                        <Icon icon="mdi:cash-minus" className="mr-2" width="18" />
                        Deducciones Adicionales (opcional)
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Préstamos</label>
                          <input type="number" min="0" value={prestamos} onChange={(e) => setPrestamos(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 bg-white" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Embargos</label>
                          <input type="number" min="0" value={embargos} onChange={(e) => setEmbargos(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 bg-white" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Otras Retenciones</label>
                          <input type="number" min="0" value={otrasRetenciones} onChange={(e) => setOtrasRetenciones(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 bg-white" />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {tipoCalculo === 'mensual' && (
              <>
                {/* Horas Extras - ACTUALIZADO CON REFORMA LABORAL */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Icon icon="mdi:clock-time-eight" className="mr-2 text-orange-600" width="24" />
                    Horas Extras y Recargos 2026
                  </h3>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4 rounded">
                    <p className="text-xs text-blue-800 font-semibold mb-1">
                      Valor hora ordinaria: {formatCurrency(dev.valorHora)}
                    </p>
                    <p className="text-xs text-blue-700">
                      Jornada: {dev.horasMes} horas/mes ({dev.horasMes === 220 ? '44 hrs/semana' : '42 hrs/semana'})
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        HE Diurnas (+25%)
                        <span className="text-xs text-gray-500 ml-2">6:00 AM - 7:00 PM</span>
                      </label>
                      <input type="number" min="0" value={horasExtrasDiurnas} onChange={(e) => setHorasExtrasDiurnas(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold bg-white" />
                      {horasExtrasDiurnas > 0 && <p className="text-xs text-green-600 mt-1">Valor: {formatCurrency(dev.detalle.hed)}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        HE Nocturnas (+75%)
                        <span className="text-xs text-gray-500 ml-2">7:00 PM - 6:00 AM</span>
                      </label>
                      <input type="number" min="0" value={horasExtrasNocturnas} onChange={(e) => setHorasExtrasNocturnas(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold bg-white" />
                      {horasExtrasNocturnas > 0 && <p className="text-xs text-green-600 mt-1">Valor: {formatCurrency(dev.detalle.hen)}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Recargo Nocturno (+35%)
                        <span className="text-xs text-gray-500 ml-2">No es extra, solo recargo</span>
                      </label>
                      <input type="number" min="0" value={horasRecargoNocturno} onChange={(e) => setHorasRecargoNocturno(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold bg-white" />
                      {horasRecargoNocturno > 0 && <p className="text-xs text-green-600 mt-1">Valor: {formatCurrency(dev.detalle.rn)}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Horas Dom/Fest (+{currentMonth >= 6 && currentDay >= 1 ? '90' : '80'}%)
                        <span className="text-xs text-gray-500 ml-2">Recargo dominical/festivo</span>
                      </label>
                      <input type="number" min="0" value={horasDominicalesFestivos} onChange={(e) => setHorasDominicalesFestivos(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold bg-white" />
                      {horasDominicalesFestivos > 0 && <p className="text-xs text-green-600 mt-1">Valor: {formatCurrency(dev.detalle.hdf)}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        HE Diurnas Dom/Fest (+125%)
                        <span className="text-xs text-gray-500 ml-2">Extra + dominical</span>
                      </label>
                      <input type="number" min="0" value={horasExtrasDiurnasDominicales} onChange={(e) => setHorasExtrasDiurnasDominicales(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold bg-white" />
                      {horasExtrasDiurnasDominicales > 0 && <p className="text-xs text-green-600 mt-1">Valor: {formatCurrency(dev.detalle.hedd)}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        HE Nocturnas Dom/Fest (+{currentMonth >= 6 && currentDay >= 1 ? '165' : '155'}%)
                        <span className="text-xs text-gray-500 ml-2">Nocturna + dominical</span>
                      </label>
                      <input type="number" min="0" value={horasExtrasNocturnasDominicales} onChange={(e) => setHorasExtrasNocturnasDominicales(Number(e.target.value))} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold bg-white" />
                      {horasExtrasNocturnasDominicales > 0 && <p className="text-xs text-green-600 mt-1">Valor: {formatCurrency(dev.detalle.hend)}</p>}
                    </div>
                  </div>
                  <div className="mt-4 bg-orange-50 border-l-4 border-orange-500 p-3 rounded">
                    <p className="text-xs text-orange-800 font-semibold">
                      <Icon icon="mdi:alert-circle" className="inline mr-1" width="14" />
                      Límites legales: máx 2 horas extra/día y 12 horas extra/semana
                    </p>
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
              // LIQUIDACIÓN FINAL - PANEL DERECHO
              liq && !liq.error ? (
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <Icon icon="mdi:file-document-check" className="mr-2" width="32" />
                    Liquidación Final de Contrato
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Información del periodo */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border-2 border-white/30">
                      <p className="text-sm text-purple-100 mb-3 font-semibold">Período Trabajado</p>
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <p className="text-xs text-purple-200">Fecha Ingreso</p>
                          <p className="text-base font-bold">{liq.fechaIngreso}</p>
                        </div>
                        <div>
                          <p className="text-xs text-purple-200">Fecha Retiro</p>
                          <p className="text-base font-bold">{liq.fechaRetiro}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-purple-300/30">
                        <div className="text-center">
                          <p className="text-3xl font-bold">{liq.diasReales}</p>
                          <p className="text-xs text-purple-200">Días calendario</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-bold">{liq.mesesCompletos}</p>
                          <p className="text-xs text-purple-200">Meses completos</p>
                        </div>
                      </div>
                    </div>

                    {/* Salario último mes */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-sm text-purple-100 mb-3 font-semibold">Salario Último Período</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Salario ({liq.diasUltimoMes} días):</span>
                          <span className="font-bold">{formatCurrency(liq.salarioUltimo)}</span>
                        </div>
                        {liq.auxUltimo > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Subsidio Transporte:</span>
                            <span className="font-bold">{formatCurrency(liq.auxUltimo)}</span>
                          </div>
                        )}
                        <div className="flex justify-between border-t border-purple-300/30 pt-2 font-semibold">
                          <span>Subtotal:</span>
                          <span className="text-lg">{formatCurrency(liq.salarioUltimo + liq.auxUltimo)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Prestaciones Sociales */}
                    <div className="bg-white rounded-lg p-5 text-gray-900">
                      <h4 className="font-bold text-purple-700 mb-4 text-lg flex items-center">
                        <Icon icon="mdi:cash-multiple" className="mr-2" width="24" />
                        Prestaciones Sociales
                      </h4>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <div>
                            <p className="font-semibold text-gray-800">Cesantías</p>
                            <p className="text-xs text-gray-500">{liq.diasLaborales} días base 360</p>
                          </div>
                          <p className="text-xl font-bold text-purple-700">{formatCurrency(liq.cesantias)}</p>
                        </div>

                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <div>
                            <p className="font-semibold text-gray-800">Intereses Cesantías</p>
                            <p className="text-xs text-gray-500">12% anual proporcional</p>
                          </div>
                          <p className="text-xl font-bold text-purple-700">{formatCurrency(liq.interesesCesantias)}</p>
                        </div>

                        {liq.primaAnterior > 0 && (
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <div>
                              <p className="font-semibold text-gray-800">Prima 1er Semestre</p>
                              <p className="text-xs text-gray-500">Enero - Junio</p>
                            </div>
                            <p className="text-xl font-bold text-purple-700">{formatCurrency(liq.primaAnterior)}</p>
                          </div>
                        )}

                        {liq.primaActual > 0 && (
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <div>
                              <p className="font-semibold text-gray-800">Prima 2do Semestre</p>
                              <p className="text-xs text-gray-500">Julio - Diciembre</p>
                            </div>
                            <p className="text-xl font-bold text-purple-700">{formatCurrency(liq.primaActual)}</p>
                          </div>
                        )}

                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <div>
                            <p className="font-semibold text-gray-800">Vacaciones</p>
                            <p className="text-xs text-gray-500">{liq.diasVacaciones.toFixed(2)} días proporcionales</p>
                          </div>
                          <p className="text-xl font-bold text-purple-700">{formatCurrency(liq.vacaciones)}</p>
                        </div>

                        <div className="flex justify-between items-center py-3 bg-purple-50 -mx-5 px-5 mt-3">
                          <p className="font-bold text-gray-800 text-lg">TOTAL PRESTACIONES</p>
                          <p className="text-2xl font-bold text-purple-700">{formatCurrency(liq.totalPrestaciones)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Deducciones */}
                    {liq.totalDescuentos > 0 && (
                      <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-4 border-2 border-red-400/30">
                        <p className="text-sm text-red-100 mb-3 font-semibold flex items-center">
                          <Icon icon="mdi:cash-remove" className="mr-2" width="18" />
                          Descuentos y Deducciones
                        </p>
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
                          {prestamos > 0 && (
                            <div className="flex justify-between">
                              <span>Préstamos:</span>
                              <span className="font-bold">- {formatCurrency(prestamos)}</span>
                            </div>
                          )}
                          {embargos > 0 && (
                            <div className="flex justify-between">
                              <span>Embargos:</span>
                              <span className="font-bold">- {formatCurrency(embargos)}</span>
                            </div>
                          )}
                          {otrasRetenciones > 0 && (
                            <div className="flex justify-between">
                              <span>Otras Retenciones:</span>
                              <span className="font-bold">- {formatCurrency(otrasRetenciones)}</span>
                            </div>
                          )}
                          <div className="flex justify-between border-t border-red-300/50 pt-2 mt-2 font-semibold">
                            <span>Total Descuentos:</span>
                            <span className="text-base">- {formatCurrency(liq.totalDescuentos)}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Total Final */}
                    <div className="bg-white rounded-lg p-6 text-purple-600 border-4 border-white/30">
                      <p className="text-sm font-medium mb-1 text-gray-600">TOTAL NETO A RECIBIR</p>
                      <p className="text-5xl font-bold mb-4">{formatCurrency(liq.neto)}</p>
                      
                      <div className="border-t-2 border-purple-200 pt-4 mt-4 text-sm space-y-2">
                        <div className="flex justify-between text-purple-600">
                          <span>Salario último período:</span>
                          <span className="font-semibold">{formatCurrency(liq.salarioUltimo + liq.auxUltimo)}</span>
                        </div>
                        <div className="flex justify-between text-purple-600">
                          <span>Prestaciones sociales:</span>
                          <span className="font-semibold">{formatCurrency(liq.totalPrestaciones)}</span>
                        </div>
                        <div className="flex justify-between text-purple-600 font-bold border-t border-purple-200 pt-2">
                          <span>Total Devengado:</span>
                          <span>{formatCurrency(liq.totalDevengado)}</span>
                        </div>
                        {liq.totalDescuentos > 0 && (
                          <div className="flex justify-between text-red-600">
                            <span>Total Descuentos:</span>
                            <span className="font-semibold">- {formatCurrency(liq.totalDescuentos)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : liq && liq.error ? (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="text-center">
                    <Icon icon="mdi:alert-circle" className="mx-auto mb-4 text-red-500" width="64" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Error en el Cálculo</h3>
                    <p className="text-red-600 mb-4">{liq.error}</p>
                    <p className="text-sm text-gray-600">
                      Por favor verifica las fechas ingresadas y asegúrate de que:
                    </p>
                    <ul className="text-sm text-gray-600 text-left mt-3 space-y-1 max-w-md mx-auto">
                      <li>• La fecha de retiro sea posterior a la de ingreso</li>
                      <li>• Las fechas sean válidas</li>
                      <li>• Hayas ingresado ambas fechas</li>
                    </ul>
                  </div>
                </div>
              ) : null
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