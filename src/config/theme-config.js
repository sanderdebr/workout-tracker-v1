import { createMuiTheme } from '@material-ui/core/styles';
import lime from '@material-ui/core/colors/lime';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Nanum Gothic',
  },
  palette: {
      primary: {
        main: '#313131'
      },
      secondary: lime
  },
});

export default theme;