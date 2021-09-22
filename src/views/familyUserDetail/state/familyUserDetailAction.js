import { FAMILY_USER_DETAIL } from "./familyUserDetailConstant";

const updateFamilyUserRequest = (payload) => ({
  type: FAMILY_USER_DETAIL.UPDATE_FAMILY_USER_REQUEST,
  payload
});

const updateFamilyUserSuccess = (payload) => ({
  type: FAMILY_USER_DETAIL.UPDATE_FAMILY_USER_SUCCESS,
  payload
});

const updateFamilyUserError = (payload) => ({
  type: FAMILY_USER_DETAIL.UPDATE_FAMILY_USER_FAILURE,
  payload
});

const activateFamilyUserRequest = (payload) => ({
  type: FAMILY_USER_DETAIL.ACTIVATE_FAMILY_USER_REQUEST,
  payload
});

const activateFamilyUserSuccess = (payload) => ({
  type: FAMILY_USER_DETAIL.ACTIVATE_FAMILY_USER_SUCCESS,
  payload
});

const activateFamilyUserError = (payload) => ({
  type: FAMILY_USER_DETAIL.ACTIVATE_FAMILY_USER_FAILURE,
  payload
});

export { 
  updateFamilyUserRequest, 
  updateFamilyUserSuccess, 
  updateFamilyUserError,
  activateFamilyUserRequest,
  activateFamilyUserSuccess,
  activateFamilyUserError
};
