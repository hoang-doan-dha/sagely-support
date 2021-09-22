import { FAMILY_USER } from "./familyUserConstant";

const initialState = {
  loading: false,
  data: null,
  error: ''
};

const familyUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAMILY_USER.GET_LIST_REQUEST:
      return { ...state, loading: true };
    case FAMILY_USER.GET_LIST_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FAMILY_USER.GET_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload.message };
    default:
      return state;
  }
};

export { familyUserReducer };