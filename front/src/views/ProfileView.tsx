// "use client";
// import Link from "next/link";
// import React from "react";
// import styles from "../styles/Profile2.module.css";
// // import SupplyChainComponent from "@/components/SupplyChainComponent";
// // import { supplyChainArray } from "@/helpers/supplyChain.helpers";
// // import { ISupplyChainProps } from "@/interface/types";
// // import { useUserStore } from "@/store/useUserStore";

// const ProfileView2: React.FC = () => {
//   //const supplyChain: ISupplyChainProps[] = supplyChainArray;
//   // const userType = useUserStore((state) => state.userType);

//   return (
//     <section>
//       <div
//         style={{
//           backgroundColor: "#C4E2FF",
//           paddingTop: "0rem",
//           paddingBottom: "0rem",
//         }}
//       >
//         <div className="h-1/4 dark:bg-slate-800 gap-6 flex  justify-center">
//           <div className=" bg-#C4E2FF dark:bg-gray-700 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl  transition-all duration-500 transform">
//             <div className="flex items-center gap-5">
//               <img
//                 src="../image_profile.png"
//                 className="w-20 group-hover:w-24 group-hover:h-24 h-20 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
//               />
//               <div className="w-fit transition-all transform duration-500">
//                 <h1
//                   className={`${styles.textname} text-gray-600 dark:text-gray-200 font-bold`}
//                 >
//                   John Doe
//                 </h1>

//                 <p
//                   className={`${styles.textname} text-gray-400 dark:text-gray-400 font-semibold`}
//                 >
//                   Producer
//                 </p>
//               </div>
//             </div>

//             {/* -------- */}
//           </div>
//         </div>
//         <aside className="flex flex-row justify-center mb-[0.5rem] ">
//           <button className={styles.ButtonEdit}> Edit </button>
//         </aside>
//       </div>
//     </section>
//   );
// };

// export default ProfileView2;

// -------------
"use client";
// import Link from "next/link";
import React from "react";
import styles from "../styles/Profile2.module.css";
// // import SupplyChainComponent from "@/components/SupplyChainComponent";
// // import { supplyChainArray } from "@/helpers/supplyChain.helpers";
// // import { ISupplyChainProps } from "@/interface/types";
// // import { useUserStore } from "@/store/useUserStore";

const ProfileView: React.FC = () => {
  //   //const supplyChain: ISupplyChainProps[] = supplyChainArray;
  //   // const userType = useUserStore((state) => state.userType);

  return (
    <div
      style={{
        backgroundColor: "#C4E2FF",
        paddingTop: "0rem",
        paddingBottom: "0rem",
      }}
    >
      {/* div imagen */}
      <section className="mt-0 p-4">
        <div className="w-full md:w-1/2 md:mx-auto flex flex-col md:flex-row items-center justify-center text-center">
          <img
            className="inline-flex object-cover border-4 border-black rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-black bg-indigo-50 h-24 w-24 !h-32 !w-32 mb-4 md:mb-0 ml-0 md:mr-5"
            src="../image_profile.png"
            alt=""
          />
          <div className="flex flex-col">
            <div className="md:text-justify mb-3">
              <div className="flex flex-col mb-5">
                <p className="text-black font-bold text-xl">John Doe</p>

                {/*  */}
              </div>

              <button className="bg-black text-white py-2 px-5">Edit</button>
            </div>
          </div>
        </div>
      </section>
      {/* fin div imagen */}

      {/* div desplegable y boton user come back */}
      <section className="bg-gray-100 py-8">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-around items-center gap-6">
          {/* Primer div */}
          <div className="bg-white p-6 rounded-lg flex flex-col items-center">
            {/* dropdown */}
            <div className="w-[150px] text-gray-900 dark:text-gray-300 items-center">
              <div className="relative w-full group bg-white ">
                <label className="text-lg text-black-400">
                  <h3>My Companies</h3>
                </label>

                <button className="py-2.5 px-3 my-5  w-full md:text-sm text-site bg-gray-300 border border-dimmed  focus:border-brand focus:outline-none focus:ring-0 peer flex items-center justify-between rounded ">
                  Selected company
                </button>
                <div className="absolute z-[99] top-[100%] left-[50%] translate-x-[-50%] rounded-md overflow-hidden shadow-lg min-w-[200px] w-max peer-focus:visible peer-focus:opacity-100 opacity-0 invisible duration-200 p-1 bg-gray-300 dark:bg-gray-800  border border-dimmed text-xs md:text-sm">
                  <div className=" w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
                    Company1
                  </div>
                  <div className=" w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
                    Company2
                  </div>
                  <div className=" w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
                    Company3
                  </div>

                  <div className=" w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
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
              Add company
            </button>
          </div>

          {/* Segundo div */}
          <div className="bg-gray-200 p-0 m-1 rounded-lg flex flex-col items-center">
            <button className="bg-black text-white px-6 py-2 rounded-sm hover:bg-gray-800">
              USER COME BACK
            </button>
          </div>
        </div>
      </section>

      {/* fin div desplegable */}

      {/* section 2 */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="p-4 w-1/2">
              <div className="h-full bg-gray-100 p-8 rounded">
                <div className="flex w-screen h-screen dark:bg-gray-900 justify-center items-center">
                  {/*  */}
                  <div className="w-[150px] text-gray-900 dark:text-gray-100">
                    <div className="relative w-full group">
                      <label className="text-xs text-gray-400">
                        Select Company
                      </label>
                      <button className="py-2.5 px-3 w-full md:text-sm text-site bg-transparent border border-dimmed  focus:border-brand focus:outline-none focus:ring-0 peer flex items-center justify-between rounded font-semibold">
                        Company1
                      </button>
                      <div className="absolute z-[99] top-[100%] left-[50%] translate-x-[-50%] rounded-md overflow-hidden shadow-lg min-w-[200px] w-max peer-focus:visible peer-focus:opacity-100 opacity-0 invisible duration-200 p-1 bg-gray-100 dark:bg-gray-800  border border-dimmed text-xs md:text-sm">
                        <div className=" w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
                          Company1
                        </div>
                        <div className=" w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
                          Company2
                        </div>
                        <div className=" w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
                          Company3
                        </div>

                        <div className=" w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
                          Company4
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 w-1/2">
              <div className="h-full bg-gray-100 p-8 rounded"></div>
            </div>
          </div>
        </div>
      </section>
      {/* fin section 2 */}
    </div>
  );
};

export default ProfileView;
