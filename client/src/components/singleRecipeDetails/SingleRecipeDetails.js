import React, { useState } from "react";
import "./SingleRecipeDetails.scss";

const SingleRecipeDetails = ({ recipe, show, handleToggle }) => {
  console.log(recipe);
  const { name, image, country, description, ingredients } = recipe;
  // if (show) {
  //   document.body.classList.add("active-show");
  // } else {
  //   document.body.classList.remove("active-show");
  // }
  return (
    <>
      {show && (
        <div className="modal">
          <div onClick={handleToggle} className="overlay"></div>
          <div className="modal__content">
            <img className="modal__content-image" src={image} alt={name} />
            <div className="modal__content-textarea">
              <div className="modal__content-name">{name}</div>
              <div className="modal__content-country">{country}</div>
              <div className="modal__content-description">{description}</div>
              <div className="modal__content-ingredients">{ingredients}</div>
            </div>
            <button className="modal__content-button" onClick={handleToggle}>
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default SingleRecipeDetails;
