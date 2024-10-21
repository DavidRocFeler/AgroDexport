import React from "react";
import styles from "@/styles/Profile.module.css";

const ProfileView: React.FC = () => {
  return (
    <div className={styles.maincontainer}>
      <div className={styles.flexrowba}>
        <button className={styles.rectangle}>
          <span className={styles.downloadresume}>USER COME BACK</span>
        </button>
      </div>
      {/* <div className={styles.flexrowcf}>
        <div className={styles.ellipse}></div>
        <div className={styles.ellipse1}></div>
        <span className={styles.johncreativetechnologist}>
          Hi, I am John,
          <br />
          Creative Technologist
        </span>
      </div> */}
      <div className={styles.profile}>
        <img
          className={styles.profileInner}
          alt=""
          src="../Ellipse2_profile.png"
        />
        {/* <div className={styles.profileChild2} /> */}
        {/* Contenedor companias */}
        <div className={styles.suggestedAccounts}>
          <b className={styles.myCompanies}>My companies</b>

          <div className={styles.frameParent}>
            {/* DIV 1 */}

            <div className={styles.frameContainer}>
              <div className={styles.ellipseGroup}>
                <div className={styles.frameChild} />
                <div className={styles.userParent}>
                  <div className={styles.user1}>User</div>
                  <b className={styles.derekSteam}>Derek Steam</b>
                </div>
              </div>
              <div className={styles.editWrapper}>
                <b className={styles.edit}>Edit</b>
              </div>
            </div>
            {/* DIV 2 */}
            <div className={styles.frameContainer}>
              <div className={styles.ellipseGroup}>
                <div className={styles.frameChild} />
                <div className={styles.userParent}>
                  <div className={styles.user1}>User</div>
                  <b className={styles.derekSteam}>Derek Steam</b>
                </div>
              </div>
              <div className={styles.editWrapper}>
                <b className={styles.edit}>Edit</b>
              </div>
            </div>

            {/* DIV 3 */}

            <div className={styles.frameContainer}>
              <div className={styles.ellipseGroup}>
                <div className={styles.frameChild} />
                <div className={styles.userParent}>
                  <div className={styles.user1}>User</div>
                  <b className={styles.derekSteam}>Derek Steam</b>
                </div>
              </div>
              <div className={styles.editWrapper}>
                <b className={styles.edit}>Edit</b>
              </div>
            </div>
          </div>

          {/* container companies*/}

          <div className={styles.suggestedAccountsItem} />
        </div>

        {/* Fin Contenedor companias */}
        <div className={styles.addCompanyWrapper1}>
          <div className={styles.userCameBack}>ADD COMPANY</div>
        </div>
        {/* Div Name */}
        <div className={styles.yourNameParent}>
          <b className={styles.yourName}>Your Name</b>
          <div className={styles.username}>Username</div>
          <div className={styles.editWrapper1}>
            <div className={styles.edit3}>Edit</div>
          </div>
        </div>
        {/* Fin Div Name */}
      </div>
      {/* <button className={styles.rectangle}>
        <span className={styles.downloadresume}>ADD Companies</span>
      </button> */}
      <div className={styles.rectangle2}>
        <div className={styles.flexrowceeb}></div>
        <div className={styles.flexrowedc}>
          {/* div botones */}
          <div className={styles.rectangle3}>
            <button className={styles.rectangle21}>
              <span className={styles.downloadresume}>Information contact</span>
            </button>
            <button className={styles.rectangle22}>
              <span className={styles.downloadresume}>Information contact</span>
            </button>
            <button className={styles.rectangle23}>
              <span className={styles.downloadresume}>Information contact</span>
            </button>
            <button className={styles.rectangle24}>
              <span className={styles.downloadresume}>Information contact</span>
            </button>
          </div>
          <div className={styles.rectangle8}></div>
        </div>
      </div>

      <div className={styles.vectorb}></div>

      <div className={styles.vectorf}></div>

      <div className={styles.vector13}></div>
    </div>
  );
};

export default ProfileView;
