import { call, put, takeLatest } from "@redux-saga/core/effects";
import { apiValidate, removeToken } from "../apis/auth";
import { validateError, validateSuccess } from "./authAction";
import { AUTH } from "./authConstant";

function* handleValidate(action) {
  const { response, error } = yield call(apiValidate, action.payload);
  if (response) {
    yield put(validateSuccess(response.data));
  } else if (error) {
    removeToken();
    yield put(validateError(error));
  }
}

function* handleValidateSuccess() {}

// watchers
function* authSaga() {
  yield takeLatest(AUTH.VALIDATE_REQUEST, handleValidate);
  yield takeLatest(AUTH.VALIDATE_SUCCESS, handleValidateSuccess);

}

export default authSaga;