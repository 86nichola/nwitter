import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Nweet from "components/Nweets";

function NwitterContainer() {
  const { userObj } = useSelector((state) => ({
    userObj: state.nwitter.userObj,
  }));
}

const dispatch = useDispatch();
return <Nweet />;

export default NwitterContainer;
