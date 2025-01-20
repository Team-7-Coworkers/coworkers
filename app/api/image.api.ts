import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//이미지 업로드하기
const postImagesUpload = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await instance.post(`images/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export { postImagesUpload };
