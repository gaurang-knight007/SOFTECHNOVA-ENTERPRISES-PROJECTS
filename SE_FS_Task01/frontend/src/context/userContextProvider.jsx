import React, { useEffect, useState } from "react";
import userContext from "./userContext";

const UserContextProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [userStatus, setUserStatus] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setData(JSON.parse(user));
      setUserStatus(true);
    }
  }, []);
  return (
    <div>
      <userContext.Provider value={{ data, userStatus, setUserStatus }}>
        {children}
      </userContext.Provider>
    </div>
  );
};

export default UserContextProvider;
