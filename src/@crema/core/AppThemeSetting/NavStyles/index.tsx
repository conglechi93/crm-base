import React from 'react';
import Box from '@mui/material/Box';
import {CustomizerItemWrapper} from '../index.style';
import IntlMessages from '../../../utility/IntlMessages';

const NavStyles = () => {
  return (
    <CustomizerItemWrapper
      sx={{
        pb: 1,
      }}
    >
      <Box component='h4' sx={{mb: 3}}>
        <IntlMessages id='customizer.navigationStyles' />
      </Box>
    </CustomizerItemWrapper>
  );
};

export default NavStyles;
