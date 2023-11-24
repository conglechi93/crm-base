import {API_ENDPOINTS} from 'services/apiUrl';
import API from 'api/Request';

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
    const res = await API.post(
      API_ENDPOINTS.common.upload_file,
      fmData,
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
    await API.delete(API_ENDPOINTS.common.delete_file, {
      params: reqParams,
    });
    return true;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
