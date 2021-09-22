import { FAMILY_USER } from "./familyUserConstant";

const getFamilyUserListRequest = () => ({
  type: FAMILY_USER.GET_LIST_REQUEST
});

const getFamilyUserListSuccess = (payload) => ({
  type: FAMILY_USER.GET_LIST_SUCCESS,
  payload
});

const getFamilyUserListError = (payload) => ({
  type: FAMILY_USER.GET_LIST_FAILURE,
  payload
});

export { getFamilyUserListRequest, getFamilyUserListSuccess, getFamilyUserListError };