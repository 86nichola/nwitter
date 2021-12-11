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

  return (
    <>
      <div
        id="top"
        style={{
          maxWidth: 890,
          width: "100%",
          height: "auto",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        ===========================================================================================================================여기에
        div 있어여. 채워주세요 dispaly:flex / justifyContent:center
        ===========================================================================================================================
      </div>
      {init ? <AppRouter /> : "initializing..."}
    </>
  );
}
export default App;
