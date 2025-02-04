"use client"

import { Icon } from "@iconify/react";
import Link from "next/link";
const Footer = () => {

    return (

<div className="bg-white">
<footer class="flex flex-col items-center justify-between px-4 py-12 mx-auto max-w-7xl md:flex-row">
  <p class="mb-8 text-sm text-center text-gray-700 md:text-left md:mb-0">© 2025 Cala Asociados. Todos los derechos resevados.</p>
  <div class="flex items-center space-x-6">

  <Link href="https://www.instagram.com/calaasociados/">
      <span class="sr-only">Instagram</span>
      <Icon icon="skill-icons:instagram" width="24" height="24" />
      </Link>
    <Link href="https://www.facebook.com/CalaAsociados">
      <span class="sr-only">Facebook</span>
      <Icon icon="logos:facebook" width="24" height="24" />
    </Link>

  <Link href="https://www.instagram.com/calaasociados/">
      <span class="sr-only">Twitter</span>
      <Icon icon="ic:baseline-whatsapp" width="32" height="32"  style={{color: 'green'}} />
      </Link>
    {/* <Link href="#">
      <span class="sr-only">LinkedIn</span>
      <Icon icon="skill-icons:linkedin" width="24" height="24" />
      </Link> */}
    
  </div>
</footer>
</div>

    );

}

export default Footer;