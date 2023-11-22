import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const CartForm = asyncComponent(
  () => import('../../modules/configManagement/CartForm'),
);
export default AppPage(() => <CartForm />);
