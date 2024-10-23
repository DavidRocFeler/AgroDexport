"use client";

import React from "react";
import styles from "../styles/Profile2.module.css";

const ProfileView: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "#C4E2FF",
        paddingTop: "0rem",
        paddingBottom: "0rem",
      }}
    >
      {/* div desplegable y boton user come back */}
      <section className=" max-w-full ">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-around items-start gap-6 py-10">
          {/* Primer div */}
          <div className="bg-white p-6 rounded-lg flex flex-col items-start">
            {/* dropdown */}
            <div className="w-[150px] text-gray-900 dark:text-gray-300 items-center">
              <div className="relative w-full group bg-white flex flex-col items-center">
                <label className="text-lg text-black-400">
                  <h3>My Companies</h3>
                </label>

                <button className="py-2.5 px-3 my-5 w-full md:text-sm text-site bg-gray-300 border border-dimmed focus:border-brand focus:outline-none focus:ring-0 peer flex items-center justify-between rounded">
                  Selected company
                </button>

                <div className="absolute z-[99] top-[100%] left-[50%] translate-x-[-50%] rounded-md overflow-hidden shadow-lg min-w-[200px] w-max peer-focus:visible peer-focus:opacity-100 opacity-0 invisible duration-200 p-1 bg-gray-300 dark:bg-gray-800 border border-dimmed text-xs md:text-sm">
                  <div className="w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
                    Company1
                  </div>
                  <div className="w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
                    Company2
                  </div>
                  <div className="w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
                    Company3
                  </div>
                  <div className="w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
                    Company4
                  </div>
                </div>
              </div>
            </div>
            {/* fin del dropdown */}
            {/* <p className="text-gray-600 mb-4">
              Este es el primer div con fondo gris.
            </p> */}
            <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800">
              ADD COMPANY
            </button>
          </div>
          {/* section imagen */}
          <div className="items-center text-center py-0">
            <img
              className="inline-flex object-cover border-4 border-black rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-black bg-indigo-50 h-48 w-48 !h-44 !w-44 mb-4 md:mb-0 ml-0 md:mr-5"
              src="../image_profile.png"
              alt=""
            />
            <div className="flex flex-col items-center">
              <div className="md:text-justify mb-3 ">
                <div className="flex flex-col mb-5 ">
                  <p className="text-black font-bold text-xl ">John Doe</p>

                  {/*  */}
                </div>

                <button className="bg-black text-white py-2 px-5">Edit</button>
              </div>
            </div>
          </div>
          {/* fin section imagen */}
          {/* Segundo div */}
          <div className="bg-gray-200 p-0 m-0 rounded-lg flex flex-col items-start">
            <button className="bg-black text-white px-6 py-2   rounded-lg hover:bg-gray-800">
              USER COME BACK
            </button>
          </div>
        </div>
      </section>

      {/* fin div desplegable */}

      {/* section 3 */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            {/* div 1 section 3 */}
            <div className="p-4 w-1/2">
              <div className="h-full  p-8 rounded flex flex-col items-center justify-center">
                {/* <div className="h-2/3 bg-gray-100 p-8 my-2 rounded flex items-center justify-center"> */}

                {/* botonera */}
                <div className="w-full md:w-1/2">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="space-y-4">
                      <a
                        href="#"
                        className="block text-center bg-black text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                      >
                        Inforrmation Contact
                      </a>
                      <a
                        href="#"
                        className="block text-center bg-black text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                      >
                        Inforrmation Contact
                      </a>
                      <a
                        href="#"
                        className="block text-center bg-black text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                      >
                        Inforrmation Contact
                      </a>
                      <a
                        href="#"
                        className="block text-center bg-black text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                      >
                        Inforrmation Contact
                      </a>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
            {/* div 2 section 3 */}
            <div className="p-4 w-1/2">
              <div className="h-full bg-gray-100 p-8 rounded flex flex-col items-center justify-center">
                <div className="h-2/3 bg-gray-100 p-8 my-2 rounded flex items-center justify-center">
                  chau
                </div>

                <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800">
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>

            {/*fin div 2 section 3 */}
          </div>
        </div>
      </section>
      {/* fin section 3 */}
    </div>
  );
};

export default ProfileView;
