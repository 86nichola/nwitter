const GET_AUTH = "nwitter/GET_AUTH";
const GET_AUTH_SUCCESS = "nwitter/GET_AUTH_SUCCESS";
const GET_AUTH_ERROR = "nwitter/GET_AUTH_ERROR";

/* thunk */
export const getAuth = () => async (dispatch) => {
  // request
  dispatch({ type: GET_AUTH });
  try {
    //success
    const userObj = await nweetApi.getAuthChange();
    dispatch({ type: GET_AUTH_SUCCESS, userObj });
  } catch (e) {
    //error
    dispatch({ type: GET_AUTH_ERROR, error: e });
  }
};

/* 초기상태선언 */
const initialState = {
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
        userObj: action.userObj,
      };
    case GET_AUTH_SUCCESS:
      return { ...state, nweets: { data: true, error: null } };
    case GET_AUTH_ERROR:
      return { ...state, nweets: { data: false, error: action.error } };
    default:
      return state;
  }
}
