import { call, put, takeLatest } from 'redux-saga/effects';
import { getFamilyUserList } from '../../../apis/apis';
import { getFamilyUserListError, getFamilyUserListSuccess } from './familyUserAction';
import { FAMILY_USER } from './familyUserConstant';


function* handleRequest(action) {
  const { response, error } = yield call(getFamilyUserList);
  if (response) {
    yield put(getFamilyUserListSuccess(response.data));
  } else if (error) {
    yield put(getFamilyUserListError(error));
  }
}


// watchers
function* familyUserSaga() {
  yield takeLatest(FAMILY_USER.GET_LIST_REQUEST, handleRequest);
}

export default familyUserSaga;
