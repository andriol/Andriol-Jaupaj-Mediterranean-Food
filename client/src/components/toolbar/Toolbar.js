import React from "react";
import SideMenu from "../sideMenu/SideMenu";
import { Link } from "react-router-dom";
import "./Toolbar.scss";

const Toolbar = (props) => (
  <header className="header">
    <nav className="header__nav">
      <div className="header__toggle-btn">
        <SideMenu click={props.drawerToggle} />
      </div>
      <Link to="/">
        <div className="header__main-title">Mediterranean Food</div>
      </Link>
      <div className="header__main-nav">
        <Link to="/">
          <div className="header__main-nav-home">Home</div>
        </Link>
        <Link to="/mediterranean">
          <div className="header__main-nav-recipes">Browse Recipes</div>
        </Link>
        <Link to="/recipeForm">
          <div className="header__main-nav-add">Add Your Recipe!</div>
        </Link>
        <div className="header__main-nav-signup">Sign up!</div>
      </div>
    </nav>
  </header>
);
export default Toolbar;
