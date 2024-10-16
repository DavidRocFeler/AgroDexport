"use client"
import React from "react";
import styles from "../styles/ProductDetail.module.css"
import { IAgroProduct } from "@/interface/types";

const ProductDetail: React.FC<IAgroProduct> = ({
    name, description, variety, origin, harvestDate, pricePerUnit, unitType, stock, images, nutritionalInfo, certifications, shippingOptions
}) => {
    
    const { calories, protein, fat, carbs } = nutritionalInfo;
    const { method, deliveryTime, seaFreight } = shippingOptions
 
    return(
        <div className="md:flex flex-col pt-[2rem] pb-[2rem] ">
            <div className="flex flex-row justify-evenly">
                <div className="flex flex-col w-[40%] border-[1px] border-black border-solid ">                
                    <figure className={styles.MainPicture}>
                        <img src={images[0]} alt="MainProduct" className="w-[30rem] m-auto object-cover " />
                    </figure>
                    <figure className="flex flex-row mt-[2rem] justify-evenly">
                        <img src={images[1]} alt="MainProduct" className="w-[9rem] h-auto mr-[1rem] " />
                        <img src={images[2]} alt="MainProduct" className="w-[9rem] h-auto mr-[1rem] " />
                        <img src={images[3]} alt="MainProduct" className="w-[9rem] h-auto mr.[1rem] " />
                    </figure>
                </div>
                <div className="border-[1px] border-black border-solid w-[45%] relative overflow-hidden  ">  
                    <table className={styles.CustomTable}>
                        <tbody>
                            <tr className={styles.Row}>
                                <td className={styles.ColLeft}> Name: </td>
                                <td className={styles.ColRight} > {name} </td>
                            </tr>
                            <tr className={styles.Row}>
                                <td className={styles.ColLeft}> Variety: </td>
                                <td className={styles.ColRight} > {variety} </td>
                            </tr>
                            <tr className={styles.Row}>
                                <td className={styles.ColLeft}> Oigin: </td>
                                <td className={styles.ColRight} > {origin} </td>
                            </tr>
                            <tr className={styles.Row}>
                                <td className={styles.ColLeft}> Harvest Date: </td>
                                <td className={styles.ColRight} > {harvestDate} </td>
                            </tr>
                            <tr className={styles.Row}>
                                <td className={styles.ColLeft}> Price per kl: </td>
                                <td className={styles.ColRight} > $ {pricePerUnit} </td>
                            </tr>
                            <tr className={styles.Row}>
                                <td className={styles.ColLeft}> Minimum Order:</td>
                                <td className={styles.ColRight} > {unitType} </td>
                            </tr>
                            <tr className={styles.Row}>
                                <td className={styles.ColLeft}> Stock: </td>
                                <td className={styles.ColRight} > {stock} </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="border-black border-solid border-[1px] m-auto absolute bottom-0 ">
                        <p className="p-[2rem] " > {description} </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-evenly mt-[2rem] ">
                <div className="flex flex-row  w-[65%] border-[1px] border-solid border-black " >
                    
                        <table className={styles.TableTwoColumns}>
                            <tbody className={styles.BodyRows}>
                                <tr className={styles.Row}>
                                    <td className={styles.LeftCol}> Calories: </td>
                                    <td className={styles.RightCol}> {calories} </td>
                                </tr>
                                <tr className={styles.Row}>
                                    <td className={styles.LeftCol}> Protein: </td>
                                    <td className={styles.RightCol}> {protein} </td>
                                </tr>
                                <tr className={styles.Row}>
                                    <td className={styles.LeftCol}> Fat: </td>
                                    <td className={styles.RightCol}> {fat} </td>
                                </tr>
                                <tr className={styles.Row}>
                                    <td className={styles.LeftCol}> Carbs: </td>
                                    <td className={styles.RightCol}> {carbs} </td>
                                </tr>
                            </tbody>
                        </table>
                
                        <table className={styles.TableTwoColumns} style={{marginLeft: "auto"}}>
                            <tbody className={styles.BodyRows}>
                                <tr className={styles.Row}>
                                    <td className={styles.LeftCol}>Certifications:</td>
                                    <td className={styles.RightCol}>{certifications} </td>
                                </tr>
                                <tr className={styles.Row}>
                                    <td className={styles.LeftCol}> Delivery Time: </td>
                                    <td className={styles.RightCol}> {deliveryTime} </td>
                                </tr>
                                <tr className={styles.Row}>
                                    <td className={styles.LeftCol}> Shipping Condition: </td>
                                    <td className={styles.RightCol}> {method} </td>
                                </tr>
                                <tr className={styles.Row}>
                                    <td className={styles.LeftCol}> Sea Freight: </td>
                                    <td className={styles.RightCol}> {seaFreight} </td>
                                </tr>
                            </tbody>
                        </table>
                    
                </div>
                <div className="flex flex-col w-[20%] border-[1px] border-solid border-black ">
                    <button className={styles.ButtonCartshop} > Add to carth shop </button>
                    <button className={styles.ButtonSupplier}> Supplier details </button>{styles.ButtonSuppier}
                    <button className={styles.ButtonSupply} > See supply chain </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;