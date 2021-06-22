import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RecipeList.scss";

const RecipeList = ({ recipes, handleToggle }) => {
  const recipesMarkup = recipes.map((recipe) => (
    <div className="card__wrapper">
      <div className="card__wrapper-single" key={recipe.id}>
        <Link to={`/mediterranean/${recipe.id}`}>
          <img
            className="card__wrapper__images"
            onClick={handleToggle}
            src={recipe.image}
            alt={recipe.name}
          />
        </Link>
        <div className="card__wrapper-detail">
          <div className="card__wrapper-header">
            <div className="card__wrapper-name">{recipe.name}</div>
            <div className="card__wrapper-country">{recipe.country}</div>
          </div>
        </div>
      </div>
    </div>
  ));

  return <div className="card">{recipesMarkup}</div>;
};
export default RecipeList;
