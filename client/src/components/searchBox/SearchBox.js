import React from "react";
import "./SearchBox.scss";

const SearchBox = (props) => {
  return (
    <section className="search__box">
      <input
        type="search"
        className="search__box-input"
        placeholder={props.placeholder}
        onChange={props.handleChange}
      />
    </section>
  );
};
export default SearchBox;
