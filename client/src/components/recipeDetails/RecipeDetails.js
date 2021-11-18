import React, { Component } from "react";
import "./RecipeDetails.scss";
import SingleRecipeDetails from "../singleRecipeDetails/SingleRecipeDetails";

export default class RecipeDetails extends Component {
  componentDidUpdate(prevProps, prevState) {
    const mediterraneanId = prevProps
      ? prevProps.match.params.mediterraneanId
      : this.props.recipe.id;

    if (mediterraneanId !== this.props.match.params.mediterraneanId) {
      this.props.getIndividualRecipe(this.props.match.params.mediterraneanId);
      this.props.browseRecipes(this.props.match.params.mediterraneanId);
    }
  }

  render() {
    const { show, handleToggle } = this.props;
    console.log(this.props);

    return (
      <div>
        <SingleRecipeDetails
          recipe={this.props.recipe}
          show={show}
          handleToggle={handleToggle}
        />
      </div>
    );
  }
}
