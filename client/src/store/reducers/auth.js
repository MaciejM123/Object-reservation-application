import * as actionTypes from '@actionTypes';

const initialState = {
  user: null,
};

const auth = (state, action) => {
  return {
    ...state,
    user: action.user,
  };
};

const logout = state => {
  return {
    ...state,
    user: null,
  };
};

const loadUser = (state, action) => {
  return {
    ...state,
    user: action.user,
  };
};

const checkUsosUserSuccess = (state, action) => {
  return {
    ...state,
    user: action.user,
  };
};

const checkUserFail = state => {
  return {
    ...state,
    user: null,
  };
};

const updateAuthUser = (state, action) => {
  return {
    ...state,
    user: action.user,
  };
};

const fetchListReservationUser = (state, action) => {
  return {
    ...state,
    reservation: action.reservation,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return auth(state, action);
    case actionTypes.AUTH_LOGOUT:
      return logout(state, action);
    case actionTypes.LOAD_USER:
      return loadUser(state, action);
    case actionTypes.CHECK_USOS_USER_SUCCESS:
      return checkUsosUserSuccess(state, action);
    case actionTypes.CHECK_USER_FAIL:
      return checkUserFail(state, action);
    case actionTypes.CHANGE_AUTH_USER:
      return updateAuthUser(state, action);
    case actionTypes.FETCH_LIST_RESERVATION_USER:
      return fetchListReservationUser(state, action);
    default:
      return state;
  }
};

export default reducer;
