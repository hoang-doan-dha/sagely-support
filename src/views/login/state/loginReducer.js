import { USER } from "./loginConstant"

const initialState = {
  loading: false,
  loggedIn: false,
  data: null,
  error: ''
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER.LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER.LOGIN_SUCCESS:
      return { ...state, loading: false, loggedIn: true, data: action.payload };
    case USER.LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload.message };
    default:
      return state;
  }
}

export { loginReducer };