import {API_ENDPOINTS} from 'services/apiUrl';
import axiosService from 'services/axiosServices';
import {OPEN_TOAST} from 'types';

export const onGetCartFormList = async (payload?: any) => {
  try {
    const reqParams = {
      ...payload,
    };
    const res = await axiosService.getAll(
      reqParams,
      API_ENDPOINTS.configuration_management.cart,
    );
    return res?.data?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const onGetCartFormById = async (payload: string) => {
  try {
    const res = await axiosService.getById(
      payload,
      API_ENDPOINTS.configuration_management.cart,
    );
    return res?.data?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const onCreateCartForm = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        ...payload,
      };
      await axiosService.post(
        reqParams,
        API_ENDPOINTS.configuration_management.cart,
      );
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
      await axiosService.update(
        reqParams,
        API_ENDPOINTS.configuration_management.cart,
      );
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
      const res = await axiosService.delete(
        reqParams,
        API_ENDPOINTS.configuration_management.cart,
      );
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
    const res = await axiosService.post(
      reqParams,
      API_ENDPOINTS.configuration_management.cart_form_export,
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
    const res = await axiosService.getAll(
      {},
      API_ENDPOINTS.configuration_management.category,
    );
    return res?.data?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
