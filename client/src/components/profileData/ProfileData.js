import React from "react";
import "./ProfileData.scss";

const ProfileData = ({ profile, onLogout }) => {
  return (
    <>
      <div className="profile__data">
        <h2> Your Profile </h2>
        <h3>Welcome, {profile.tokenInfo.name}</h3>
        <h3>Login Username: {profile.tokenInfo.username}</h3>
        {/* <h4>Performance Level: {profile.accountInfo.performanceLevel}</h4>
      <h4>Review Date: {profile.accountInfo.reviewDate}</h4> */}
        <button className="logout__button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </>
  );
};
export default ProfileData;
