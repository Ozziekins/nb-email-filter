import React from 'react';
import { Box } from '@mui/material';

const UploadIcon = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
      <img src="/img/upload.png" alt="Upload File" style={{ width: '50px', height: '50px' }} />
    </Box>
  );
};

export default UploadIcon;
