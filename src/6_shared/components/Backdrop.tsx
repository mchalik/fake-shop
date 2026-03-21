import { CircularProgress, Backdrop as BackdropMui } from '@mui/material';

export const Backdrop = () => {
  return (
    <BackdropMui
      open={true}
      sx={{ backgroundColor: '#fff' }}
    >
      <CircularProgress />
    </BackdropMui>
  );
};