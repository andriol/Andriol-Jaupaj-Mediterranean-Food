import React from "react";
import "./SideDrawer.scss";

const SideDrawer = (props) => {
  console.log(props);
  let drawerclassNamees = ["side-drawer"];

  if (props.showSideDrawer) {
    drawerclassNamees = ["side-drawer", "open"];
  }

  return (
    <nav className={drawerclassNamees.join(" ")}>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/mediterranean">Browse Recipes</a>
        </li>
        <li>
          <a href="/recipeForm">Add Your Recipe</a>
        </li>
        <li>
          <a href="/login">Log in/Sign up!</a>{" "}
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
