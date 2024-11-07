import React, { useState } from 'react';
import Style from "../styles/FarmerCertificationsGet.module.css";
import { IDestinyLogistic } from '@/interface/certificationsTypes';

const DestinyLogisticGet: React.FC<{ destinyLogistic: IDestinyLogistic }> = ({ destinyLogistic }) => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [visibleButtons, setVisibleButtons] = useState([true, true, true]); // Control visibility of buttons
  
  const { DeliveryNote, ProofOfDelivery, InternalTransportServiceInvoice } = destinyLogistic;
  const images = [DeliveryNote, ProofOfDelivery, InternalTransportServiceInvoice];
  
  const handleImageChange = (image: string, index: number) => {
    setCurrentImage(image);
    setVisibleButtons(visibleButtons.map((_, i) => i !== index)); // Show only other buttons
  };
  
  return (
    <div id='MainContainer' className="flex flex-col justify-center items-center w-[100%] max-h-[40rem] overflow-y-auto">
      <h2 style={{ marginLeft: "1rem" }} className={Style.FarmeH2}>Destiny Logistic</h2>
      
      <div className="flex flex-col">
        {visibleButtons[0] && (
          <button 
            onClick={() => handleImageChange(DeliveryNote, 0)}
            className={Style.FarmeButton}
          >
            Delivery Note
          </button>
        )}
        {visibleButtons[1] && (
          <button 
            onClick={() => handleImageChange(ProofOfDelivery, 1)}
            className={Style.FarmeButton}
          >
            Proof Of Delivery
          </button>
        )}
        {visibleButtons[2] && (
          <button 
            onClick={() => handleImageChange(InternalTransportServiceInvoice, 2)}
            className={Style.FarmeButton}
          >
            Internal Transport Service Invoice
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
                {index === 0 ? 'Delivery Note' : index === 1 ? 'Proof Of Delivery' : 'Internal Transport Service Invoice'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinyLogisticGet;
