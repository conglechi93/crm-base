import {API_ENDPOINTS} from 'services/apiUrl';
import {OPEN_TOAST} from 'types';
import API from 'api/Request';

export const onGetPickList = async (payload?: any) => {
  try {
    const reqParams = {
      page: payload.page,
      pageSize: payload.pageSize,
      search: payload.search,
    };
    const res = await API.get(API_ENDPOINTS.pick_lists.get_pick_lists, {
      params: reqParams,
    });
    return res?.data?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const onGetPickListById = async (id: string) => {
  try {
    const res = await API.get(API_ENDPOINTS.pick_lists.get_pick_list_by_id, {
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

export const onCreatePickList = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        ...payload,
      };
      await API.post(API_ENDPOINTS.pick_lists.create_pick_list, reqParams);
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
      await API.patch(API_ENDPOINTS.pick_lists.update_pick_list, reqParams);
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
      await API.delete(
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
