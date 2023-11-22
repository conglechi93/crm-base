import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const OpenShop = asyncComponent(
  () => import('../../modules/shopManagement/OpenShop'),
);
export default AppPage(() => <OpenShop />);
