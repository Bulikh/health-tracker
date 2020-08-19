import { SIGNUP, LOGIN, LOGOUT } from "../actionCreators/auth";

export const signup = user => {
  return {
    type: SIGNUP,
    payload: user,
  };
};

export const login = user => {
  return {
    type: LOGIN,
    payload: user,
  };
};

export const logout = user => {
  return {
    type: LOGOUT,
    payload: user,
  };
};
