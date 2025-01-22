import instance from '../libs/axios';
import { imageResponseType } from '../types/image';

// 이미지 업로드하기
const postImagesUpload = async ({
  imageFile,
}: {
  imageFile: File;
}): Promise<imageResponseType> => {
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
