import { dbService } from "../fbase";
import React, { useEffect, useState } from "react";

import NweetFactory from "components/NweetFactory";
import NweetFactoryContainer from "../containers/NweetFactoryContainer";
import NwitterContainer from "../containers/NwitterContainer";

const Home = () => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    const unSubscribe = dbService
      .collection("nweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setNweets(newArray);
      });

    return () => {
      console.log("call Home cleanUp");
      unSubscribe();
    };
  }, []);
  console.log(nweets);
  return (
    <div className="container">
      <NweetFactoryContainer />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet, idx) => (
          <NwitterContainer key={idx} nweet={nweet} />
        ))}
      </div>
    </div>
  );
};

export default Home;
