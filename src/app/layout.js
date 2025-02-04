import { primaryFont } from "./theme/typography";
import "./globals.css";
import Footer from "./components/Footer";

export const metadata = {
  title: "Cala Asociados",
  description: "Somos una Firma de Contadores Públicos, constituida desde 1990, con el objetivo de ejercer una actividad profesional conjunta y ofrecer a la comunidad servicios calificados en las áreas propias de la Contaduría Pública.",
};

export default function RootLayout({ children }) {
  return (
     <html lang="es" className={primaryFont.className}>

      <body>{children}</body>
    </html>
  );
}
