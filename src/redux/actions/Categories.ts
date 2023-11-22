import {API_ENDPOINTS} from 'services/apiUrl';
import axiosService from 'services/axiosServices';
import {GET_ALL_APP_PARAMS_FAILED, GET_ALL_APP_PARAMS_SUCCESS} from 'types';

export const onGetEstateTypes = async (payload?: any) => {
  try {
    const reqParams = {
      ...payload,
    };
    const res = await axiosService.getAll(
      reqParams,
      API_ENDPOINTS.category.estate_types,
    );
    return res?.data?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const onGetProvinces = async () => {
  try {
    const res = await axiosService.getAll({}, API_ENDPOINTS.category.provinces);
    return res?.data?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const onGetDistricts = async (provinceId: string): Promise<any> => {
  try {
    const res = await axiosService.getAll(
      {},
      API_ENDPOINTS.category.districts.replace('{provinceId}', provinceId),
    );
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const onGetWards = async (
  provinceId: string,
  districtId: string,
): Promise<any> => {
  try {
    const res = await axiosService.getAll(
      {},
      API_ENDPOINTS.category.wards
        .replace('{provinceId}', provinceId)
        .replace('{districtId}', districtId),
    );
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const onGetInvestor = async (searchObject: any) => {
  try {
    const param = {
      page: searchObject.page,
      pageSize: searchObject.pageSize,
      searchText: searchObject.searchText,
    };
    const res = await axiosService.getAll(
      param,
      API_ENDPOINTS.category.investors,
    );
    return res?.data?.data;
  } catch (error) {
    return false;
  }
};

export const onGetAllAppParams = () => async (dispatch: any) => {
  try {
    const res = await axiosService.getAll(
      {},
      API_ENDPOINTS.category.app_params,
    );
    const {categories, configurations, imageUrls} = res?.data?.data;
    dispatch({
      type: GET_ALL_APP_PARAMS_SUCCESS,
      payload: {categories, configurations, imageUrls},
    });
  } catch (error) {
    // handle error
    dispatch({
      type: GET_ALL_APP_PARAMS_FAILED,
    });
  }
};
