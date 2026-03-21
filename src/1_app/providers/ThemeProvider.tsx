import { FC, PropsWithChildren } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#797FEA'
      }
    },
    typography: {
      fontFamily: [
        'Google Sans Flex',
        'Roboto',
        'BlinkMacSystemFont',
        'sans-serif'
      ].join(','),
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  );

};