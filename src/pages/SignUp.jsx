import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import appConfig from '../config/app-config';
import useStyles from '../config/theme-signinup';
import Copyright from '../components/Copyright';

function SignUp(props) {
  const classes = useStyles();

  const initialUser = {id: null, name: '', email: '', password: '', error: null, auth: null}

  const [user, setUser] = useState(initialUser);

  const handleChange = e => {
    const {name, value} = e.target;
    setUser({...user, [name]: value})
  }

  const handleSubmit = e => {
    props.firebase.auth.createUserWithEmailAndPassword(user.email, user.password)
    .then(authUser => {
      setUser(initialUser);
      props.history.push("/dashboard");
    })
    .catch(error => {
      setUser({...user, error: error.message})
    });
  }

  const isValid = user.name === '' || user.email === '' || user.password === '';
  
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <div className={classes.logo}>
            <Avatar className={classes.avatar}>
                <Icon>playlist_add_check</Icon>
            </Avatar>
            <Typography className={classes.logoText}>{appConfig.appTitle}</Typography>
          </div>
          <Typography variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={e => e.preventDefault()}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              value={user.name}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={user.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={user.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Typography className={classes.error}>{user.error ? user.error : ''}</Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
              disabled={isValid}
            >
              Sign up
            </Button>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
                <Link to="/">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default withRouter(SignUp);