import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

const AppRouter = () => {
  const { userObj, init } = useSelector((state) => ({
    userObj: state.auth.userObj,
    init: state.auth.init,
  }));
  const isLoggedIn = Boolean(init);

  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        <>
          {isLoggedIn ? (
            <div
              style={{
                maxWidth: 890,
                width: "100%",
                margin: "0 auto",
                marginTop: 80,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
            </div>
          ) : (
            <Route exact path="/">
              <Auth />
            </Route>
          )}
        </>
      </Switch>
    </Router>
  );
};

export default AppRouter;
