import {API_ENDPOINTS} from 'services/apiUrl';
import axiosService from 'services/axiosServices';
import {OPEN_TOAST} from 'types';

export const onGetCartList = async (payload?: any) => {
  try {
    const reqParams = {
      page: payload.page,
      pageSize: payload.pageSize,
      search: payload.search,
    };
    const res = await axiosService.getAll(
      reqParams,
      API_ENDPOINTS.cart_management.cart,
    );
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
    const res = await axiosService.getAll(
      reqParams,
      API_ENDPOINTS.cart_management.inventory_table,
    );
    return res?.data?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const onGetInventoryTableById = async (id?: string) => {
  try {
    const res = await axiosService.getById(
      '/' + id,
      API_ENDPOINTS.cart_management.inventory_table,
    );
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
      await axiosService.post(
        reqParams,
        API_ENDPOINTS.cart_management.inventory_table,
      );
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
      await axiosService.update(
        reqParams,
        API_ENDPOINTS.cart_management.inventory_table,
      );
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
    const res = await axiosService.getById(
      cardId,
      API_ENDPOINTS.cart_management.cart,
    );
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
        // cartName: payload.cartName || '',
        // scale: payload.scale || '',
        // acreage: payload.acreage || '',
        // lowestPrice: payload.lowestPrice || '',
        // highestPrice: payload.highestPrice || '',
        // street: payload.street || '',
        // description: payload.description || '',
        // images: payload.images || [],
        // investor: {
        //   code: payload?.investor?.value ? payload?.investor?.value : '',
        // },
        // legalDoc: {
        //   code: payload?.legalDoc?.value ? payload?.legalDoc?.value : '',
        // },
        // city: {
        //   code: payload?.province?.value ? payload?.province?.value : '',
        // },
        // district: {
        //   code: payload?.district?.value ? payload?.district?.value : '',
        // },
        // ward: {
        //   code: payload?.ward?.value ? payload?.ward?.value : '',
        // },
      };
      await axiosService.post(reqParams, API_ENDPOINTS.cart_management.addCart);
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
      await axiosService.update(
        reqParams,
        API_ENDPOINTS.cart_management.addCart,
      );
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
      await axiosService.delete(
        reqParams,
        API_ENDPOINTS.cart_management.deleteCart,
      );
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
    const res = await axiosService.getAll(
      {},
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
      await axiosService.delete(
        reqParams,
        API_ENDPOINTS.cart_management.delete_inventory_table,
      );
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
