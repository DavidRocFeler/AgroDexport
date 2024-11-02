const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const uploadImageToCloudinary = async (
  file: File,
  type: string,
  id: string,
  token: string
): Promise<any> => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const res = await fetch(`${API_URL}/uploadImage/${type}/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
      body: formData,
    });

    if (!res.ok) {

        const errorText = await res.text();
        console.error('Error al subir la imagen:', errorText);
        throw new Error('Failed to upload the image');
      }
  
      const data = await res.json();
      return data;
    } catch (error: any) {
      console.error('Unexpected error while uploading the image:', error);
      throw new Error(error.message || 'Unexpected error while uploading the image');
    }
  };


  export const uploadDocumentsToCloudinary = async (
    files: Record<string, File>,
    companyId: string,
    companyProductId: string,
    token: string
  ): Promise<any> => {
    const formData = new FormData();
  
    // Añadir cada archivo al formData
    Object.entries(files).forEach(([fieldName, file]) => {
      if (file) {
        formData.append(fieldName, file);
      }
    });
  
    // Verifica el contenido de formData antes de enviarlo
    Array.from(formData.entries()).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
  
    try {
      const url = `${API_URL}/uploadDocuments/${companyId}/${companyProductId}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}` // No incluyas 'Content-Type' aquí
        },
        body: formData,
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error uploading documents:', errorText);
        throw new Error('Failed to upload the documents');
      }
  
      const data = await res.json();
      return data;
    } catch (error: any) {
      console.error('Unexpected error while uploading documents:', error);
      throw new Error(error.message || 'Unexpected error while uploading documents');
    }
  };
  
  