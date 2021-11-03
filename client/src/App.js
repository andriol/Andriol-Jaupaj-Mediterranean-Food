import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import BrowseRecipes from "./components/browseRecipes/BrowseRecipes";
import RecipeDetails from "./components/recipeDetails/RecipeDetails";
import NavBar from "./components/navbar/NavBar";
import UploadRecipe from "./components/uploadRecipe/UploadRecipe";
import LogIn from "./components/logIn/LogIn";

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
              exact
              path="/mediterranean/:mediterraneanId"
              component={RecipeDetails}
            />
            <Route path="/recipeForm" component={UploadRecipe} />
            <Route path="/login" component={LogIn} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
