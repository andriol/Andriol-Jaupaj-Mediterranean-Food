import React, { Component } from "react";
import axios from "axios";
import LoginForm from "../loginForm/LoginForm";
import ProfileData from "../profileData/ProfileData";
import "./Login.scss";

class LogIn extends Component {
  state = {
    isLoggedIn: false,
    profileData: null,
  };

  componentDidMount() {
    this.fetchProfile();
  }

  handleLogin = ({ username, password }) => {
    axios
      .post("http://localhost:8081/login", {
        username,
        password,
      })
      .then((token) => {
        console.log("Token came back: ", token.data.token);

        localStorage.setItem("userToken", token.data.token);

        this.setState(
          {
            isLoggedIn: true,
          },
          this.fetchProfile
        );
      })
      .catch((err) => {
        console.log("Could not login user: ", err.response.data);
      });
  };

  fetchProfile = () => {
    const token = localStorage.getItem("userToken");

    axios
      .get("http://localhost:8081/profile", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((profileRes) => {
        console.log("Profile data: ", profileRes.data);

        this.setState({
          isLoggedIn: true,
          profileData: profileRes.data,
        });
      })
      .catch((err) => {
        console.log("Could not fetch profile", err.response.data);
      });
  };

  handleLogout = () => {
    localStorage.removeItem("userToken");
    this.setState({
      isLoggedIn: false,
      profileData: null,
    });
  };

  render() {
    return (
      <>
        <h1>Welcome to Your Recipe Page!</h1>

        {!this.state.isLoggedIn && <LoginForm onLogin={this.handleLogin} />}
        {this.state.isLoggedIn && this.state.profileData && (
          <ProfileData
            profile={this.state.profileData}
            onLogout={this.handleLogout}
          />
        )}
      </>
    );
  }
}

export default LogIn;
