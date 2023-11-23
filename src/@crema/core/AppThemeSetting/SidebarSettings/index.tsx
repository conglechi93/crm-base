import React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import CheckIcon from '@mui/icons-material/Check';
import {CustomizerItemWrapper} from '../index.style';
import {
  useSidebarActionsContext,
  useSidebarContext,
} from '../../../utility/AppContextProvider/SidebarContextProvider';
import NavMenuStyle from './NavMenuStyle';
import MenuColorCell from './MenuColorCell';
import AppGrid from '../../AppGrid';

const SidebarSettings = () => {
  const {sidebarBgImage, isSidebarBgImage} = useSidebarContext();

  const {updateSidebarBgImage, setSidebarBgImage} = useSidebarActionsContext();

  const onToggleSidebarImage = () => {
    setSidebarBgImage(!isSidebarBgImage);
  };

  return (
    <CustomizerItemWrapper>
      <NavMenuStyle />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2.5,
        }}
      >
        <Box component='h4'>Sidebar Images</Box>
        <Box component='span' sx={{ml: 'auto'}}>
          <Switch
            className='customize-switch'
            checked={isSidebarBgImage}
            onChange={onToggleSidebarImage}
            value='checkedA'
          />
        </Box>
      </Box>
    </CustomizerItemWrapper>
  );
};

export default SidebarSettings;
