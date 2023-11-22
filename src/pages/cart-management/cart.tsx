import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const Cart = asyncComponent(() => import('../../modules/cartManagement/Cart'));
export default AppPage(() => <Cart />);
