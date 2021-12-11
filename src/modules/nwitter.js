import * as nweetApi from "../api/nweetsApi";

/* 액션 타입 만들기 */
const NEW = "nwitter/NEW";
const NEW_SUCCESS = "nwitter/NEW_SUCCESS";
const NEW_ERROR = "nwitter/NEW_ERROR";
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
export const removeAsync = (nweetObj) => (dispatch, getState) => {
  try {
    nweetApi.deleteNweet(
      dispatch({
        type: REMOVE,
        id: nweetObj.id,
        attachmentUrl: nweetObj.attachmentUrl,
      })
    );
    //success
    dispatch({ type: REMOVE_SUCCESS });
  } catch (e) {
    //error
    dispatch({ type: REMOVE_ERROR, error: e });
  }
};

export const addNewAsync =
  ({ nweet, attachmentUrl, userObj }) =>
  (dispatch) => {
    try {
      nweetApi.createNweet(dispatch(addNew({ userObj, nweet, attachmentUrl })));
      //success
      dispatch({ type: NEW_SUCCESS });
    } catch (e) {
      //error
      dispatch({ type: NEW_ERROR, error: e });
    }
  };

/* 초기상태선언 */
const initialState = {
  nweetObj: {
    text: "",
    id: "",
    createdAt: null,
    creatorId: "",
    creatorName: "",
    attachmentUrl: "",
  },
};

/* 리듀서 만들기*/
export default function nwitter(state = initialState, action) {
  switch (action.type) {
    case NEW:
      return {
        ...state,
        text: action.nweet,
        createdAt: Date.now(),
        creatorId: action.userObj.uid,
        creatorName: action.userObj.displayName,
        attachmentUrl: action.attachmentUrl,
      };
    case UPDATE:
      return {
        ...state,
        text: action.newNweet,
        userObj: action.userObj,
        nweet: action.nweet,
      };
    case REMOVE:
      return {
        ...state,
        nweetObj: action.nweetObj,
      };
    case REMOVE_SUCCESS:
      return { ...state };
    case REMOVE_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
