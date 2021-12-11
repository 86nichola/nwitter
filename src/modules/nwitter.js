import * as nweetApi from "../api/nweetsApi";

/* 액션 타입 만들기 */
const NEW = "nwitter/NEW";
const NEW_SUCCESS = "nwitter/NEW_SUCCESS";
const NEW_ERROR = "nwitter/NEW_ERROR";
const REMOVE = "nwitter/REMOVE";
const REMOVE_SUCCESS = "nwitter/REMOVE_SUCCESS";
const REMOVE_ERROR = "nwitter/REMOVE_ERROR";

const UPDATE = "nwitter/UPDATE";
const UPDATE_SUCCESS = "nwitter/UPDATE_SUCCESS";
const UPDATE_ERROR = "nwitter/UPDATE_ERROR";

/* 액션 생성함수 만들기 */
export const addNew = ({ nweet, attachmentUrl, userObj }) => ({
  type: NEW,
  userObj,
  nweet,
  attachmentUrl,
});
export const remove = (nweetObj) => ({ type: REMOVE, nweetObj });
export const update = ({ userObj, newNweet, nweetObj }) => ({
  type: UPDATE,
  nweetObj,
  newNweet,
  userObj,
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
  ({ nweet, attachmentUrl }) =>
  (dispatch, getState) => {
    const userObj = getState().auth.userObj;
    try {
      nweetApi.createNweet(dispatch(addNew({ userObj, nweet, attachmentUrl })));
      //success
      dispatch({ type: NEW_SUCCESS });
    } catch (e) {
      //error
      dispatch({ type: NEW_ERROR, error: e });
    }
  };

export const updateAsync =
  ({ nweetObj, newNweet }) =>
  (dispatch, getState) => {
    const userObj = getState().auth.userObj;
    try {
      debugger;
      nweetApi.updateNweet(dispatch(update({ userObj, nweetObj, newNweet })));
      //success
      dispatch({ type: UPDATE_SUCCESS });
    } catch (e) {
      //error
      dispatch({ type: UPDATE_ERROR, error: e });
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
  error: null,
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
        nweetObj: action.nweetObj,
      };
    case UPDATE_SUCCESS:
      return { ...state };
    case UPDATE_ERROR:
      return { ...state, error: action.error };
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
