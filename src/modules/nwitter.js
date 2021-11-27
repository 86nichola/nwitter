/* 액션 타입 만들기 */
//const NEW = "nwitter/NEW";
const REMOVE = "nwitter/REMOVE";
const UPDATE = "nwitter/UPDATE";

/* 액션 생성함수 만들기 */
// export const addNew = (nweet, attachmentUrl, userObj) => ({
//   type: NEW,
//   userObj,
//   nweet,
//   attachmentUrl,
// });
export const remove = (nweetObj) => ({ type: REMOVE, nweetObj });
export const update = (newNweet, userObj) => ({
  type: UPDATE,
  userObj,
  newNweet,
});

/* 초기상태선언 */
const initialState = {
  userObj: {},
  text: "",
};

/* 리듀서 만들기*/
export default function nwitter(state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}
