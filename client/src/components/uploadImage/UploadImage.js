import React, { useState, Route } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddRecipe from "../addRecipe/AddRecipe";

const UploadImage = () => {
  const [file, setFile] = useState(null);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:8081/profile", formData, config)
      .then((res) => {
        console.log(res);
        alert(" upload was successful");
      })
      .catch((err) => {
        console.log("err");
      });
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
      })
      .catch((err) => {
        console.log("err");
      });

    form.name.value = "";
    form.country.value = "";
    form.description.value = "";
    form.ingredients.value = "";
  };

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
            <Link to="/recipeForm">
              <button className="recipe__form-button--cancel">Cancel</button>
            </Link>
            <button
              type="submit"
              className="recipe__form-button--upload"
              // onClick={onImageChange}
            >
              Upload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadImage;

// import React, { Component } from "react";
// import { Route } from "react-router";
// import axios from "axios";
// import FormData from "form-data";
// import AddRecipe from "../addRecipe/AddRecipe";

// class UploadImage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedFile: null,
//       images: [],
//     };
//     this.clickHandler = this.clickHandler(this);
//   }

//   imageSelectHandler = (event) => {
//     console.log(event.target.files[0]);
//     this.setState({
//       selectedFile: event.target.files[0],
//       //loaded: 0,
//     });
//   };
//   clickHandler = () => {
//     const data = new FormData();
//     data.append("avatar", this.state.selectedFile);

//     axios
//       .post("http://localhost:8081/profile", data, {
//         // name: form.name.value,
//         // country: form.country.value,
//         // image: selectedFile.name,
//       })
//       .then((res) => {
//         this.setState({ images: [res.data, ...this.state.images] });
//       });
//   };

//   render() {
//     return (
//       <>
//         <Route
//           path="/recipeForm"
//           render={() => (
//             <AddRecipe
//               images={this.state.images}
//               imageSelectHandler={this.imageSelectHandler}
//               onClickHandler={this.clickHandler}
//             />
//           )}
//         />
//       </>
//     );
//   }
// }
// export default UploadImage;

{
  /* <form onSubmit={onFormSubmit}>
  <input type="file" name="avatar" onChange={onImageChange} />
  <button type="submit">Upload</button>
</form>; */
}
