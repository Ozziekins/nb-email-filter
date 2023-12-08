import React from 'react';
import { Box } from '@mui/material';

const EmailFilterIcon = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
      <img src="/img/filter.png" alt="Email Filtering" style={{ width: '50px', height: '50px' }} />
    </Box>
  );
};

export default EmailFilterIcon;
