import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, CircularProgress, Card, Typography, CardContent } from '@material-ui/core';
import './style.css';
import { loginRequest } from './state/loginAction';

const useStyles = makeStyles((theme) => ({
  card: {
    color: '#842029',
    backgroundColor: '#f8d7da',
    borderColor: '#f5c2c7'
  },
  wrapper: {
    position: 'relative'
  },
  span: {
    padding: '0 10px'
  },
}));

function LoginView(props) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginState = useSelector(state => state.login);
  const { loading, error, loggedIn } = loginState;

  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/home" } };

  useEffect(() => {
    if (loggedIn) {
      history.replace(from);
    }
    return () => {
      //
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    const payload  = { username, password };
    dispatch(loginRequest({payload}));
  }

  return (
    <div className="login_container">
      <form className="login_form" onSubmit={handleLogin}>
        <div className="login_field">
          <TextField
            id="email"
            label="Email"
            color="primary"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            helperText="Should login by support account"
            placeholder="support+xxxxxxxxx@gosagely.com"
          />
        </div>
        <div className="login_field">
          <TextField
            id="password"
            label="Password"
            type="password"
            color="primary"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {
          error && 
            <Card className={classes.card}>
              <CardContent>
                <Typography>
                {error}
                </Typography>
              </CardContent>
            </Card>
        }
        <div className="login_field">
          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading && <CircularProgress size={24}/>}
              <span className={classes.span}>LOGIN</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginView;