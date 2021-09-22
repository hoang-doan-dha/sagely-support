import { call, put, takeLatest } from 'redux-saga/effects';
import { activateFamilyUser, updateFamilyUser } from '../../../apis/apis';
import { activateFamilyUserError, activateFamilyUserSuccess, updateFamilyUserError, updateFamilyUserSuccess } from './familyUserDetailAction';
import { FAMILY_USER_DETAIL } from './familyUserDetailConstant';


function* handleUpdate(action) {
  const { response, error } = yield call(updateFamilyUser, action.payload);
  if (response) {
    yield put(updateFamilyUserSuccess(response.data));
  } else if (error) {
    yield put(updateFamilyUserError(error));
  }
}

function* handleActivate(action) {
  const { response, error } = yield call(activateFamilyUser, action.payload);
  if (response) {
    yield put(activateFamilyUserSuccess(response.data));
  } else if (error) {
    yield put(activateFamilyUserError(error));
  }
}

// watchers
function* familyUserDetailSaga() {
  yield takeLatest(FAMILY_USER_DETAIL.UPDATE_FAMILY_USER_REQUEST, handleUpdate);
  yield takeLatest(FAMILY_USER_DETAIL.ACTIVATE_FAMILY_USER_REQUEST, handleActivate);
}

export default familyUserDetailSaga;
