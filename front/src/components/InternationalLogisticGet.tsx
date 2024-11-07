import React, { useState } from 'react';
import Style from "../styles/FarmerCertificationsGet.module.css";
import { IInternationalLogistic } from '@/interface/certificationsTypes';

const InternationalLogisticGet: React.FC<{ internationalLogistic: IInternationalLogistic }> = ({ internationalLogistic }) => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [visibleButtons, setVisibleButtons] = useState([true, true, true, true, true]); // Control visibility of buttons
  
  const { TransportInsurance, CargoManifest, CargoGuide, BillOfLading, GoodsDepositReceipt } = internationalLogistic;
  const images = [TransportInsurance, CargoManifest, CargoGuide, BillOfLading, GoodsDepositReceipt];
  
  const handleImageChange = (image: string, index: number) => {
    setCurrentImage(image);
    setVisibleButtons(visibleButtons.map((_, i) => i !== index)); // Show only other buttons
  };
  
  return (
    <div id='MainContainer' className="flex flex-col justify-center items-center w-[100%] max-h-[40rem] overflow-y-auto">
      <h2 style={{ marginLeft: "1rem" }} className={Style.FarmeH2}>International Logistic</h2>
      
      <div className="flex flex-col">
        {visibleButtons[0] && (
          <button 
            onClick={() => handleImageChange(TransportInsurance, 0)}
            className={Style.FarmeButton}
          >
            Transport Insurance
          </button>
        )}
        {visibleButtons[1] && (
          <button 
            onClick={() => handleImageChange(CargoManifest, 1)}
            className={Style.FarmeButton}
          >
            Cargo Manifest
          </button>
        )}
        {visibleButtons[2] && (
          <button 
            onClick={() => handleImageChange(CargoGuide, 2)}
            className={Style.FarmeButton}
          >
            Cargo Guide
          </button>
        )}
        {visibleButtons[3] && (
          <button 
            onClick={() => handleImageChange(BillOfLading, 3)}
            className={Style.FarmeButton}
          >
            Bill of Lading
          </button>
        )}
        {visibleButtons[4] && (
          <button 
            onClick={() => handleImageChange(GoodsDepositReceipt, 4)}
            className={Style.FarmeButton}
          >
            Goods Deposit Receipt
          </button>
        )}
      </div>

      {currentImage && (
        <div className="flex flex-col items-center mt-4">
          <img src={currentImage} alt="Logistic Image" className="mb-4" style={{ width: '75%' }} />
          <div className="flex flex-col">
            {visibleButtons.map((visible, index) => visible && (
              <button 
                key={index}
                onClick={() => handleImageChange(images[index], index)}
                className={Style.FarmeButton}
              >
                {index === 0 ? 'Transport Insurance' : index === 1 ? 'Cargo Manifest' : index === 2 ? 'Cargo Guide' : index === 3 ? 'Bill of Lading' : 'Goods Deposit Receipt'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InternationalLogisticGet;
