import React from "react";

const SupplyChainViewSupplier: React.FC = () => {
    return(
        <main className="pl-[1.5rem] pr-[1.5rem] pt-[2rem] pb-[2rem] ">
            <div className="flex flex-row items-center mb-[2rem]">
                <h1 className="text-[6rem] "> History Buys </h1>
                <div className="ml-auto mt-[2rem] ">
                    <select className=" mr-[1rem] border-black border-[1px] border-solid pt-[0.5rem] pb-[0.5rem] pr-[1rem] pl-[1rem]" name="Order List" id="">
                        <option className="" value=""> My companies</option>
                        <option value="">Company Nº</option>
                        <option value="">Company Nº</option>
                        <option value="">Company Nº</option>
                    </select>
                    <select className=" mr-[1rem] border-black border-[1px] border-solid pt-[0.5rem] pb-[0.5rem] pr-[1rem] pl-[1rem]" name="Order List" id="">
                        <option className="" value=""> My products</option>
                        <option value="">Product Nº</option>
                        <option value="">Product Nº</option>
                        <option value="">Product Nº</option>
                    </select>
                    <select className=" border-black border-[1px] border-solid pt-[0.5rem] pb-[0.5rem] pr-[1rem] pl-[1rem]" name="Order List" id="">
                        <option className="" value=""> History Buys </option>
                        <option value="">Sales Nº</option>
                        <option value="">Sales Nº</option>
                        <option value="">Sales Nº</option>
                    </select>               
                </div>
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
                    <h2 className="">Documentaciones</h2>
                </div>
            </section>
        </main>
    )
};

export default SupplyChainViewSupplier;