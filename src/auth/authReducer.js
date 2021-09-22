import { AUTH } from "./authConstant";

const initialState = {
  loading: false,
  data: null,
  error: ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH.VALIDATE_REQUEST:
      return { ...state, loading: true };
    case AUTH.VALIDATE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case AUTH.VALIDATE_FAILURE:
      return { ...state, loading: false, error: action.payload.message };
    default:
      return state;
  }
}

export { authReducer };