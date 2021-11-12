import React, { useEffect, useState } from "react";
import "./EditRecipeModal.scss";

const EditRecipeModal = ({ show, onClose, singleItem }) => {
  const [singleRecipe, setSingleRecipe] = useState({
    name: "",
    country: "",
    description: "",
    ingredients: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSingleRecipe({ ...name, [name]: value });
  };
  // update recipe
  const requestOptionsEdit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(singleRecipe),
  };
  const editRecipe = async (id) => {
    const response = await fetch(
      `http://localhost:8080/mediterranean/${singleItem.id}`,
      requestOptionsEdit
    );
    const editedRecipe = await response.json();
    alert("Your recipe was saved!");
    console.log(editedRecipe);
  };
  useEffect(() => {
    editRecipe();
  }, []);

  return (
    <>
      {show && (
        <div id="modal">
          <div onClick={onClose} className="overlay"></div>

          <div className="modal__wrapper" key={singleItem.id}>
            <button className="modal-button" onClick={onClose}>
              ×
            </button>
            <div className="modal__wrapper-single">
              <img
                name="image"
                className="modal__wrapper__images"
                src={singleItem.image}
                alt="cake image"
              />
              <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  name="name"
                  className="modal__wrapper-name"
                  defaultValue={singleItem.name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="country"
                  className="modal__wrapper-country"
                  defaultValue={singleItem.country}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="description"
                  className="modal__wrapper-description"
                  defaultValue={singleItem.description}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="ingredients"
                  className="modal__wrapper-ingredients"
                  defaultValue={singleItem.ingredients}
                  onChange={handleChange}
                />

                <button
                  className="modal__save-button"
                  onClick={editRecipe}
                  type="submit"
                >
                  Save Recipe
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default EditRecipeModal;
