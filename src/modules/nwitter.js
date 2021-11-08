/* 액션 타입 만들기 */
const NEW = "nwitter/NEW";
const REMOVE = "nwitter/REMOVE";
const UPDATE = "nwitter/UPDATE";

/* 액션 생성함수 만들기 */
export const addNew = (nweet, attachmentUrl, userObj) => ({
  type: NEW,
  userObj,
  nweet,
  attachmentUrl,
});
export const remove = (userObj) => ({ type: REMOVE, userObj });
export const update = (newNweet, userObj) => ({
  type: UPDATE,
  userObj,
  newNweet,
});

/* 리듀서 만들기*/
const nwitter = (state, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        documentKey: `nweets/${action.userObj.id}`,
        text: action.newNweet,
      };
    case NEW:
      return {
        text: action.nweet,
        createdAt: Date.now(),
        creatorId: action.userObj.uid,
        attachmentUrl: action.attachmentUrl,
      };
    case REMOVE:
      return { documentKey: `nweets/${action.nweetObj.id}` };
    default:
      return state;
  }
};
