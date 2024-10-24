import Link from "next/link";
import React from "react";

const SupplyChainViewCopy: React.FC = () => {
    return(
        <main className="pl-[1.5rem] pr-[1.5rem] pt-[2rem] pb-[2rem] ">
            <div className="flex flex-row justify-center items-center mb-[2rem] border-solid border-black border-[1px]">
                <h1 className="text-[6rem] "> Supply Chain </h1>
                <select className="ml-auto mt-[2.2rem]  border-black border-[1px] border-solid pt-[0.5rem] pb-[0.5rem] pr-[1rem] pl-[1rem]" name="Order List" id="">
                    <option className="" value=""> Succesfully sales</option>
                    <option value="">Sale Nº</option>
                    <option value="">Sale Nº</option>
                    <option value="">Sale Nº</option>
                </select>
            </div>
            <section className="flex flex-row border-black border-[1px] border-solid ">
                <div className="flex flex-col relative z-10">
                    <button className=" border-black border-[1px] border-solid pt-[0.5rem] pb-[0.5rem] pr-[1rem] pl-[1rem] mb-[2rem] "> Farmer </button>
                    <button className=" border-black border-[1px] border-solid pt-[0.5rem] pb-[0.5rem] pr-[1rem] pl-[1rem] mb-[2rem] "> Internal logistic </button>
                    <button className=" border-black border-[1px] border-solid pt-[0.5rem] pb-[0.5rem] pr-[1rem] pl-[1rem]  mb-[2rem] "> Customs of origin </button>
                    <button className=" border-black border-[1px] border-solid pt-[0.5rem] pb-[0.5rem] pr-[1rem] pl-[1rem] mb-[2rem] "> International Logistic </button>
                    <button className=" border-black border-[1px] border-solid pt-[0.5rem] pb-[0.5rem] pr-[1rem] pl-[1rem] mb-[2rem] "> Customs of destiny </button>
                    <button className=" border-black border-[1px] border-solid pt-[0.5rem] pb-[0.5rem] pr-[1rem] pl-[1rem] mb-[2rem] "> Destiny logistic</button>
                    <button className=" border-black border-[1px] border-solid pt-[0.5rem] pb-[0.5rem] pr-[1rem] pl-[1rem] absolute bottom-0 w-[100%] "> Sent </button>
                </div>
                <div className="relative border-solid border-black border-[1px] w-[70%] ml-auto h-[40rem] p-[2rem] ">
                    <h2 className="">Aqui me traigo el id del producto que guarde en local storage y con el id hago un solicitud al back para traerme los certificados de farmer 
                        de este producto, esta vista es para que el comprador pueda ver la cadena de suministro del producto</h2>
                </div>
            </section>
            <Link className=" flex flex-row justify-center items-center w-[15.09%] m-auto mt-[3rem] border-black border-[1px] border-solid pt-[0.5rem] pb-[0.5rem] pr-[1rem] pl-[1rem]" href="/detailproduct">
                Come back
            </Link>
        </main>
    )
};

export default SupplyChainViewCopy;