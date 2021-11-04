import React, { useState, Route, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import AddRecipe from "../addRecipe/AddRecipe";
import "./UploadRecipe.scss";

const UploadRecipe = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("country", country);
    formData.append("description", description);
    formData.append("ingredients", ingredients);
    try {
      const res = await axios.post(
        "http://localhost:8080/mediterranean",
        formData
      );
      console.log(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="recipe__page">
      <div className="recipe__page-header">Add Your Mediterranean Recipe</div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        encType="multipart/form-data"
      >
        <div className="recipe__container">
          <label className="recipe__form-name">Recipe Name</label>
          <input
            name="name"
            className="recipe__form-name--input"
            type="text"
            placeholder="Add recipe name"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="recipe__form-country">Country</label>
          <input
            name="country"
            className="recipe__form-country--input"
            type="text"
            placeholder="Country of origin"
            onChange={(e) => setCountry(e.target.value)}
          />
          <label className="recipe__form-image">Recipe Image</label>
          <input
            name="file"
            className="recipe__form-image--input"
            type="file"
            accept="image/*"
            onChange={saveFile}
          />
          <label className="recipe__form-description">Recipe description</label>
          <input
            name="description"
            className="recipe__form-description--input"
            type="text"
            placeholder="recipe description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="recipe__form-ingredients">Recipe ingredients</label>
          <input
            name="ingredients"
            className="recipe__form-ingredients--input"
            type="text"
            placeholder="recipe ingredients"
            onChange={(e) => setIngredients(e.target.value)}
          />
          <div className="recipe__form-buttons">
            <button
              type="submit"
              className="recipe__form-button--upload"
              onClick={uploadFile}
            >
              Upload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadRecipe;
