import React from 'react'
import Link from 'next/link';
import styles from "../styles/Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.Footer}>
        <Link className="m-[1rem] text-[0.9rem" style={{color: "#6b6b6b"}} href="/help" > Help </Link>
        <Link className="m-[1rem] text-[0.9rem]" style={{color: "#6b6b6b"}} href="/about" > About </Link>
        <Link className="m-[1rem] text-[0.9rem]" style={{color: "#6b6b6b"}} href="/blog" > Blog </Link>
        <Link className="m-[1rem] text-[0.9rem]" style={{color: "#6b6b6b"}} href="/privacy" > Privacy </Link>
        <Link className="m-[1rem] text-[0.9rem]" style={{color: "#6b6b6b"}} href="/terms" > Terms </Link>
        <Link className="m-[1rem] text-[0.9rem]" style={{color: "#6b6b6b"}} href="/support" > Suport </Link>
    </footer>
  )
}

export default Footer;
