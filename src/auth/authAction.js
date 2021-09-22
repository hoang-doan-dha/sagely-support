import { AUTH } from "./authConstant";

const validateRequest = (payload) => ({
  type: AUTH.VALIDATE_REQUEST,
  payload
});

const validateSuccess = (payload) => ({
  type: AUTH.VALIDATE_SUCCESS,
  payload
});

const validateError = (payload) => ({
  type: AUTH.VALIDATE_FAILURE,
  payload
});

export { validateRequest, validateSuccess, validateError };