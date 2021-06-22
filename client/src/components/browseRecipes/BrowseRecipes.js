import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import SearchBox from "../searchBox/SearchBox";
import RecipeList from "../recipeList/RecipeList";
import RecipeDetails from "../recipeDetails/RecipeDetails";

//import AddRecipe from "../addRecipe/AddRecipe";

//`${API_URL}/mediterranean`
class BrowseRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      selectedRecipe: {},
      searchField: "",
      show: false,
      //selectedFile: null,
    };
  }

  handleToggle = () => {
    this.setState({ show: !this.state.show });
  };

  browseRecipes = () => {
    return axios
      .get("http://localhost:8081/mediterranean")
      .then((res) => {
        console.log(res.data);
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
  // imageSelectHandler = (event) => {
  //   console.log(event.target.files[0]);

  //   this.setState({
  //     selectedFile: event.target.files[0],
  //   });
  // };

  // handleRecipeAdd = () => {
  //   if (this.state.selectedFile) {
  //     return <p>{this.state.selectedFile.name}</p>;
  //   }
  // };

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
        {/* <Route
          path="/mediterranean"
          render={(props) => ( */}
        <SearchBox
          placeholder="Search by country..."
          handleChange={(e) => this.setState({ searchField: e.target.value })}
        />
        <RecipeList
          recipes={filteredRecipes}
          // {...props}
          handleToggle={this.handleToggle}
        />
        {/* )}
        /> */}
        {/* <SearchBox
          placeholder="Search by country..."
          handleChange={(e) => this.setState({ searchField: e.target.value })}
        /> */}
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
        {/* <SearchBox
          placeholder="Search by country..."
          handleChange={(e) => this.setState({ searchField: e.target.value })}
        /> */}
        {/* <Route
          path="/recipeForm"
          render={() => (
            <AddRecipe
              // imageSelectHandler={this.imageSelectHandler}
              imageSelectHandler={(e) =>
                this.setState({ selectedFile: e.target.files[0] })
              }
              handleRecipeAdd={this.handleRecipeAdd}
              selectedFile={this.state.selectedFile}
            />
          )}
        /> */}
      </div>
    );
  }
}
export default BrowseRecipes;
