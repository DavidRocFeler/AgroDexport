const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCompanyById(companyId: string) {
    try {
      const response = await fetch(`${API_URL}/company/${companyId}`);
      if (!response.ok) {
        throw new Error("Error in the company request");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in the company request:", error);
      throw error; 
    }
  }
  