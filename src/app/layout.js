import { primaryFont } from "./theme/typography";
import "./globals.css";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: "Cala Asociados",
  description: "Somos una Firma de Contadores Públicos, constituida desde 1990, con el objetivo de ejercer una actividad profesional conjunta y ofrecer a la comunidad servicios calificados en las áreas propias de la Contaduría Pública.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={primaryFont.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}
      <Analytics/>
      <SpeedInsights/>
      </body>
    </html>
  );
}


