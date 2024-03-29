import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const Property = asyncComponent(
  () => import('../../modules/configManagement/Property'),
  {
    ssr: false,
  },
);
export default AppPage(() => <Property />);
