// helpers/serverProps.ts

import { GetServerSideProps } from "next";
import cookies from "next-cookies";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const allCookies = cookies(context);
  
  // Verifica si la cookie del usuario existe
  const userType = allCookies.userType || null;

  if (!userType || (userType !== 'admin' && userType !== 'supplier' && userType !== 'buyer')) {
    // Redirige a la página 404 si no hay acceso
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: { userType }, // Pasa userType como prop al componente
  };
}
