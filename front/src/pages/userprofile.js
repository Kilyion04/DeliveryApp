import React from 'react';
import './profile.css';

const Profile = ({ userType }) => {
  return (
    <div className="profile">
      <h1>{userType} Profile</h1>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Address:
          <input type="text" name="address" />
        </label>
        <div className="buttons">
          <button className="btn-save" type="button">Save</button>
          <button className="btn-cancel" type="button">Cancel</button>
          <button className="btn-delete" type="button">Delete</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
