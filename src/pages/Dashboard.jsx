import React from 'react';
import { AuthUserContext } from '../components/Session';
import { withAuthorization } from '../components/Session';
import { withFirebase } from '../components/Firebase';
import { withRouter } from 'react-router-dom';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';

import Calendar from './Calendar';
import Settings from './Settings';
import Sidebar from '../components/Sidebar';
import useStyles from '../config/theme-dashboard';
import Copyright from '../components/Copyright';

function Dashboard(props) {
  let match = useRouteMatch();

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const signOut = () => {
    props.firebase.auth.signOut()
    props.history.push("/");
  }

  return (
    <AuthUserContext.Consumer>
      {
        authUser => authUser ? (
            <div className={classes.root}>
              <CssBaseline />
              <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    Dashboard
                  </Typography>
                  <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                      <Typography component="p" style={{paddingRight: "15px"}}>
                        {authUser.email}
                      </Typography>
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Toolbar>
              </AppBar>
              <Sidebar signOut={signOut} />
              <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                  <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                      <Paper className={fixedHeightPaper}>
                            <Switch>
                              <Route exact path={`${match.url}/`}>
                                <Calendar />
                              </Route> 
                              <Route path={`${match.url}/calendar`}>
                                <Calendar />
                              </Route>
                              <Route path={`${match.url}/settings`}>
                                <Settings />
                              </Route>
                            </Switch>
                      </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}>
                      <Paper className={fixedHeightPaper}>

                      </Paper>
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>

                      </Paper>
                    </Grid>
                  </Grid>
                  <Box pt={4}>
                    <Copyright />
                  </Box>
                </Container>
              </main>
            </div>
         ) : (
            <p>Not authorized.</p>
         )
      }
    </AuthUserContext.Consumer>
  );
};

const condition = authUser => !!authUser;

export default withRouter(withFirebase(withAuthorization(condition)(Dashboard)));