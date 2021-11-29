import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppRouter from "components/Router";
import { authService } from "../fbase";
import { getAuth } from "../modules/auth";

function App() {
  const [init, setInit] = useState(false);

  //const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    getAuth();
    setInit(true);
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
    userObj: state.userObj,
  }));

  return (
    <>
      {init ? (
        <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} />
      ) : (
        "initializing..."
      )}
    </>
  );
}
export default App;
