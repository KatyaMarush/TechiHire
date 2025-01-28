import { createTheme } from '@mui/material/styles';

const primaryColor = '#0066ff'; // Vibrant blue
const secondaryColor = '#ff6600'; // Vibrant orange
const backgroundColor = '#ffffff'; // White
const textPrimaryColor = '#333333'; // Dark grey text

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    background: {
      default: backgroundColor,
      paper: '#f8f9fa', // Light grey for cards or paper surfaces
    },
    text: {
      primary: textPrimaryColor,
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontSize: '1rem',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 20px',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#0052cc', // Darker shade of primary color
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: '#e65100', // Darker shade of secondary color
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '40px 20px',
        },
      },
    },
  },
});

export default theme;
