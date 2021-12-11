import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NweetFactory from "../components/NweetFactory";

import { remove, update, addNewAsync } from "../modules/nwitter";

function NweetFactoryContainer() {
  const { userObj } = useSelector((state) => ({
    userObj: state.auth.userObj,
  }));
  const dispatch = useDispatch();
  const callAddNew = ({ nweet, attachmentUrl }) => {
    dispatch(
      addNewAsync({
        nweet,
        attachmentUrl,
      })
    );
  };

  return (
    <NweetFactory userObj={userObj} callAddNew={callAddNew}></NweetFactory>
  );
}

export default NweetFactoryContainer;
