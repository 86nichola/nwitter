import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";
import NwitterContainer from "../containers/NwitterContainer";
import { useSelector, useDispatch } from "react-redux";
import { offAuth, setAuth } from "../modules/auth";

const Profile = () => {
  // hook, redux
  const history = useHistory();
  const dispatch = useDispatch();
  const { userObj } = useSelector((state) => ({
    userObj: state.auth.userObj,
  }));
  const refreshUser = () => {
    const user = authService.currentUser;
    dispatch(setAuth(user));
  };

  // local
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [nweets, setNweets] = useState([]);

  const onLogOutClick = () => {
    debugger;
    authService.signOut();
    dispatch(offAuth());
    history.push("/");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
      refreshUser();
    }
  };

  const getMyNweets = () => {
    return dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setNweets(newArray);
      });
  };

  useEffect(() => {
    const unSubscribe = getMyNweets();

    return () => {
      console.log("call Profile cleanUp");
      unSubscribe();
    };
  }, []);

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{ marginTop: 10 }}
        />
        <span
          className="formBtn cancelBtn logOut"
          onClick={onLogOutClick}
          style={{ marginTop: 10 }}
        >
          LogOut
        </span>
      </form>

      {
        <div style={{ marginTop: 30 }}>
          {nweets.map((nweet, idx) => (
            <NwitterContainer key={idx} nweet={nweet} />
          ))}
        </div>
      }
    </div>
  );
};

export default Profile;
