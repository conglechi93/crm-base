import React from 'react';
import Box from '@mui/material/Box';
import IntlMessages from '../../../../utility/IntlMessages';
import {
  useSidebarActionsContext,
  useSidebarContext,
} from '../../../../utility/AppContextProvider/SidebarContextProvider';
import AppSelectedIcon from '../../../AppSelectedIcon';

const NavMenuStyle = () => {
  const {menuStyle} = useSidebarContext();

  const {updateMenuStyle} = useSidebarActionsContext();
  const onMenuStyleChange = (menuStyle: string) => {
    updateMenuStyle(menuStyle);
  };

  return (
    <>
      <Box component='h4' sx={{mb: 3}}>
        <IntlMessages id='customizer.sidebarMenuStyle' />
      </Box>
    </>
  );
};

export default NavMenuStyle;
