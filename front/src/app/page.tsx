import React from "react";
import Footer from "@/components/Footer";
import HomeView from "@/views/Home";

export default function Home () {
  return(
    <>
      <HomeView/>
      <hr className="border-black border-1" />
      <Footer/>
    </>
  )
}