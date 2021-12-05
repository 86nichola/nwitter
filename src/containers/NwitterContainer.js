import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Nweet from "components/Nweet";
import { remove, update, removeAsync } from "../modules/nwitter";

function NwitterContainer({ nweet }) {
  const { userObj } = useSelector((state) => ({
    userObj: state.auth.userObj,
  }));
  debugger;
  console.log(userObj);
  const dispatch = useDispatch();

  const onDeleteClick = (nweetObj) => removeAsync(nweetObj);
  const onSubmit = (newNweet, userObj) => dispatch(update(newNweet, userObj));

  /*
 const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");

    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      if (nweetObj.attachmentUrl !== "") {
        await storageService.refFromURL(nweetObj.attachmentUrl).delete();
      }
    }
  };

*/

  return (
    <Nweet
      key={nweet.id}
      nweetObj={nweet}
      isOwner={nweet.creatorId === userObj.uid}
      onDeleteClick={onDeleteClick}
    />
  );
}

export default NwitterContainer;
