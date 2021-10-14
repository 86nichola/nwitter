import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";
import Nweet from "components/Nweet";

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.newDisplayName);

  // custom
  const [nweets, setNweets] = useState([]);

  const onLogOutClick = () => {
    authService.signOut();
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

  // custom
  const getMyNweets = async () => {
    const myNweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "asc")
      .get();

    setNweets((prev) => [...prev, ...myNweets.docs.map((doc) => doc.data())]);
  };

  useEffect(() => {
    getMyNweets();
  }, []);
  /*
   */
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
      {
        /**/ <div>
          {nweets.map((nweet, idx) => (
            <Nweet
              key={idx}
              nweetObj={nweet}
              isOwner={nweet.creatorId === userObj.uid}
            />
          ))}
        </div>
      }
    </>
  );
};

export default Profile;
