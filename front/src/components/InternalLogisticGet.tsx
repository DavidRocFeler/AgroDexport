import React, { useState } from 'react';
import Style from "../styles/FarmerCertificationsGet.module.css";
import { IInternalLogistic } from '@/interface/certificationsTypes';

const InternalLogisticGet: React.FC<{ internalLogistic: IInternalLogistic }> = ({ internalLogistic }) => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [visibleButtons, setVisibleButtons] = useState([true, true, true]); // Control visibility of buttons
  
  const { InternalTransferGuide, PackingList, DeliveryReceipt } = internalLogistic;
  const images = [InternalTransferGuide, PackingList, DeliveryReceipt];
  
  const handleImageChange = (image: string, index: number) => {
    setCurrentImage(image);
    setVisibleButtons(visibleButtons.map((_, i) => i !== index)); // Show only other two buttons
  };
  
  return (
    <div id='MainContainer' className="flex flex-col justify-center items-center w-[100%] max-h-[40rem] overflow-y-auto">
      <h2 style={{ marginLeft: "1rem" }} className={Style.FarmeH2}>Internal Logistic</h2>
      
      <div className="flex flex-col ">
        {visibleButtons[0] && (
          <button 
            onClick={() => handleImageChange(InternalTransferGuide, 0)}
            className={Style.FarmeButton}
          >
            Internal Transfer Guide
          </button>
        )}
        {visibleButtons[1] && (
          <button 
            onClick={() => handleImageChange(PackingList, 1)}
            className={Style.FarmeButton}
          >
            Packing List
          </button>
        )}
        {visibleButtons[2] && (
          <button 
            onClick={() => handleImageChange(DeliveryReceipt, 2)}
            className={Style.FarmeButton}
          >
            Delivery Receipt
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
                {index === 0 ? 'Internal Transfer Guide' : index === 1 ? 'Packing List' : 'Delivery Receipt'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InternalLogisticGet;
