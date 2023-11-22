import {EToastType} from 'components/molecules/AppToast/interface';
import {CLEAN_APP_STATE, OPEN_TOAST} from 'types';

export type InitialStateType = {
  toastProps: {
    type:
      | EToastType.ERROR
      | EToastType.INFO
      | EToastType.SUCCESS
      | EToastType.WARNING
      | '';
    message?: string;
    description?: string;
  };
};

const initialState: InitialStateType = {
  toastProps: {
    type: '',
    message: '',
    description: '',
  },
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case OPEN_TOAST: {
      return {
        toastProps: action.payload,
      };
    }
    case CLEAN_APP_STATE:
      return initialState;
    default:
      return state;
  }
};
export default appReducer;
