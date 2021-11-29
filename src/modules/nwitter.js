import * as nweetApi from "../api/nweetsApi";

/* 액션 타입 만들기 */
const NEW = "nwitter/NEW";
const REMOVE = "nwitter/REMOVE";
const REMOVE_SUCCESS = "nwitter/REMOVE_SUCCESS";
const REMOVE_ERROR = "nwitter/REMOVE_ERROR";

const UPDATE = "nwitter/UPDATE";

/* 액션 생성함수 만들기 */
export const addNew = ({ nweet, attachmentUrl, userObj }) => ({
  type: NEW,
  userObj,
  nweet,
  attachmentUrl,
});
export const remove = (nweetObj) => ({ type: REMOVE, nweetObj });
export const update = (newNweet, userObj) => ({
  type: UPDATE,
  userObj,
  newNweet,
});

/* thunk */
export const removeAsync = (nweetObj) => async (dispatch) => {
  // request
  const removeKey = dispatch(remove(nweetObj));
  try {
    //success
    const callDelete = await nweetApi.deleteNweet(removeKey);
    dispatch({ type: REMOVE_SUCCESS });
  } catch (e) {
    //error
    dispatch({ type: REMOVE_ERROR, error: e });
  }
};

export const addNewAsync = (nweet, attachmentUrl, userObj) => (dispatch) => {
  dispatch(addNew({ nweet, attachmentUrl, userObj }));
};

/* 초기상태선언 */
const initialState = {
  userObj: {},
  text: "",
  nweets: {
    error: null,
    data: null,
  },
};

/* 리듀서 만들기*/
export default function nwitter(state = initialState, action) {
  switch (action.type) {
    case NEW:
      return {
        ...state,
        userObj: action.userObj,
        nweet: action.nweet,
        attachmentUrl: action.attachmentUrl,
      };
    case UPDATE:
      return {
        ...state,
        text: action.newNweet,
        userObj: action.userObj,
      };
    case REMOVE:
      return {
        ...state,
        userObj: action.userObj,
      };
    case REMOVE_SUCCESS:
      return { ...state, nweets: { data: true, error: null } };
    case REMOVE_ERROR:
      return { ...state, nweets: { data: false, error: action.error } };
    default:
      return state;
  }
}
