import React, { useState, Route } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddRecipe from "../addRecipe/AddRecipe";
import "./UploadRecipe.scss";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [recipes, setRecipe] = useState(null);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

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
        setRecipe(res.data);
      })

      .catch((err) => {
        console.log("err");
      });

    axios
      .post("http://localhost:8081/profile", formData, config)
      .then((res) => {
        console.log(res.data.image);
        setRecipe({ ...recipes, image: res.data.image.path });
      })
      .catch((err) => {
        console.log("err");
      });
    form.name.value = "";
    form.country.value = "";
    form.description.value = "";
    form.ingredients.value = "";
  };
  console.log(recipes);
  const onImageChange = (e) => {
    setFile(e.target.files[0]);
  };
  return (
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
            required
          />
          <label className="recipe__form-country">Country</label>
          <input
            name="country"
            className="recipe__form-country--input"
            type="text"
            placeholder="Country of origin"
            required
          />
          <label className="recipe__form-image">Recipe Image</label>
          <input
            name="image"
            className="recipe__form-image--input"
            type="file"
            accept=".png, .jpg"
            onChange={onImageChange}
          />
          <label className="recipe__form-description">Recipe description</label>
          <input
            name="description"
            className="recipe__form-description--input"
            type="text"
            placeholder="recipe description"
            required
          />
          <label className="recipe__form-ingredients">Recipe ingredients</label>
          <input
            name="ingredients"
            className="recipe__form-ingredients--input"
            type="text"
            placeholder="recipe ingredients"
            required
          />
          <div className="recipe__form-buttons">
            <button type="submit" className="recipe__form-button--upload">
              Upload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadImage;
