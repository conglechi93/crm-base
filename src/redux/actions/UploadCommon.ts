import {API_ENDPOINTS} from 'services/apiUrl';
import axiosService from 'services/axiosServices';

export const onUploadFile = async (file: any, type: string) => {
  try {
    const fmData = new FormData();
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    fmData.append('upload', file);
    fmData.append('type', type);
    const res = await axiosService.post(
      fmData,
      API_ENDPOINTS.common.upload_file,
      config,
    );
    return res?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const onRemoveFile = async (id: string) => {
  try {
    const reqParams = {
      id: id,
    };
    await axiosService.delete(reqParams, API_ENDPOINTS.common.delete_file);
    return true;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
