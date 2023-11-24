import React from 'react';
import Box from '@mui/material/Box';
import {CustomizerItemWrapper} from '../index.style';
import IntlMessages from '../../../utility/IntlMessages';

const LayoutTypes = () => {
  return (
    <CustomizerItemWrapper pb={1}>
      <Box component='h4' sx={{mb: 3}}>
        <IntlMessages id='customizer.layoutTypes' />
      </Box>
    </CustomizerItemWrapper>
  );
};

export default LayoutTypes;
