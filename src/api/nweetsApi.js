import { dbService, authService, storageService } from "../fbase";

export const deleteNweet = async (nweetObj) => {
  const ok = window.confirm("삭제하시겠습니까?");

  if (ok) {
    await dbService.doc(`nweets/${nweetObj.id}`).delete();
    if (nweetObj.attachmentUrl !== "") {
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  }
};

export const getAuthChange = () => {
  const [userObj, setUserObj] = useState(null);
  authService.onAuthStateChanged((user) => {
    if (user) {
      setUserObj({
        uid: user.uid,
        displayName: user.displayName || `ID${user.uid.substring(0, 8)}`,
        updateProfile: (args) => user.updateProfile(args),
      });
    } else {
      setUserObj(false);
    }
  });
  return userObj;
};
