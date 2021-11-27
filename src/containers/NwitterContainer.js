import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Nweet from "components/Nweet";
import { remove, update } from "../modules/nwitter";

function NwitterContainer({ nweet }) {
  const { userObj } = useSelector((state) => ({
    userObj: state.nwitter.userObj,
  }));

  const dispatch = useDispatch();

  const onDeleteClick = (nweetObj) => (nweetObj) => dispatch(remove(nweetObj));
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
    />
  );
}

export default NwitterContainer;
