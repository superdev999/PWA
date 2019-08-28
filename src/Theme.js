import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      light: '#4a82bc',
      main: '#00568c',
      dark: '#002e5e',
    },
    secondary: {
      light: '#68d97d',
      main: '#30a74f',
      dark: '#007723',
    },
    error: {
        light: '#f20b0b',
        main: '#f20b0b',
        dark: '#f20b0b',
    },
    process: '#fcab51',
    placeholder: '#707070',
    disabled: '#c7c7c7',
    textfield_bg: '#ebebeb',
    bg: 'f8f8f8',
    black: '#0f0f0f',
    white: '#ffffff',
  },
  typography: {
    useNextVariants: true,
  },
});