import { AppBar, CircularProgress, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { lazy, Suspense, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle, ArrowBack } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { removeToken } from '../../apis/auth';
import { useHistory, Switch, Route, useRouteMatch } from 'react-router';


// Using lazy load for components

// import FamilyUserView from '../familyUser';
// import MainView from './mainView';
// import FamilyUserDetailView from '../familyUserDetail';

const FamilyUserView = lazy(() => import('../familyUser'));
const MainView = lazy(() => import('./mainView'));
const FamilyUserDetailView = lazy(() => import('../familyUserDetail'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  rightButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    marginTop: '1rem'
  }
}));

function HomeView() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const authState = useSelector(state => state.auth);
  const payload = authState?.data?.payload;
  const status = authState?.data?.status;
  
  const { path } = useRouteMatch();
  const history = useHistory();
  // const location = useLocation();
  // const { from } = location.state || { from: { pathname: "/login" } };
  const getUsername = () => {
    if (payload) {
      return payload.firstName + ' ' + payload.lastName;
    }
    return 'Unknown';
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    removeToken();
    history.push('/login');
    window.location.reload(false);
  };

  useEffect(() => {
    console.log('HomeView init');
    // console.log('status', status)
    if (status && status !== 'successful') {
      history.push('/login');
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const goBack = function () {
    history.goBack(-1);
  };

  return (
    <main className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            className={classes.menuButton}
            onClick={goBack}
          >
            <ArrowBack />
          </IconButton>
          <Typography className={classes.title} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sagely Support
          </Typography>
          <div className={classes.rightButton}>
            <Typography>
              {getUsername()}
            </Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogOut}>LOGOUT</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" className={classes.container}>
        <Suspense fallback={<CircularProgress/>}>
          <Switch>
            <Route path={`${path}/familyUsers/:familyUserId`} component={FamilyUserDetailView} />
            <Route path={`${path}/familyUsers`} component={FamilyUserView} />
            <Route path={path} exact component={MainView} />
          </Switch>
        </Suspense>
      </Container>
    </main>
  )
}

export default HomeView;