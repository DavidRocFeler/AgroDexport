import { IOrderDetail } from "@/interface/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const createOrder = async (orderDetails:IOrderDetail, token:string | null) => {
  try {

    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderDetails)
    });

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error al crear la orden:', errorText);
      throw new Error('Failed to create the order');
    }


    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Unexpected error while creating the order:', error.message);
      throw new Error(error.message);
    } else {
      console.error('Unexpected error type:', error);
      throw new Error('Unexpected error while creating the order');
    }
  }
};


export const getCompaniesById = async (user_id:string | null, token:string | null) => {
  try {

    const response = await fetch(`${API_URL}/companies/user/${user_id}`, {
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

export const fetchCompanyData = async (companyId: string) => {
  try {
    const response = await fetch(`${API_URL}/companies/user/accountPaypal/${companyId}`,{
      method: 'GET',
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error a traer la cuenta de paypal:', errorText);
      throw new Error('Failed to get accountPaypal');
    }
    const data = await response.json();
    const accountPaypal = data.account_paypal;
    return accountPaypal; 
  } catch (error) {
    console.error("Error fetching company data:", error)
  }
};

export const cancelOrder = async (orderId: string, token:string) => {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error al cancelar la orden:', errorText);
      throw new Error('Failed to cancel the order');
    }
    return response
  } catch (error) {
    console.error("Error fetching cancelled order")
  }
}

export const finishedOrder = async (orderId: string, token:string) => {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}`,{
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error al finalizar la orden:', errorText);
      throw new Error('Failed to finished the order');
    }
    console.log(response)
    return response
  } catch (error) {
    console.error("Error fetching finished order")
  }
}