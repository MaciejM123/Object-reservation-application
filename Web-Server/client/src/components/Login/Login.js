import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './LoginStyles';
import { MENU_ROUTES } from '../../constansts/routes/routes';
import * as authActions from '../../store/actions/index';

const Login = (props) => {
  const classes = useStyles();
  const isLoggedIn = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let userLoggedIn = null;

  if (isLoggedIn) {
    userLoggedIn = <Redirect to={MENU_ROUTES.HOME}></Redirect>;
  }

  const userLoginHandler = () => {
    dispatch(authActions.auth());
    props.history.replace(MENU_ROUTES.HOME);
  };

  const changeHandlerRegister = () => {
    props.history.push(MENU_ROUTES.REGISTER);
  };

  const changeHandlerRememberPassword = () => {
    props.history.push(MENU_ROUTES.REMEMBERPASSWORD);
  };

  return (
    <Fragment>
      {userLoggedIn}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Logowanie
          </Typography>
          <form className={classes.form} Validate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Hasło"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="
                Zapamiętaj mnie"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={userLoginHandler}
            >
              Zaloguj się
            </Button>
            <Grid container justify="flex-end">
              <Link variant="body2" onClick={changeHandlerRegister} href="#">
                Nie posiadasz konta? Zarejestruj się!
              </Link>
              <Grid item>
                <Link
                  onClick={changeHandlerRememberPassword}
                  href="#"
                  variant="body2"
                >
                  Nie pamiętasz hasła? Przypomnij hasło!
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}></Box>
      </Container>
    </Fragment>
  );
};

export default Login;
