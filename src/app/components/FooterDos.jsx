"use client"

import { Icon } from "@iconify/react";
import Link from "next/link";

const ContactInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-black">
      <div>
        <h3 className="text-xl font-bold mb-2">Ubicación</h3>
        <p>Calle 10 # 12 - 184 Centro comercial El Puente Torre empresarial, local 506.</p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Horario</h3>
        <p>LUN-VIE: 08:00am - 12:00m / 2:00pm - 6:00pm</p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Contacto</h3>
        <p>Whatsapp: +57 315 3754395</p>
        <p>Email: contabilidad@calaasociados.com</p>
      </div>
    </div>
  );
};
const FooterDos = () => {

      return (
        <div className="bg-gray-200 text-black">
          <footer className="max-w-7xl mx-auto px-4 py-12" style={{ backgroundColor: '#e5e7eb' }}>
            <ContactInfo />
            <div className="flex justify-center space-x-6 mt-6">
              <Link href="https://www.instagram.com/calaasociados/">
                <span className="sr-only">Instagram</span>
                <Icon icon="skill-icons:instagram" width="24" height="24" />
              </Link>
              <Link href="https://www.facebook.com/CalaAsociados">
                <span className="sr-only">Facebook</span>
                <Icon icon="logos:facebook" width="24" height="24" />
              </Link>
              <Link href="https://wa.me/573153754395">
                <span className="sr-only">WhatsApp</span>
                <Icon icon="ic:baseline-whatsapp" width="32" height="32" style={{ color: 'green' }} />
              </Link>
            </div>
            <p className="text-center text-sm mt-2">© 2025 Cala Asociados. Todos los derechos reservados.</p>
          </footer>
        </div>
      );
    };
export default FooterDos;