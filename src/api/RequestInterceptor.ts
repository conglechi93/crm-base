import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from 'axios';
import React, {useEffect, useState} from 'react';
import {useDispatch, useStore} from 'react-redux';
import {CLEAN_STATE} from 'shared/constants/ActionTypes';
import {axiosInstance} from './Request';
// import {ssoClient} from 'redux/actions/Auth';
// import { appNavigate } from "utils/AppNavigate";
// import { defaultAdminUrl } from "shared/constants/AppConst";
const cancelTokens: {[k: string]: CancelTokenSource | null} = {};
let cancelTokensIndex = 'DEFAULT';

/**
 * Flag trang thai co dang chay refresh token hay khong
 */
let isRefreshing = false;

/**
 * Queue luu lai nhung request bi loi 401 de thuc hien xu ly sau khi refresh new token
 */
let failedQueue: any = [];

export class AxiosRequestCancleToken {
  static cancel(key: string = 'DEFAULT') {
    cancelTokens?.[key]?.cancel();
  }

  static setIndex(key: string = 'DEFAULT') {
    cancelTokensIndex = key;
  }

  static getToken() {
    if (!cancelTokens[cancelTokensIndex]) this.generate(cancelTokensIndex);
    return cancelTokens?.[cancelTokensIndex]?.token;
  }

  static generate(key: string = 'DEFAULT') {
    const source = axios.CancelToken.source();
    cancelTokens[key || 'DEFAULT'] = source;
    this.setIndex(key);
  }
}

const useRequestInterceptor = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const apiRequestInterceptor = (config: AxiosRequestConfig) => {
      // const {accessToken} = store.getState().auth;
      // if (accessToken) {
      //   config.headers['Authorization'] = `Bearer ${accessToken}`;
      // }
      const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJhcHAiOiIzdG9FRkRBaEs2IiwiYyI6MCwidHlwIjoiQmVhcmVyIiwiXyt2Ijp7Im9iamVjdElkIjoiRllwTUo3VWdaTSIsImNyZWF0ZWRBdCI6MTY3MDgzOTg5MDY4OCwidXBkYXRlZEF0IjoxNzAwNzA4NzMyMDExLCJpZCI6IjFmM2ZhZDY0LTczYmQtNDdiYS04MDliLThlZmFiMzg2YWY5YyIsInVzZXJuYW1lIjoiKzg0Mzk2MzkzNDgzIiwiZW1haWwiOm51bGwsInNlc3Npb25Ub2tlbiI6InI6XzMzOGU3MmY0ZDMzYjQ1OWFiM2U4N2NmZDkxYzNmOTlmIiwicmVmcmVzaFRva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGNIQWlPaUl6ZEc5RlJrUkJhRXMySWl3aWRIbHdJam9pVW1WbWNtVnphQ0lzSW5OMVlpSTZJbUpTVW5sdFpETkJXWGdpTENKaGRXUWlPaUkyTURCalpUVmhNbVprWkRRME9XSTRZVGt5T1dOaU1qWmhNakV3TXpKa1pDSXNJbWxoZENJNk1UY3dNRGd3TWpBNE9Dd2laWGh3SWpveE56QXhNRFl4TWpnNGZRLlBDaEQ1NEVjYlQ4VDVaUGdsWWdfaUI4MTZSY1gzMWtzS1VqZE5raE5WRHRHZlJWTnA3Y0lPM255dXRPVGdMQTNWUnhUNEVmV3E0Zkw5T0pTMUJWQzdRIiwib3RoZXJzIjp7InBob25lIjoiKzg0Mzk2MzkzNDgzIiwiaXNFbnRlcnByaXNlIjowLCJpc0ZpcnN0U2V0UGFzc3dvcmQiOjB9LCJyb2xlcyI6W10sInBlcm1pc3Npb25zIjpbXSwiYXBwbGljYXRpb24iOnsib2JqZWN0SWQiOiIzdG9FRkRBaEs2IiwiY3JlYXRlZEF0IjoxNjY2ODYwMTM1MTU2LCJ1cGRhdGVkQXQiOjE2ODk1NzYyODQwOTQsIm5hbWUiOiJWQVJTIE5FV1MiLCJjb2RlIjoiVkFSU19ORVdTIiwiY2xpZW50cyI6bnVsbCwic3RhdHVzIjoxfSwicmVnaXN0ZXJEYXRlIjpudWxsfSwic3ViIjoiRllwTUo3VWdaTSIsImF1ZCI6IjYwMGNlNWEyZmRkNDQ5YjhhOTI5Y2IyNmEyMTAzMmRkIiwiaWF0IjoxNzAwODAyMDg4LCJleHAiOjE3MDA4ODg0ODh9.kKn2YDhao_F-ZRehkXiex311LLoFtCAu5zFNyXaZ0X87mFAAOGcbcB77NXDnP6fVgsFVkpozIPbxZhorbdd1tQ'
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      config.cancelToken = AxiosRequestCancleToken.getToken();
      AxiosRequestCancleToken.setIndex();
      return config;
    };

    const apiSuccessResponseInterceptor = (
      response: AxiosResponse,
    ): AxiosResponse['data'] => {
      return response;
    };

    const apiFailureResponseInterceptor = async (error: any) => {
      const {response = {}} = error;
      const {data, status} = response;
      const originalRequest = error.config;
      if (status === 401 && !originalRequest._retry) {
        dispatch({type: CLEAN_STATE});
      }
      const message = data ? data.error || data.message : '';
      return Promise.reject({...error, message});
    };

    const reqInterceptor = axiosInstance.interceptors.request.use(
      apiRequestInterceptor,
    );
    const resInterceptor = axiosInstance.interceptors.response.use(
      apiSuccessResponseInterceptor,
      apiFailureResponseInterceptor,
    );
    setReady(true);
    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, []);

  return ready;
};

const RequestInterceptor = ({children}: React.PropsWithChildren<any>) => {
  const initialized = useRequestInterceptor();
  if (initialized) return children;
  else return null;
};

export {useRequestInterceptor, RequestInterceptor};
