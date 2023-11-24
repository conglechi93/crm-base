import {API_ENDPOINTS} from 'services/apiUrl';
import API from 'api/Request';
import { GET_SHOP_INFO } from 'types';

export const onGetShopDetail = (shopId: string) => {
  return async (dispatch: any) => {
    try {
      const res = await API.get(API_ENDPOINTS.shops.get_shop.replace(
        '{shopId}', shopId
      ));
      if (res?.data) {
        dispatch({
          type: GET_SHOP_INFO,
          payload: res?.data,
        })
      }
      return res?.data;
    } catch (error) {
      console.log('error', error);
      dispatch({
        type: GET_SHOP_INFO,
        payload: null,
      })
      return false;
    }
  };
};