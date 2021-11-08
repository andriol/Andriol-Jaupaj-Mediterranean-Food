import React, { useState, useEffect, Link } from "react";
import "./ProfileData.scss";

const ProfileData = ({ onAuthFail }) => {
  console.log(onAuthFail);

  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const authToken = sessionStorage.getItem("authToken");

  const reqOptions = {
    headers: {
      authorization: `Bearer ${authToken}`,
    },
  };

  const getProfile = async () => {
    const response = await fetch(
      "http://localhost:8080/user/profile",
      reqOptions
    );
    console.log(response);

    const userInfo = await response.json();

    setUserInfo(userInfo);
    console.log(userInfo);
  };
  useEffect(() => {
    getProfile();
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <h1>Loading...please wait</h1>
  ) : (
    <>
      <div>{userInfo.username}</div>
      <div>{userInfo.email}</div>
    </>
  );
};
export default ProfileData;
