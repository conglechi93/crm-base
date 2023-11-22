import {CommonActionTypes} from './actions/Common.action';
import {SettingsActionTypes} from './actions/Settings.action';
import {DashboardActionTypes} from './actions/Dashboard.action';
import {EcommerceActionTypes} from './actions/Ecommerce.action';
import {AuthActions} from './actions/Auth.actions';
import {ChatActions} from './actions/Chat.actions';
import {ContactActions} from './actions/Contact.actions';
import {MailActions} from './actions/Mail.action';
import {TaskActions} from './actions/Todo.action';
import {WalltActions} from './actions/Wall.actions';
import {ScrumboardActions} from './actions/Scrumboard.actions';
import {UserListActions} from './actions/UserList.actions';

export type AppActions =
  | CommonActionTypes
  | SettingsActionTypes
  | DashboardActionTypes
  | EcommerceActionTypes
  | AuthActions
  | ChatActions
  | MailActions
  | TaskActions
  | WalltActions
  | ScrumboardActions
  | ContactActions
  | UserListActions;

// AUTH
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const CLEAN_STATE = 'CLEAN_STATE';

export const GET_PROFILE = 'LOGIN';
export const GET_PROFILE_SUCCESS = 'LOGIN_SUCCESS';
export const GET_PROFILE_FAILED = 'LOGIN_FAILED';

export const SET_TOKEN_SUCCESS = 'SET_TOKEN_SUCCESS';
export const SET_TOKEN_FAILED = 'SET_TOKEN_FAILED';

export const OPEN_TOAST = 'OPEN_TOAST';
export const CLEAN_APP_STATE = 'CLEAN_APP_STATE';

// CATEGORY
export const GET_ALL_APP_PARAMS_SUCCESS = 'GET_ALL_APP_PARAMS_SUCCESS';
export const GET_ALL_APP_PARAMS_FAILED = 'GET_ALL_APP_PARAMS_FAILED';

// SHOP
export const GET_SHOP_INFO = 'GET_SHOP_INFO';
