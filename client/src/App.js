import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import BrowseRecipes from "./components/browseRecipes/BrowseRecipes";
//import AddRecipe from "./components/addRecipe/AddRecipe";
import RecipeDetails from "./components/recipeDetails/RecipeDetails";
import NavBar from "./components/navbar/NavBar";
import UploadImage from "./components/uploadImage/UploadImage";

export const API_URL = process.env.REACT_APP_API_URL;

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/mediterranean" component={BrowseRecipes} />
            <Route
              path="/mediterranean/:mediterraneanId"
              component={RecipeDetails}
            />
            {/* <Route path="/recipeForm" component={AddRecipe} /> */}
            <Route path="/recipeForm" component={UploadImage} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
