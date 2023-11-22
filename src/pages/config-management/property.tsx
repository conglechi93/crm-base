import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const Property = asyncComponent(
  () => import('../../modules/configManagement/Property'),
);
export default AppPage(() => <Property />);
