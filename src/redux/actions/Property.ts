import {API_ENDPOINTS} from 'services/apiUrl';
import axiosService from 'services/axiosServices';
import {OPEN_TOAST} from 'types';

export const onGetPropertyList = async (payload?: any) => {
  try {
    const reqParams = {
      ...payload,
    };
    const res = await axiosService.getAll(
      reqParams,
      API_ENDPOINTS.property.get_property_list,
    );
    return res?.data?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const onGetPropertyById = async (id?: any) => {
  try {
    const res = await axiosService.getById(
      '/' + id,
      API_ENDPOINTS.property.get_property_by_id,
    );
    return res?.data?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const onCreateProperty = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        shopId: payload.shopId,
        propertyName: payload.propertyName,
        propertyLabel: payload.propertyLabel,
        dataType: {
          id: payload.propertyTypeId,
        },
        pickListId: payload.pickListId,
        enabledNullable: payload.enabledNullable,
        enabledDuplicate: payload.enabledDuplicate,
      };
      const res = await axiosService.post(
        reqParams,
        API_ENDPOINTS.property.create_property,
      );
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: 'Thêm thuộc tính thành công!',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return res?.data?.data;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: `Thêm thuộc tính thất bại!`,
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return false;
    }
  };
};

export const onUpdateProperty = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        shopId: payload.shopId,
        propertyName: payload.propertyName,
        propertyLabel: payload.propertyLabel,
        dataType: {
          id: payload.propertyTypeId,
        },
        pickListId: payload.pickListId,
        enabledNullable: payload.enabledNullable,
        enabledDuplicate: payload.enabledDuplicate,
      };
      const res = await axiosService.update(
        reqParams,
        API_ENDPOINTS.property.update_property,
      );
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: 'Chỉnh sửa thuộc tính thành công!',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: 'Chỉnh sửa thuộc tính thất bại!',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return false;
    }
  };
};

export const onDeleteProperty = (id: string) => {
  return async (dispatch: any) => {
    try {
      const res = await axiosService.delete(
        {},
        API_ENDPOINTS.property.delete_property.replace('{propertyId}', id),
      );
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: 'Xóa thuộc tính thành công!',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return res?.data?.data;
    } catch (error) {
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: 'Xóa thuộc tính thất bại!',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      console.log('error', error);
      return false;
    }
  };
};
