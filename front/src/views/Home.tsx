import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css"

const HomeView: React.FC = () => {
    return(
        <main style={{background: "#d8fba7", paddingTop: "5rem", paddingLeft: "5rem", paddingBottom: "8rem"}}>
            <div>
                <h1 className={styles.CoverTitle}> Supervise the agro supply chain</h1>
                <p className={styles.Paragraph}> Connect with suppliers and entrepreneurs in a B2B e-commerce service.</p>
                <Link className={styles.SignUp} href="/providers"> See The Market </Link>
            </div>
        </main>
    )
};
export default HomeView;