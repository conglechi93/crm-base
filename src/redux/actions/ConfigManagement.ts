import {API_ENDPOINTS} from 'services/apiUrl';
import {OPEN_TOAST} from 'types';
import API from 'api/Request';

export const onGetCartFormList = async (payload?: any) => {
  try {
    const reqParams = {
      ...payload,
    };
    const res = await API.get(API_ENDPOINTS.configuration_management.cart, {
      params: reqParams,
    });
    return res?.data?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const onGetCartFormById = async (id: string) => {
  try {
    const res = await API.get(API_ENDPOINTS.configuration_management.cart, {
      params: {
        id: id,
      },
    });
    return res?.data?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const onCreateCartForm = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      await API.post(API_ENDPOINTS.configuration_management.cart, payload);
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: 'Thêm biểu mẫu thành công! ',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return true;
    } catch (error) {
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: 'Thêm biểu mẫu thất bại! ',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      console.log('error', error);
      return false;
    }
  };
};

export const onUpdateCartForm = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        ...payload,
      };
      await API.patch(API_ENDPOINTS.configuration_management.cart, reqParams);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: 'Cập nhật biểu mẫu thành công!',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return true;
    } catch (error) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: 'Cập nhật biểu mẫu thất bại! ',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return false;
    }
  };
};

export const onDeleteCartForm = (id?: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        id: id,
      };
      const res = await API.delete(API_ENDPOINTS.configuration_management.cart);
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: 'Xóa biểu mẫu thành công!',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: 'Xóa biểu mẫu thất bại!',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return false;
    }
  };
};

export const onExportCartForm = async (id: string) => {
  try {
    const reqParams = {
      id: id,
    };
    const res = await API.post(
      API_ENDPOINTS.configuration_management.cart_form_export,
      reqParams,
      {
        responseType: 'blob',
      },
    );
    return res;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const onCategoryData = async () => {
  try {
    const res = await API.get(API_ENDPOINTS.configuration_management.category);
    return res?.data?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
