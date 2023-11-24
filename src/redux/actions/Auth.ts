import API from 'api/Request';
import {
  GET_PROFILE,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  OPEN_TOAST,
  SET_TOKEN_FAILED,
  SET_TOKEN_SUCCESS,
} from '../types';
import {API_ENDPOINTS} from 'services/apiUrl';
import {CodeChallengePayload, LoginPayload} from 'models/auth';

export const onLogin = (loginPayload: LoginPayload) => {
  return async (dispatch: any) => {
    dispatch({
      type: LOGIN,
    });
    try {
      const reqParams = {
        ...loginPayload,
        clientId: process.env.REACT_APP_SSO_CLIENT_ID,
        clientSecret: process.env.REACT_APP_SSO_CLIENT_SECRET,
      };
      const res = await API.post(API_ENDPOINTS.auth.login, {
        reqParams,
      });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res?.data?.data,
      });
      return res?.data?.data;
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
      });
      console.log('error', error);
    }
  };
};

export const onGetUserInfo = () => {
  return async (dispatch: any) => {
    dispatch({
      type: GET_PROFILE,
    });
    try {
      const res = await API.get(API_ENDPOINTS.user.profile);
      dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: res?.data?.data,
      });
      return res?.data?.data;
    } catch (error) {
      dispatch({
        type: GET_PROFILE_FAIL,
        payload: null,
      });
      dispatch({
        type: LOGIN_FAILED,
      });
      console.log('error', error);
    }
  };
};

export const onSetAccessToken = (
  codeChallengePayload: CodeChallengePayload,
) => {
  return async (dispatch: any) => {
    const reqParams = {
      ...codeChallengePayload,
      appCode: process.env.REACT_APP_SSO_APP_CODE,
      clientId: process.env.REACT_APP_SSO_CLIENT_ID,
      clientSecret: process.env.REACT_APP_SSO_CLIENT_SECRET,
    };
    try {
      const res = await API.post(API_ENDPOINTS.auth.code_challenge, reqParams);
      const accessToken: string | null = res?.data?.data?.accessToken;
      const refreshToken: string | null = res?.data?.data?.refreshToken;
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
      dispatch({
        type: SET_TOKEN_SUCCESS,
        payload: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      console.log('error', error);
      dispatch({
        type: SET_TOKEN_FAILED,
      });
    }
  };
};

export const onCheckPassword = (password: any) => {
  return async (dispatch: any) => {
    const reqParams = {
      password: password,
    };
    try {
      await API.post(API_ENDPOINTS.auth.check_password, reqParams);
      return true;
    } catch (error) {
      console.log('error', error);
      let toastProps = {
        message: 'Thông báo',
        description: 'Mật khẩu không đúng',
        type: 'error',
      };
      dispatch({
        type: OPEN_TOAST,
        payload: toastProps,
      });
      return false;
    }
  };
};

export const onGetListProfile = () => {
  return async (dispatch: any) => {
    try {
      const res = await API.get(API_ENDPOINTS.user.list_profile);
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
    }
  };
};
