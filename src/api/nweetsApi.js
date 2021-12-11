import { dbService, authService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";

export const deleteNweet = async (nweetObj) => {
  const ok = window.confirm("삭제하시겠습니까?");

  if (ok) {
    debugger;
    await dbService.doc(`nweets/${nweetObj.id}`).delete();
    if (nweetObj.attachmentUrl !== "") {
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  }
};

export const createNweet = async ({ userObj, attachmentUrl, nweet }) => {
  await dbService.collection("nweets").add({
    text: nweet,
    createdAt: Date.now(),
    creatorId: userObj.uid,
    creatorName: userObj.displayName,
    attachmentUrl,
  });
};

export const updateNweet = async ({ userObj, nweetObj, newNweet }) => {
  debugger;
  await dbService
    .doc(`nweets/${nweetObj.id}`)
    .update({ text: newNweet, creatorName: userObj.displayName });
};

// export const getAuthChange = () => {
//   const userObj = null;
//   const init = false;
//   authService.onAuthStateChanged((user) => {
//     debugger;
//     if (user) {
//       userObj = {
//         uid: user.uid,
//         displayName: user.displayName || `ID${user.uid.substring(0, 8)}`,
//         updateProfile: (args) => user.updateProfile(args),
//       };
//     } else {
//       userObj = false;
//     }
//     init = true;
//   });
//   return { userObj, init: init };
// };
