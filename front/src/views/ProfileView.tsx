import React from "react";
import styles from "../styles/Profile.module.css";

const ProfileView: React.FC = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.div}>
        <div className={styles.div2}>
          <div className={styles.overlap}>
            <div className={styles.div2}>
              {/* <button className={styles.button}>
                <div className={styles.textbutton}>ADD COMPANY</div>
              </button> */}
              <button className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded">
                User come back
              </button>

              {/* comienza container */}
              <div className={styles.containermy}>
                <div className="relative inline-block text-left">
                  <div className="group">
                    {/* <!-- Dropdown menu --> */}
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
                  </div>
                </div>
                {/* <div className={styles.rectangle}></div>
                <div className={styles.overlapgroup}>
                  <div className={styles.mycomp}>
                    <div className={styles.item}>

                      <div className={styles.div3}>
                        <div className={styles.img}></div>
                        <div className={styles.name}>
                          <div className={styles.text}>Marie Clark</div>
                          <div className={styles.textwrapper}>User</div>
                        </div>
                      </div>
                      <button className={styles.buttonedit}>
                        <div className={styles.textwrapper2}>Edit</div>
                      </button>
                    </div>
                    <div className={styles.item2}>
                      <div className={styles.div3}>
                        <div className={styles.img}></div>
                        <div className={styles.name}>
                          <div className={styles.text}>Marie Clark</div>
                          <div className={styles.textwrapper}>User</div>
                        </div>
                      </div>
                      <button className={styles.buttonedit}>
                        <div className={styles.textwrapper2}>Edit</div>
                      </button>
                    </div>
                    <div className={styles.item2}>
                      <div className={styles.div3}>
                        <div className={styles.img}></div>
                        <div className={styles.name}>
                          <div className={styles.text}>Marie Clark</div>
                          <div className={styles.textwrapper}>User</div>
                        </div>
                      </div>
                      <button className={styles.buttonedit}>
                        <div className={styles.textwrapper2}>Edit</div>
                      </button>
                    </div>
                  </div>
                  <div className={styles.textwrapper3}>My companies</div>
                  <div className={styles.containemycomp}></div>
                </div>
                <button className={styles.textbuttonwrapper}>
                  <div className={styles.textbutton2}>ADD COMPANY</div>
                </button>*/}
              </div>
              {/* fin container */}
              <div className={styles.overlap2}>
                <div className={styles.rectangle2}></div>
                <img className={styles.image} src="../image_profile.png" />
              </div>
            </div>
            <div className={styles.contenedornombre}>
              <input
                className={styles.input}
                placeholder="YourName"
                type="styles.text"
              />
              <div className={styles.textwrapper4}>Username</div>
              <button className={styles.divwrapper}>
                <button className={styles.textbutton3}>Edit</button>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.contenedorsection}></div>
          {/* contenedor de botones */}
          <div className={styles.containerbuttons}>
            {/* <div className="max-w-2xl mx-auto my-8 bg-black rounded-lg shadow-md overflow-hidden"> */}
            <p>Information</p>
            {/* </div> */}
          </div>
          {/* <button className={styles.button2}>
              <div className={styles.textbutton}>ADD COMPANY</div>
            </button>
            <button className={styles.button3}>
              <div className={styles.textbutton}>ADD COMPANY</div>
            </button>
            <button className={styles.button4}>
              <div className={styles.textbutton}>ADD COMPANY</div>
            </button>
            <button className={styles.button5}>
              <div className={styles.textbutton}>ADD COMPANY</div>
            </button> */}
        </div>
        <img className={styles.vector} src="./vector1_profile.png" />
      </div>
    </div>
  );
};

export default ProfileView;
