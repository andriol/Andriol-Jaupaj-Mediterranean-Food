import React, { Component } from "react";
import Toolbar from "../toolbar/Toolbar";
import SideDrawer from "../sideDrawer/SideDrawer";
import BackDrop from "../backDrop/BackDrop";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false,
    };
  }
  drawerToggle = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };
  backDropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };
  render() {
    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <BackDrop click={this.backDropClickHandler} />;
    }

    return (
      <div>
        <Toolbar drawerToggle={this.drawerToggle} />
        <SideDrawer showSideDrawer={this.state.sideDrawerOpen} />
        {backdrop}
      </div>
    );
  }
}
export default NavBar;
