import { all } from "@redux-saga/core/effects";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from 'redux-saga';
import { authReducer } from "./auth/authReducer";
import authSaga from "./auth/authSaga";
import { familyUserReducer } from "./views/familyUser/state/familyUserReducer";
import familyUserSaga from "./views/familyUser/state/familyUserSaga";
import { familyUserDetailReducer } from "./views/familyUserDetail/state/familyUserDetailReducer";
import familyUserDetailSaga from "./views/familyUserDetail/state/familyUserDetailSaga";

import { loginReducer } from "./views/login/state/loginReducer";
import loginSaga from "./views/login/state/loginSaga";

const rootReducer = combineReducers({
  login: loginReducer,
  auth: authReducer,
  familyUser: familyUserReducer,
  familyUserDetail: familyUserDetailReducer
});

function* rootSaga() {
  yield all([
    loginSaga(),
    authSaga(),
    familyUserSaga(),
    familyUserDetailSaga()
  ]);
}

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers = process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    : compose(applyMiddleware(sagaMiddleware));

  const store = createStore(
    rootReducer,
    composeEnhancers
  );
  sagaMiddleware.run(rootSaga);

  // store.dispatch(loginRequest({ payload: { email: 'bfd', password: 'ă234' } }))

  return store;
}

export default configureStore;