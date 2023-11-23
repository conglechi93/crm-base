// import {useEffect} from 'react';
// import {notification} from 'antd';
// import {EToastType} from './interface';
// import {useDispatch, useSelector} from 'react-redux';
// import {CLEAN_APP_STATE} from 'types';
// import {AiOutlineGithub} from 'react-icons/ai';

// const AppToast = () => {
//   const dispatch = useDispatch();
//   const toastProps = useSelector((state) => state.app.toastProps);
//   useEffect(() => {
//     if (toastProps) {
//       if (Object.keys(toastProps).length > 0) {
//         switch (toastProps.type) {
//           case EToastType.SUCCESS:
//             notification.success({
//               message: toastProps.message,
//               description: toastProps.description ? toastProps.description : '',
//               icon: <AiOutlineGithub />,
//               className: 'bg-success',
//             });
//             dispatch({type: CLEAN_APP_STATE});
//             break;
//           case EToastType.ERROR:
//             notification.error({
//               message: toastProps.message,
//               description: toastProps.description ? toastProps.description : '',
//               icon: <AiOutlineGithub />,
//               className: 'bg-error',
//             });
//             dispatch({type: CLEAN_APP_STATE});
//             break;
//           case EToastType.INFO:
//             notification.info({
//               message: toastProps.message,
//               description: toastProps.description ? toastProps.description : '',
//               icon: <AiOutlineGithub />,
//               className: 'bg-info',
//             });
//             dispatch({type: CLEAN_APP_STATE});
//             break;

//           default:
//             dispatch({type: CLEAN_APP_STATE});
//             break;
//         }
//       }
//     }
//   }, [toastProps]);

//   return <></>;
// };
// export default AppToast;
