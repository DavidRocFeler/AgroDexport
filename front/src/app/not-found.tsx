import React from "react";
import Link from "next/link";

const NotFound = () => {
    return(
        <div className="flex flex-col justify-center items-center mt-[13rem] ">
            <h1 className="text-[2rem] font-bold mb-[5rem] "> Page not found </h1>
            <Link href="/" className="bg-blue-700 p-[1rem] flex flex-row w-fit ">
                Go back to home
            </Link>
        </div>
    )
};
export default NotFound;