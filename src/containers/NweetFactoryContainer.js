import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NweetFactory from "../components/NweetFactory";
import { remove, update, addNewAsync } from "../modules/nwitter";

function NweetFactoryContainer() {
  const { userObj } = useSelector((state) => ({
    userObj: state.auth.userObj,
  }));

  return (
    <NweetFactory userObj={userObj} addNewAsync={addNewAsync}></NweetFactory>
  );
}

export default NweetFactoryContainer;
