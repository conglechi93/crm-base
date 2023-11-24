import {API_ENDPOINTS} from 'services/apiUrl';
import API from 'api/Request';
import {OPEN_TOAST} from 'types';

export const onGetCartList = async (payload?: any) => {
  try {
    const reqParams = {
      page: payload.page,
      pageSize: payload.pageSize,
      search: payload.search,
    };
    const res = await API.get(API_ENDPOINTS.cart_management.cart, {
      params: reqParams,
    });
    return res?.data?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const onGetInventoryTableList = async (payload?: any) => {
  try {
    const reqParams = {
      page: payload.page,
      pageSize: payload.pageSize,
      cartId: payload.cartId,
    };
    const res = await API.get(API_ENDPOINTS.cart_management.inventory_table, {
      params: reqParams,
    });
    return res?.data?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const onGetInventoryTableById = async (id?: string) => {
  try {
    const res = await API.get(API_ENDPOINTS.cart_management.inventory_table, {
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

export const onCreateInventoryTable = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        cartId: payload.cartId,
        formId: payload.formId,
        inventoryTableName: payload.inventoryTableName,
        estateType: payload.estateTypeId
          ? {
              code: payload.estateTypeId,
            }
          : null,
      };
      await API.post(API_ENDPOINTS.cart_management.inventory_table, reqParams);
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: 'Tạo bảng hàng thành công!',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return true;
    } catch (error) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: 'Tạo bảng hàng thất bại!',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return false;
    }
  };
};

export const onUpdateInventoryTable = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        id: payload.id,
        cartId: payload.cartId,
        formId: payload.formId,
        inventoryTableName: payload.inventoryTableName,
        estateType: payload.estateTypeId
          ? {
              code: payload.estateTypeId,
            }
          : null,
      };
      await API.patch(API_ENDPOINTS.cart_management.inventory_table, reqParams);
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: 'Chỉnh sửa bảng hàng thành công',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return true;
    } catch (error) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: 'Chỉnh sửa bảng hàng thất bại',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return false;
    }
  };
};

export const onGetCartById = async (cardId: string) => {
  try {
    const res = await API.get(API_ENDPOINTS.cart_management.cart, {
      params: {
        id: cardId,
      },
    });
    return res?.data?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const onAddNewCart = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        shopId: payload.shopId || '1',
        cartName: payload.cartName || '',
        description: payload.description || '',
      };
      await API.post(API_ENDPOINTS.cart_management.addCart, reqParams);
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: 'Tạo giỏ hàng thành công',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return true;
    } catch (error) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: 'Tạo giỏ hàng thất bại',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return false;
    }
  };
};

export const onEditCart = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        id: payload.id,
        shopId: payload.shopId || '1',
        cartName: payload.cartName || '',
        description: payload.description || '',
      };
      await API.patch(API_ENDPOINTS.cart_management.addCart, reqParams);
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: 'Chỉnh sửa giỏ hàng thành công',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return true;
    } catch (error) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: 'Chỉnh sửa giỏ hàng thất bại',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return false;
    }
  };
};

export const onDeleteCart = (cartId?: string) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        id: cartId,
      };
      await API.delete(API_ENDPOINTS.cart_management.deleteCart, {
        params: reqParams,
      });
      const toastProps = {
        type: 'success',
        message: 'Xóa giỏ hàng thành công',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return true;
    } catch (error) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Xóa giỏ hàng thất bại',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return false;
    }
  };
};

export const onGetInventoryInitCreate = async (inventoryTableId: string) => {
  try {
    const res = await API.get(
      API_ENDPOINTS.inventory.get_inventory_init_create.replace(
        '{inventoryTableId}',
        inventoryTableId,
      ),
    );
    return res?.data?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const onDeleteInventoryTable = (id: string) => {
  return async (dispatch: any) => {
    const reqParams = {
      id: id,
    };
    try {
      await API.delete(API_ENDPOINTS.cart_management.delete_inventory_table, {
        params: reqParams,
      });
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: 'Xóa Bảng hàng thành công!',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return true;
    } catch (error) {
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: 'Xóa Bảng hàng thất bại!',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      console.log('error', error);
      return false;
    }
  };
};
