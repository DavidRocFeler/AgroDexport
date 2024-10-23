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

const ProfileView2: React.FC = () => {
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
      <div className="flex h-screen items-center justify-center px-10">
        <div className="w-full sm:w-1/2  bg-white shadow-xl rounded-3xl">
          <div className="mt-10 flex justify-center mb-5 ">
            <img
              src="../image_profile.png"
              style={{ width: "150px", height: "150px" }}
              className="rounded-full mt-5"
              alt="profile"
            />
          </div>
          <div className="flex justify-center px-5 ">
            <div className="border-b-2 border-gray-500 w-full"></div>
          </div>
          <div className="flex justify-center text-center p-5">
            <p>John Doe</p>
          </div>
          <div className="flex justify-center gap-4 p-5">
            <button className="py-2 px-3 bg-black font-semibold text-white w-1/4 rounded-sm hover:bg-black">
              Edit
            </button>
          </div>
        </div>
      </div>
      {/* section 2 */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="p-4 w-1/2">
              <div className="h-full bg-gray-100 p-8 rounded">
                <div className="flex w-screen h-screen dark:bg-gray-900 justify-center items-center">
                  <div className="w-[150px] text-gray-900 dark:text-gray-100">
                    <div className="relative w-full group">
                      <label className="text-xs text-gray-400">
                        Select Category
                      </label>
                      <button className="py-2.5 px-3 w-full md:text-sm text-site bg-transparent border border-dimmed  focus:border-brand focus:outline-none focus:ring-0 peer flex items-center justify-between rounded font-semibold">
                        All
                      </button>
                      <div className="absolute z-[99] top-[100%] left-[50%] translate-x-[-50%] rounded-md overflow-hidden shadow-lg min-w-[200px] w-max peer-focus:visible peer-focus:opacity-100 opacity-0 invisible duration-200 p-1 bg-gray-100 dark:bg-gray-800  border border-dimmed text-xs md:text-sm">
                        <div className=" w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
                          All (9)
                        </div>
                        <div className=" w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
                          Full Stack (6)
                        </div>
                        <div className=" w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
                          Front End (1)
                        </div>
                        <div className=" w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
                          Freelance (1)
                        </div>
                        <div className=" w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
                          New Stack Project (1)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 w-1/2">
              <div className="h-full bg-gray-100 p-8 rounded">
                <p className="leading-relaxed mb-6">
                  Fusce pharetra eget augue ac condimentum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* fin section 2 */}
    </div>
  );
};

export default ProfileView2;
