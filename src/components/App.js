import React from "react";
import { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "../fbase";
///Users/master/myLab/nwitter/src/components/Router.js

function App() {
  const [init, setInit] = useState(false);

  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  const clearUser = () => {
    setUserObj(null);
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          clearUser={clearUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "initializing..."
      )}
    </>
  );
}
export default App;
