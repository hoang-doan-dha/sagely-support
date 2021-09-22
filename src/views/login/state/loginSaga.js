import { call, put, takeLatest } from 'redux-saga/effects';
import { USER } from './loginConstant';
import { login } from '../../../apis/auth';
import { loginError, loginSuccess } from './loginAction';


function* handleLogin(action) {
  const { response, error } = yield call(login, action.payload);
  if (response) {
    yield put(loginSuccess(response.data));
  } else if (error) {
    yield put(loginError(error));
  }
}

// function handleLoginSuccess(action) {
//   const { token } = { ...action.payload };
//   if (token) {
//     setup(token);
//   }
// }

// watchers
function* loginSaga() {
  yield takeLatest(USER.LOGIN_REQUEST, handleLogin);
  // yield takeLatest(USER.LOGIN_SUCCESS, handleLoginSuccess);

}

export default loginSaga;
