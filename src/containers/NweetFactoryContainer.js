import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Nweet from "components/Nweet";
import { remove, update } from "../modules/nwitter";
import NweetFactory from "../components/NweetFactory";

function NweetFactoryContainer() {
  const { userObj } = useSelector((state) => ({
    userObj: state.nwitter.userObj,
  }));
  return <NweetFactory userObj={userObj}></NweetFactory>;
}

export default NweetFactoryContainer;
