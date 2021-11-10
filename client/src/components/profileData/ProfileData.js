import React, { useState, useEffect, Link } from "react";
import "./ProfileData.scss";

const ProfileData = ({ onAuthFail }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  };

  useEffect(() => {
    getProfile();
    setIsLoading(false);
  }, []);
  // delete recipe
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: null,
  };
  const deleteRecipe = async (id) => {
    const response = await fetch(
      `http://localhost:8080/mediterranean/${id}`,
      requestOptions
    );

    const deletedRecipe = await response.json();
    console.log(deletedRecipe);
    window.location.reload();
    return false;
  };
  // update recipe
  const requestOptionsEdit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: null,
  };
  const editRecipe = async (id) => {
    const response = await fetch(
      `http://localhost:8080/mediterranean/${id}`,
      requestOptionsEdit
    );
    console.log(response);
    const editedRecipe = await response.json();
    console.log(editedRecipe);
  };
  //logout
  function handleAuthFail() {
    sessionStorage.removeItem("authToken");
    setIsLoggedIn(false);
    window.location.reload();
    return false;
  }

  return isLoading ? (
    <h1>Loading...please wait</h1>
  ) : (
    <>
      <div className="profile_wrapper">
        <img className="profile_wrapper-avatar" />
        <h1 className="profile_wrapper-title">Profile</h1>
        <div className="profile_wrapper-username" key={userInfo.id}>
          <div>Username: {userInfo.username}</div>
        </div>
        <div className="profile_wrapper-email">
          <div className="profile_wrapper--email">Email: {userInfo.email}</div>
        </div>
      </div>
      <h1 className="recipe__wrapper-title">Your Recipes:</h1>
      <div className="recipe">
        {userInfo.recipes &&
          userInfo.recipes.map((recipe) => {
            const { id, name, country, image, description, ingredients } =
              recipe;

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
                    <div className="recipe__wrapper-buttons ">
                      <button
                        className="recipe__wrapper-edit btn btn-info"
                        type="submit"
                        // you pass this to another form where you can edit the info
                        onClick={() => editRecipe(id)}
                      >
                        Edit
                      </button>
                      <button
                        className="recipe__wrapper-delete btn btn-danger"
                        type="submit"
                        onClick={() => deleteRecipe(id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
      <button
        className="recipe__wrapper-logout"
        type="submit"
        onClick={handleAuthFail}
      >
        Sign out
      </button>
    </>
  );
};
export default ProfileData;
