import {API_ENDPOINTS} from 'services/apiUrl';
import axiosService from 'services/axiosServices';
import {OPEN_TOAST} from 'types';

export const onGetInventoryByTableId = async (id: string, payload?: any) => {
  try {
    const reqParams = {
      page: payload.page,
      pageSize: payload.pageSize,
      search: payload.search,
    };
    const res = await axiosService.getAll(
      reqParams,
      API_ENDPOINTS.inventory.get_inventories_by_table_id.replace(
        '{tableId}',
        id,
      ),
    );
    return res?.data?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const onDeleteInventory = (id: string) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        id: id,
      };
      await axiosService.delete(
        reqParams,
        API_ENDPOINTS.inventory.delete_inventory,
      );
      const toastProps = {
        type: 'success',
        message: 'Xóa mặt hàng thành công!',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return true;
    } catch (error) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Xóa mặt hàng thất bại!',
      };
      dispatch({type: OPEN_TOAST, payload: toastProps});
      return false;
    }
  };
};

export const onImportExcelForm = (file: any) => {
  return async (dispatch: any) => {
    const formData = new FormData();
    formData.append('upload', file);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    try {
      const res = await axiosService.post(
        formData,
        API_ENDPOINTS.inventory.import_excel_form,
        config,
      );
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};

export const onGetExcelRecordsByKey = (payload: any) => {
  return async (dispatch: any) => {
    const param = {
      id: payload.formId,
      page: payload.page,
      pageSize: payload.pageSize,
      search: payload.search,
      type: payload.type,
    };
    try {
      const res = await axiosService.getAll(
        param,
        API_ENDPOINTS.inventory.get_excel_records_by_key,
      );
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};

export const onGetInventoryDetailById = (inventoryId: string) => {
  return async (dispatch: any) => {
    try {
      const res = await axiosService.getById(
        inventoryId,
        API_ENDPOINTS.inventory.get_inventory_detail,
      );
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};
