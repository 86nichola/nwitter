import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppRouter from "components/Router";
import { authService } from "../fbase";
import { setAuth } from "../modules/auth";

function App() {
  const [init, setInit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setAuth(user));
      }
      setInit(true);
    });
  }, []);

  return <>{init ? <AppRouter /> : "initializing..."}</>;
}
export default App;
