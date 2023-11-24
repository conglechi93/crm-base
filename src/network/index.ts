// import axios, {AxiosResponse} from 'axios';

// import store from 'redux';

// // import { API_ENDPOINTS } from '@/services/apiUrl'
// // import { t } from 'i18next'
// // import { network } from '@/constants/network'

// const ignoredPages = [];
// // const ignoredApiFailed = [{
// //   url: API_ENDPOINTS.config.addRole,
// //   method: network.DELETE
// // }]
// /*
//  Response of request contains fields:
//  - Config
//  - Data
//  - Headers
//  - Request
//  - Status
//  - Status text
// */
// export interface ResponseGenerator {
//   config?: any;
//   data?: any;
//   headers?: any;
//   request?: any;
//   status?: number;
//   statusText?: string;
// }

// export interface ErrorGenerator {
//   message?: any;
//   status?: number;
//   response?: any;
//   error?: any;
// }

// // const BASE_URL = 'http://192.168.1.69:8080'
// const BASE_URL = process.env.BASE_URL;

// /*
//   Function to get base url based on language (micro services)
// */
// const getURL = (server?: string) => {
//   return BASE_URL;
// };

// /*
//   Axios config
// */

// export let instance = axios.create({
//   baseURL: getURL(),
//   timeout: 30000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // const handleShowToast = async (message: string, isSuccess: boolean = false) => {
// //   await store.dispatch(toastActions.openToast({ isSuccess: isSuccess, message: message }))
// // }

// // Request interceptor
// instance.interceptors.request.use(
//   function (config: any) {
//     const access_token = store.getState().auth.accessToken;
//     if (access_token) {
//       config.headers['Authorization'] = `Bearer ${access_token}`;
//     }
//     return config;
//   },
//   function (error: ErrorGenerator) {
//     return Promise.reject(error);
//   },
// );

// // Response interceptor
// instance.interceptors.response.use(
//   function (response: AxiosResponse<ResponseGenerator>) {
//     return response;
//   },
//   async function (error: any) {
//     let customError: ErrorGenerator = {
//       message: error?.message,
//       status: error?.response?.status,
//       error,
//     };

//     // if (customError.status === 401) {
//     //   removeCookie(COOKIES.ACCESS_TOKEN)
//     //   Router.push('/login')
//     // }

//     // if (error.response.status === 404) {
//     //   Router.push('/404')
//     // }

//     return Promise.reject(customError);
//   },
// );
