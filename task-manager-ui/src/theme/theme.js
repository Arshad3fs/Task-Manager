import { createMuiTheme } from '@material-ui/core/styles';

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#EB984E",
    },
    secondary: {
      main: "#1F618D"// "#5499C7"
    },
    warning: {
      main: "#F4D03F"
    }
  },
  typography: {
    allVariants: {
      fontSize: 14
    }
    
  }
});

export default customTheme;
