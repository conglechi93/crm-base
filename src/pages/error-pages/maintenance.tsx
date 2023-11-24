import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const Maintenance = asyncComponent(
  () => import('../../modules/errorPages/Maintenance'),
  {
    ssr: false,
  },
);
export default AppPage(() => <Maintenance />);
