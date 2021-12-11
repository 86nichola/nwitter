import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Nweet from "components/Nweet";
import { remove, update, removeAsync, updateAsync } from "../modules/nwitter";

function NwitterContainer({ nweet }) {
  const { userObj } = useSelector((state) => ({
    userObj: state.auth.userObj,
  }));

  const dispatch = useDispatch();
  // nweet값 thunk로 전달하기..
  const onDeleteClick = () => dispatch(removeAsync(nweet));
  const callUpdate = ({ userObj, nweetObj, newNweet }) =>
    dispatch(updateAsync({ userObj, nweetObj, newNweet }));

  return (
    <Nweet
      key={nweet.id}
      nweetObj={nweet}
      userObj={userObj}
      isOwner={nweet.creatorId === userObj.uid}
      onDeleteClick={onDeleteClick}
      callUpdate={callUpdate}
    />
  );
}

export default NwitterContainer;
