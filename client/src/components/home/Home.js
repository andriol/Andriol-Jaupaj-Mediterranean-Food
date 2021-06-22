import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ImageOne from "../../assets/images/mediterranean-restaurants-2.png";
import ImageTwo from "../../assets/images/mediterranean-restaurants.png";
import ImageThree from "../../assets/images/mediterranean-restaurants-3.png";
import "./Home.scss";

export default class Home extends Component {
  render() {
    return (
      <Carousel>
        <div>
          <img
            className="home__page-image--one"
            src={ImageOne}
            alt="turkish cuisine"
          />
          <p className="legend">Turkish Cuisine</p>
        </div>
        <div>
          <img
            className="home__page-image--two"
            src={ImageTwo}
            alt="mediterranean diet"
          />
          <p className="legend">Mediterranean Diet</p>
        </div>
        <div>
          <img
            className="home__page-image--three"
            src={ImageThree}
            alt="greek cuisine"
          />
          <p className="legend">Greek Restaurant</p>
        </div>
      </Carousel>
    );
  }
}
ReactDOM.render(<Home />, document.getElementById("root"));
