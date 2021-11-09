import React, { useState, useEffect, Link } from "react";
import "./ProfileData.scss";

const ProfileData = ({ onAuthFail }) => {
  console.log(onAuthFail);

  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [recipeName, setRecipeName] = useState("");
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
  console.log(userInfo.recipes);
  useEffect(() => {
    getProfile();
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <h1>Loading...please wait</h1>
  ) : (
    <>
      <div className="profile_wrapper">
        <h1 className="profile_wrapper-title">Profile</h1>
        <div className="profile_wrapper-username" key={userInfo.id}>
          Username: {userInfo.username}
        </div>
        <div className="profile_wrapper-email">Email: {userInfo.email}</div>
      </div>
      <h1>Your Recipes:</h1>
      <div className="recipe">
        {userInfo.recipes &&
          userInfo.recipes.map((cake) => {
            const { id, name, country, image, description, ingredients } = cake;

            return (
              <>
                <div className="recipe__wrapper" key={id}>
                  <div className="recipe__wrapper-single">
                    <img
                      className="recipe__wrapper__images"
                      src={image}
                      alt="cake image"
                    />

                    <div className="recipe__wrapper-detail">
                      <div className="recipe__wrapper-header">
                        <div className="recipe__wrapper-name">{name}</div>
                        <div className="recipe__wrapper-country">{country}</div>
                        <div className="recipe__wrapper-description">
                          {description}
                        </div>
                        <div className="recipe__wrapper-ingredients">
                          {ingredients}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};
export default ProfileData;
