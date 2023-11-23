export const authRole = {
  admin: ['admin'],
  user: ['user', 'admin'],
};

export enum RoutePermittedRole {
  Admin = 'admin',
  User = 'user',
}

export const initialUrl = '/cart-management/cart'; // this url will open after login

export const apiTimeout = 20000;
export const apiHeaders = {
  'Content-Type': 'application/json',
  Accept: '*/*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, *',
  'Accept-Language': 'vi',
  'Content-Security-Policy': 'ALLOWALL',
};

export const pageSize = {
  CART: 10,
  PROPERTY: 8,
  INVENTORY: 10,
};
