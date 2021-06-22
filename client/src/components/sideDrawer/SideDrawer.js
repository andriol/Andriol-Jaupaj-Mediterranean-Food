import React from "react";
import "./SideDrawer.scss";

const SideDrawer = (props) => {
  console.log(props);
  let drawerClasses = ["side-drawer"];

  if (props.showSideDrawer) {
    drawerClasses = ["side-drawer", "open"];
  }

  return (
    <nav className={drawerClasses.join(" ")}>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/mediterranean">Browse Recipes</a>
        </li>
        <li>
          <a href="/recipeForm">Add Your Recipe</a>{" "}
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
