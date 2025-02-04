import React from "react";

const MapComponent = () => {
  return (
    <div className="mt-16 text-center">
      <h2 className="text-2xl mb-6 text-green-800 font-semibold">CALA Asociados contadores públicos oficina en San Gil, Santander</h2>
      <div className="inline-block w-11/12 h-96">
        <iframe
          title="Mapa de la oficina en Bucaramanga"
          className="w-full h-full"
          frameBorder="0"
          style={{ border: 0 }}
          
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7927.510092962676!2d-73.13435568465485!3d6.552578833806674!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e69c7fd40046891%3A0x169f63d16a26658b!2sCALA%20ASOSCIADOS!5e0!3m2!1ses-419!2sco!4v1709576760864!5m2!1ses-419!2sco"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MapComponent;
