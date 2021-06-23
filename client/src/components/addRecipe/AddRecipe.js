import React from "react";
import axios from "axios";
import FormData from "form-data";
import "./AddRecipe.scss";

const AddRecipe = ({ onImageChange, onFormSubmit }) => {
  console.log(onImageChange, onFormSubmit);
  const fileUploadHandler = (e) => {
    e.preventDefault();
    // const data = new FormData();
    // // data.append("image", selectedFile, selectedFile.name);
    // console.log(selectedFile);
    const form = e.target;

    axios
      .post("http://localhost:8081/mediterranean", {
        name: form.name.value,
        country: form.country.value,
        description: form.description.value,
        ingredients: form.ingredients.value,
      })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <>
      <div className="recipe__page">
        <div className="recipe__page-header">Add Your Mediterranean Recipe</div>

        <form onSubmit={onFormSubmit}>
          <div className="recipe__container">
            <label className="recipe__form-name">Recipe Name</label>
            <input
              name="name"
              className="recipe__form-name--input"
              type="text"
              placeholder="Add recipe name"
              //required
            />
            <label className="recipe__form-country">Country</label>
            <input
              name="country"
              className="recipe__form-country--input"
              type="text"
              placeholder="Country of origin"
              //required
            />
            <label className="recipe__form-image">Recipe Image</label>
            <input
              name="avatar"
              className="recipe__form-image--input"
              type="file"
              accept=".png, .jpg"
              onChange={onImageChange}
            />
            <label className="recipe__form-description">
              Recipe description
            </label>
            <input
              name="description"
              className="recipe__form-description--input"
              type="text"
              placeholder="recipe description"
            />
            <label className="recipe__form-ingredients">
              Recipe ingredients
            </label>
            <input
              name="ingredients"
              className="recipe__form-ingredients--input"
              type="text"
              placeholder="recipe ingredients"
            />
            <div className="recipe__form-buttons">
              <button className="recipe__form-button--cancel">Cancel</button>
              <button
                type="submit"
                className="recipe__form-button--upload"
                onClick={onImageChange}
              >
                Upload
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRecipe;
