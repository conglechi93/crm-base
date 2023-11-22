import axiosService from 'services/axiosServices';
import {API_ENDPOINTS} from 'services/apiUrl';
import {OPEN_TOAST} from 'types';

export const onGetPickList = async (payload?: any) => {
  try {
    const reqParams = {
      page: payload.page,
      pageSize: payload.pageSize,
      search: payload.search,
    };
    const res = await axiosService.getAll(
      reqParams,
      API_ENDPOINTS.pick_lists.get_pick_lists,
    );
    return res?.data?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const onGetPickListById = async (id: string) => {
  try {
    const res = await axiosService.getById(
      id,
      API_ENDPOINTS.pick_lists.get_pick_list_by_id,
    );
    return res?.data?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const onCreatePickList = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        ...payload,
      };
      await axiosService.post(
        reqParams,
        API_ENDPOINTS.pick_lists.create_pick_list,
      );
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: 'Tạo dữ liệu DS thành công!',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return true;
    } catch (error) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: 'Tạo dữ liệu DS thất bại!',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return false;
    }
  };
};

export const onUpdatePickList = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        ...payload,
      };
      await axiosService.update(
        reqParams,
        API_ENDPOINTS.pick_lists.update_pick_list,
      );
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: 'Cập nhật dữ liệu DS thành công!',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return true;
    } catch (error) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: 'Cập nhật dữ liệu DS thất bại!',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return false;
    }
  };
};

export const onDeletePickList = (id: string) => {
  return async (dispatch: any) => {
    try {
      await axiosService.delete(
        {},
        API_ENDPOINTS.pick_lists.delete_pick_list.replace('{pickListId}', id),
      );
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: 'Xóa dữ liệu DS thành công!',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return true;
    } catch (error) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: 'Xóa dữ liệu DS thất bại!',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return false;
    }
  };
};
