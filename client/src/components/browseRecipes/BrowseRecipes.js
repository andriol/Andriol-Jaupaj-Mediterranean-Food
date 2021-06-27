import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import SearchBox from "../searchBox/SearchBox";
import RecipeList from "../recipeList/RecipeList";
import RecipeDetails from "../recipeDetails/RecipeDetails";

//`${API_URL}/mediterranean`
class BrowseRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      selectedRecipe: {},
      searchField: "",
      show: false,
    };
  }

  handleToggle = () => {
    this.setState({ show: !this.state.show });
  };

  browseRecipes = () => {
    return axios
      .get("http://localhost:8081/mediterranean")
      .then((res) => {
        console.log(res.data[res.data.length - 1]);
        this.setState({
          recipes: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getIndividualRecipe = (id) => {
    return axios
      .get(`http://localhost:8081/mediterranean/${id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          selectedRecipe: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.browseRecipes();
    this.getIndividualRecipe();
  }
  render() {
    const { recipes, searchField } = this.state;
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.country.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div>
        <SearchBox
          placeholder="Search by country..."
          handleChange={(e) => this.setState({ searchField: e.target.value })}
        />
        <RecipeList
          recipes={filteredRecipes}
          handleToggle={this.handleToggle}
        />

        <Route
          path="/mediterranean/:mediterraneanId"
          render={(props) => (
            <RecipeDetails
              getIndividualRecipe={this.getIndividualRecipe}
              browseRecipes={this.browseRecipes}
              recipe={this.state.selectedRecipe}
              {...props}
              show={this.state.show}
              handleToggle={this.handleToggle}
            />
          )}
        />
      </div>
    );
  }
}
export default BrowseRecipes;
