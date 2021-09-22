import { USER } from "./loginConstant";

const loginRequest = ({payload}) => ({
  type: USER.LOGIN_REQUEST,
  payload
});

const loginSuccess = (payload) => ({
  type: USER.LOGIN_SUCCESS,
  payload
});

const loginError = (payload) => ({
  type: USER.LOGIN_FAILURE,
  payload
});

export { loginRequest, loginSuccess, loginError };