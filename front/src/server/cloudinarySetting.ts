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
