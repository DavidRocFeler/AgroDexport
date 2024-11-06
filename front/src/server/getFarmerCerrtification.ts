
const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const getFarmerCertificationByOrderId = async (orderId:string,  token:string ) => {
    try {
  
      const response = await fetch(`${API_URL}/farmer-certifications/order/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error a traer las ordenes:', errorText);
        throw new Error('Failed to get companies');
      }
  
  
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Unexpected error while get the companies:', error.message);
        throw new Error(error.message);
      } else {
        console.error('Unexpected error type:', error);
        throw new Error('Unexpected error while get the companies');
      }
    }
  };