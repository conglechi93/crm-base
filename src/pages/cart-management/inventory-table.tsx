import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const InventoryTable = asyncComponent(
  () => import('../../modules/cartManagement/InventoryTable'),
);
export default AppPage(() => <InventoryTable />);
