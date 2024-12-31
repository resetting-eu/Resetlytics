import * as React from 'react';

import MuiLink from '@mui/material/Link';

import { Stack, Divider, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Stack sx={{ padding: 2 }} spacing={2}>
      <Divider />
      <Typography
        variant="body2"
        align="center"
        sx={{
          color: 'text.secondary',
        }}
      >
        {'Copyright © '}
        <MuiLink color="inherit" href="https://resetlytics.eu/">
          RESETTING / RESETLYTICS
        </MuiLink>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </Stack>
  );
}