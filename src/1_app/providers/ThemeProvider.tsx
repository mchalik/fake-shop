import { type FC, type PropsWithChildren } from 'react';

import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#797FEA'
      }
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontSize: '1rem' // Set the default font size for all TableCell components
          }
        }
      }
    },
    typography: {
      fontFamily: [
        'Google Sans Flex',
        'Roboto',
        'BlinkMacSystemFont',
        'sans-serif'
      ].join(',')
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  );

};