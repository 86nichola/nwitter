const SET_AUTH = "auth/SET_AUTH";
const OFF_AUTH = "auth/OFF_AUTH";

export const setAuth = (user) => ({
  type: SET_AUTH,
  uid: user.uid,
  displayName: user.displayName,
  updateProfile: (args) => user.updateProfile(args),
});

export const offAuth = () => ({
  type: OFF_AUTH,
});

/* 초기상태선언 */
const initialState = {
  init: false,
  userObj: {
    uid: null, //user.uid,
    displayName: null, //user.displayName,
    updateProfile: null, //(args) => user.updateProfile(args),
  },
};

/* 리듀서 만들기*/
export default function auth(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        init: true,
        userObj: {
          uid: action.uid,
          displayName: action.displayName,
          updateProfile: action.updateProfile,
        },
      };
    case OFF_AUTH:
      return {
        ...state,
        init: false,
      };
    default:
      return state;
  }
}
