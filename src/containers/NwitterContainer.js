import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Nweet from "components/Nweet";
import { remove, update, removeAsync } from "../modules/nwitter";

function NwitterContainer({ nweet }) {
  const { userObj } = useSelector((state) => ({
    userObj: state.auth.userObj,
  }));

  const dispatch = useDispatch();
  // nweet값 thunk로 전달하기..
  const onDeleteClick = () => dispatch(removeAsync(nweet));
  const onSubmit = (newNweet, userObj) => dispatch(update(newNweet, userObj));

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
