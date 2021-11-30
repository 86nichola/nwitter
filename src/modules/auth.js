import * as nweetApi from "../api/nweetsApi";

const GET_AUTH = "nwitter/GET_AUTH";
const GET_AUTH_SUCCESS = "nwitter/GET_AUTH_SUCCESS";
const GET_AUTH_ERROR = "nwitter/GET_AUTH_ERROR";

// /* thunk */
// export const getAuth = () => async (dispatch) => {
//   // request
//   dispatch({ type: GET_AUTH });
//   try {
//     //success
//     dispatch({ type: GET_AUTH_SUCCESS, userObj, init });
//   } catch (e) {
//     //error
//     dispatch({ type: GET_AUTH_ERROR, error: e, init });
//   }
// };

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
    case GET_AUTH:
      return {
        ...state,
      };
    case GET_AUTH_SUCCESS:
      return { ...state, userObj: action.userObj, init: action.init };
    case GET_AUTH_ERROR:
      return { ...state, userObj: action.userObj, init: action.init };
    default:
      return state;
  }
}
