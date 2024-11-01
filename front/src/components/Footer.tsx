import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 mt-auto bg-[#d8fba7]">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-[1rem] text-[#6b6b6b]">
            © {currentYear} Agro Dexport. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
