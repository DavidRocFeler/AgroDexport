import React, { useState } from 'react';
import Style from "../styles/FarmerCertificationsGet.module.css";
import { ICustomOfOrigin } from '@/interface/certificationsTypes';

const CustomOfOriginGet: React.FC<{ customOfOrigin: ICustomOfOrigin }> = ({ customOfOrigin }) => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [visibleButtons, setVisibleButtons] = useState([true, true, true]); // Control visibility of buttons
  
  const { ExportPermit, ExportDeclaration, InspectionCertificate } = customOfOrigin;
  const images = [ExportPermit, ExportDeclaration, InspectionCertificate];
  
  const handleImageChange = (image: string, index: number) => {
    setCurrentImage(image);
    setVisibleButtons(visibleButtons.map((_, i) => i !== index)); // Show only other two buttons
  };
  
  return (
    <div id='MainContainer' className="flex flex-col justify-center items-center w-[100%] max-h-[40rem] overflow-y-auto">
      <h2 style={{ marginLeft: "1rem" }} className={Style.FarmeH2}>Custom of Origin</h2>
      
      <div className="flex flex-col">
        {visibleButtons[0] && (
          <button 
            onClick={() => handleImageChange(ExportPermit, 0)}
            className={Style.FarmeButton}
          >
            Export Permit
          </button>
        )}
        {visibleButtons[1] && (
          <button 
            onClick={() => handleImageChange(ExportDeclaration, 1)}
            className={Style.FarmeButton}
          >
            Export Declaration
          </button>
        )}
        {visibleButtons[2] && (
          <button 
            onClick={() => handleImageChange(InspectionCertificate, 2)}
            className={Style.FarmeButton}
          >
            Inspection Certificate
          </button>
        )}
      </div>

      {currentImage && (
        <div className="flex flex-col items-center mt-4">
          <img src={currentImage} alt="Custom Image" className="mb-4" style={{ width: '75%' }} />
          <div className="flex flex-col">
            {visibleButtons.map((visible, index) => visible && (
              <button 
                key={index}
                onClick={() => handleImageChange(images[index], index)}
                className={Style.FarmeButton}
              >
                {index === 0 ? 'Export Permit' : index === 1 ? 'Export Declaration' : 'Inspection Certificate'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomOfOriginGet;
