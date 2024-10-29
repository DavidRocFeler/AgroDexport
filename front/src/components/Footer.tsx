// import React from "react";
// import Link from "next/link";
// import styles from "../styles/Footer.module.css";

// const Footer = () => {
//   return (
//     <footer className={styles.Footer}>
//       <Link
//         className="m-[1rem] text-[0.9rem"
//         style={{ color: "#6b6b6b" }}
//         href="/help"
//       >
//         {" "}
//         Help{" "}
//       </Link>
//       <Link
//         className="m-[1rem] text-[0.9rem]"
//         style={{ color: "#6b6b6b" }}
//         href="/about"
//       >
//         {" "}
//         About{" "}
//       </Link>
//       <Link
//         className="m-[1rem] text-[0.9rem]"
//         style={{ color: "#6b6b6b" }}
//         href="/blog"
//       >
//         {" "}
//         Blog{" "}
//       </Link>
//       <Link
//         className="m-[1rem] text-[0.9rem]"
//         style={{ color: "#6b6b6b" }}
//         href="/privacy"
//       >
//         {" "}
//         Privacy{" "}
//       </Link>
//       <Link
//         className="m-[1rem] text-[0.9rem]"
//         style={{ color: "#6b6b6b" }}
//         href="/terms"
//       >
//         {" "}
//         Terms{" "}
//       </Link>
//       <Link
//         className="m-[1rem] text-[0.9rem]"
//         style={{ color: "#6b6b6b" }}
//         href="/support"
//       >
//         {" "}
//         Suport{" "}
//       </Link>
//     </footer>
//   );
// };

// export default Footer;

// -------------------------------------------------------------------------------------------------
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
