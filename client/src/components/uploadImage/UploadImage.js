import React, { Component } from "react";
import { Route } from "react-router";
import axios from "axios";
import FormData from "form-data";
import AddRecipe from "../addRecipe/AddRecipe";

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
  }

  imageSelectHandler = (event) => {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };
  clickHandler = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);

    axios
      .post("http://localhost:8081/profile", data, {
        // name: form.name.value,
        // country: form.country.value,
        // image: selectedFile.name,
      })
      .then((res) => {
        console.log(res);
      });
  };

  render() {
    return (
      <>
        <Route
          path="/recipeForm"
          render={() => (
            <AddRecipe
              handleFileChange={this.handleFileChange}
              handleSubmit={this.handleSubmit}
            />
          )}
        />
      </>
    );
  }
}
export default UploadImage;
