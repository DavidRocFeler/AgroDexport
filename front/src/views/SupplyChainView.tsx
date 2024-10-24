import React from "react";

const SupplyChainView: React.FC = () => {
    return(
        <main className="pl-[1.5rem] pr-[1.5rem] pt-[2rem] pb-[2rem] ">
            <div className="flex flex-row justify-center items-center mb-[2rem]">
                <h1 className="text-[6rem] ">Order Status </h1>
                <select className="ml-auto mt-[2.2rem]  border-black border-[1px] border-solid pt-[0.5rem] pb-[0.5rem] pr-[1rem] pl-[1rem]" name="Order List" id="">
                    <option className="" value="">Order List</option>
                    <option value="">Order Nº</option>
                    <option value="">Order Nº</option>
                    <option value="">Order Nº</option>
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
                    <h2 className=""> En esta vista el comprador vera el estado de su orden, y podra saber en que momento se encuentra 
                        exactamente su producto o productos con sus respectivos certificados, para lograr esto me taere el producto con su numero id ala ruta de ordenes</h2>
                </div>
            </section>
        </main>
    )
};

export default SupplyChainView;