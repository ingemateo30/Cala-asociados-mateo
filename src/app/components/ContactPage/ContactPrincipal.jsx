import React from "react";
import ContactForm from "./ContactForm";
import ContactMap from "./ContactMap";

const ContactPrincipal = () => {
  return (
    <>
    <div className="flex flex-col lg:flex-row justify-between bg-gray-200">
        <div className="w-full lg:mt-0 mt-2 lg:w-1/2 flex justify-center items-center lg:p-6">
        <ContactMap />
      </div>
      <div className="w-full lg:w-1/2 flex justify-center items-center px-1 lg:p-6">
        <ContactForm />
      </div>
    </div>
  </>
  );
}

export default ContactPrincipal;
