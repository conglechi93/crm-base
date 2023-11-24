import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const FileImage = asyncComponent(
  () => import('../../modules/configManagement/FileImage'),
  {
    ssr: false,
  },
);
export default AppPage(() => <FileImage />);
