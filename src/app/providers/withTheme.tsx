import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { green, lightGreen } from '@mui/material/colors';
import React, { Suspense } from 'react';
import { HOC } from './composeHOCS';
// export const themeOptions: ThemeOptions = {
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#558b2f',
//       contrastText: '#f1f8e9',
//     },
//     secondary: {
//       main: '#c38f51',
//       contrastText: '#ffffff',
//     },
//     text: {
//       secondary: '#558b2f',
//       primary: '#33691e',
//     },
//     background: {
//       default: '#c5e1a5',
//       paper: '#dcedc8',
//     },
//     error: {
//       main: '#f44336',
//     },
//     success: {
//       main: '#64f9e0',
//     },
//   },
// }

export const themeOptions2 = createTheme({
  typography: {
    fontFamily: 'Lato',
    fontSize: 15,
    fontWeightLight: 300,
    h1: {
      fontWeight: 400,
    },
    subtitle1: {
      fontWeight: 500,
      fontFamily: 'Roboto',
    },
    h5: {
      fontSize: '1.9rem',
    },
    h6: {
      fontSize: '1.6rem',
    },
    subtitle2: {
      fontFamily: 'Roboto',
    },
    body1: {
      fontFamily: 'Roboto',
      fontWeight: 500,
      fontSize: '1.2rem',
    },
    body2: {
      fontFamily: 'Roboto',
      fontWeight: 500,
      fontSize: '1rem',
    },
    button: {
      fontFamily: 'Open Sans',
      fontWeight: 500,
    },
    caption: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    overline: {
      fontSize: '1.6rem',
      fontFamily: 'Roboto',
      fontWeight: 400,
    },
  },
  palette: {
    primary: {
      main: '#1565c0',
    },
    background: {
      default: '#e3f2fd',
      paper: '#bbdefb',
    },
    secondary: {
      main: '#c07015',
    },
    warning: {
      main: '#ffff8d',
    },
  },
  shape: {
    borderRadius: 4,
  },
})

export const withTheme: HOC<{}> = (WrappedComponent) => {

  return (props) => (

    <ThemeProvider theme={themeOptions2}>
      <CssBaseline />

      <WrappedComponent />
    </ThemeProvider>
  )
}