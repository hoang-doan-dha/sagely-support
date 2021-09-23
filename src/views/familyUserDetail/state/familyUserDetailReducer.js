import { FAMILY_USER_DETAIL } from "./familyUserDetailConstant";

const initialState = {
  loading: false,
  data: null,
  error: '',
  isActivated: false
};

const familyUserDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAMILY_USER_DETAIL.UPDATE_FAMILY_USER_REQUEST:
      return { ...state, loading: true };
    case FAMILY_USER_DETAIL.UPDATE_FAMILY_USER_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FAMILY_USER_DETAIL.UPDATE_FAMILY_USER_FAILURE:
      return { ...state, loading: false, error: action.payload.message };
    case FAMILY_USER_DETAIL.ACTIVATE_FAMILY_USER_REQUEST:
      return { ...state, loading: true };
    case FAMILY_USER_DETAIL.ACTIVATE_FAMILY_USER_SUCCESS:
      return { ...state, loading: false, isActivated: true };
    case FAMILY_USER_DETAIL.ACTIVATE_FAMILY_USER_FAILURE:
      return { ...state, loading: false, error: action.payload.message };
    case FAMILY_USER_DETAIL.CLEAR_ACTIVATED_FAMILY_USER:
      return { ...state, loading: false, isActivated: false };
    default:
      return state;
  }
};

export { familyUserDetailReducer };