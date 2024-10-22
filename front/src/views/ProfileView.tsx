import React from "react";
import styles from "../styles/Profile.module.css";

const ProfileView: React.FC = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.div}>
        <div className={styles.div2}>
          <div className={styles.overlap}>
            <div className={styles.div2}>
              <button className={styles.button}>
                <div className={styles.textbutton}>ADD COMPANY</div>
              </button>
              <div className={styles.containermy}>
                {/* <div className={styles.rectangle}></div> */}
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
                </button>
              </div>
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
          <div className={styles.containerbuttons}>
            <button className={styles.button2}>
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
            </button>
          </div>
          <img className={styles.vector} src="./vector1_profile.png" />
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
