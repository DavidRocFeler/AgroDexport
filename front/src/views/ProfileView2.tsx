import React from "react";
// import styles from "../styles/Profile2.module.css";

const ProfileView2: React.FC = () => {
  return (
    <section className="py-10 my-auto dark:bg-gray-900">
      <div className=" lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
          <div className="">
            {/* <form> */}
            {/* <!-- Cover Image --> */}
            <div className="w-full rounded-sm  items-center">
              {/* <!-- Profile Image --> */}
              <div className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat">
                <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                  <input
                    type="file"
                    name="profile"
                    id="upload_profile"
                    hidden
                    required
                  />

                  <label htmlFor="upload_profile">
                    <svg
                      data-slot="icon"
                      className="w-6 h-5 text-blue-700"
                      fill="none"
                      stroke-width="1.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                      ></path>
                    </svg>
                  </label>
                </div>
              </div>
              <div className="flex justify-end">
                {/* <input
                  type="file"
                  name="profile"
                  id="upload_cover"
                  hidden
                  required
                /> */}
                <img src="../image_profile.png" />
              </div>
            </div>
            {/* name y user */}
            <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
              John Doe
            </h1>
            <h2 className="text-grey text-sm mb-4 dark:text-gray-400">
              john@gmail.com
            </h2>
            {/* dropdown */}

            <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
              <div className="w-full">
                <h3 className="dark:text-gray-300 mb-2">Companies</h3>
                <select className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800">
                  <option disabled value="">
                    Select Company
                  </option>
                  <option value="company1"> Company1</option>
                  <option value="company2">Company2</option>
                </select>
              </div>
            </div>
            {/* button */}
            <div className="w-1/4 rounded-lg bg-black mt-4 text-white text-lg font-semibold">
              <button type="submit" className="w-full p-4">
                Submit
              </button>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileView2;
