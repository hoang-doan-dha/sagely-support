import { LinearProgress } from "@material-ui/core";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import { getToken, setupAuth } from "./apis/auth";
import { validateRequest } from "./auth/authAction";


// import NoMatch from "./views/404/404View";
// import HomeView from './views/home';
// import LoginView from './views/login';
const NoMatch = lazy(() => import("./views/404/404View"));
const HomeView = lazy(() => import("./views/home"));
const LoginView = lazy(() => import("./views/login"));


function AppRouting() {
  const authState = useSelector(state => state.auth);
  const loginState = useSelector(state => state.login);
  const status = authState?.data?.status;
  const { loading } = authState;
  const { loggedIn, data } = loginState;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('AppRouting init')
    const token = getToken() || data?.token;
    if (token) {
      setupAuth(token);
      const payload = {
        facilityHref: "",
        refreshUser: false
      };
      dispatch(validateRequest(payload));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return (
    <Router>
      <Suspense fallback={<LinearProgress color="primary" />}>
          <Switch>
            <Route path='/home'>
              <HomeView/> 
            </Route>
            <Route path='/login'>
              { status !== 'successful' ? <LoginView/> : <Redirect to='/home'/> }
            </Route>
            <Route path='/' exact>
              <Redirect to='/home'/>
            </Route>
            <Route component={NoMatch}/>
          </Switch>
        </Suspense>
    </Router>
  )
}

export default AppRouting;