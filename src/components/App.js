import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppRouter from "components/Router";
import { authService } from "../fbase";
import { setAuth } from "../modules/auth";

function App() {
  const [init, setInit] = useState(false);
  // const [userObj, setUserObj] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setAuth(user));
        // setUserObj({
        //   uid: user.uid,
        //   displayName: user.displayName,
        //   updateProfile: (args) => user.updateProfile(args),
        // });
      } else {
        //setUserObj(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    // setUserObj({
    //   uid: user.uid,
    //   displayName: user.displayName,
    //   updateProfile: (args) => user.updateProfile(args),
    // });
  };

  const { userObj } = useSelector((state) => ({
    userObj: state.auth.userObj,
  }));

  debugger;
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
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
