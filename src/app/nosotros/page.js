"use client"

import { Container } from '@mui/material';
import FeaturesLeft from "../components/FeaturesLeft"
import FooterDos from '../components/FooterDos';
import BulletinPreview from '../components/Landing/BulletinPreview';

export default function Nosotros() {
  return (
    <div className="h-500 w-auto bg-gradient-to-r from-green-50 to-green-100 bg-waves">
      <Container
        sx={{
          pt: 6,
          pb: 10,
          textAlign: { xs: "center", md: "left" },
        }}
      ></Container>

      <FeaturesLeft
        title1={"Nuestra Historia"}
        info1={
          "Firma de Contadores Públicos, constituida desde 1990, con el objetivo de ejercer una actividad profesional conjunta y ofrecer a la comunidad servicios calificados en las áreas propias de la Contaduría Pública.  La Firma desde su inicio se ha especializado en los servicios de Revisoría Fiscal, auditorias integrales y Asesorías Contables, Tributarias, Económicas y Financieras, en el sector privado como en el público."
        }
        title2={"Nuestra Filosofía"}
        title3={"MISIÓN"}
        info2={
          "Nuestra filosofía es la de prestar servicios personalizados, acorde a las necesidades del cliente, que den valor agregado al servicio, con criterio de conceptos de calidad para lo cual se dispone de recursos humanos, técnicos y físicos apropiados al trabajo a realizar."
        }
        info3={
          "Somos una firma confiable en la prestación de los servicios de Revisoría Fiscal, Auditorias Integrales, Asesorías Contables, Tributarias, Económicas y Financieras, Contabilidad, Interventoría y Auditoria de proyectos, satisfaciendo las expectativas del cliente con eficiencia, seguridad y alto nivel de calidad. Contamos con un equipo humano responsable, idóneo y comprometido en cubrir las necesidades de nuestros clientes y en el cumplimiento de las normas y regulaciones establecidas."
        }
      />
      <BulletinPreview></BulletinPreview>

      <div className="invisible dark:visible">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 270"
          fill="#d1ded1"
        >
          <path
            fillOpacity="1"
            d="M0,256L40,261.3C80,267,160,277,240,256C320,235,400,181,480,138.7C560,96,640,64,720,64C800,64,880,96,960,122.7C1040,149,1120,171,1200,160C1280,149,1360,107,1400,85.3L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>
      <FooterDos></FooterDos>
    </div>
  );
}
