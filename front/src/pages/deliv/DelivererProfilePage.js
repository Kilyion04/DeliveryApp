import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/deliv/profile.css';
import {
  fetchUserData,
  saveUserData,
  logout,
  deleteUserAccount,
  changeUserPassword,
} from '../../scripts/profileScripts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import AddressAutocomplete from '../../components/autocompleteAdress';

const DelivererProfilePage = () => {
  const [userData, setUserData] = useState({
    id: '',
    username: '',
    email: '',
    address: '',
    telephone: '',
  });
  const [editMode, setEditMode] = useState({
    username: false,
    email: false,
    address: false,
    telephone: false,
    password: false,
  });
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const data = fetchUserData();
    setUserData(data);
  }, []);

  const handleEditToggle = (field) => {
    setEditMode((prevMode) => ({ ...prevMode, [field]: !prevMode[field] }));
  };

  const handleSave = async () => {
    try {
      await saveUserData(userData);
      setEditMode({
        username: false,
        email: false,
        address: false,
        telephone: false,
        password: false,
      });
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDelete = async () => {
    try {
      await deleteUserAccount(userData.password);
      navigate('/');
    } catch (error) {
      console.error('Error deleting user account:', error);
    }
  };

  const handleChangePassword = async () => {
    try {
      await changeUserPassword(userData.password, newPassword);
      setNewPassword('');
      setEditMode((prevMode) => ({ ...prevMode, password: false }));
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <div className="profile-container">
      <h1>Profil</h1>
      <div className="profile-info">
        {Object.keys(userData).map((field) => (
          field !== 'id' && (
            <div key={field} className="profile-field">
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              {editMode[field] ? (
                field === 'address' ? (
                  <AddressAutocomplete
                    value={userData.address}
                    onChange={(value) => setUserData({ ...userData, address: value })}
                    className="profile-autocomplete-input"
                  />
                ) : (
                  <input
                    type="text"
                    value={userData[field]}
                    onChange={(e) => setUserData({ ...userData, [field]: e.target.value })}
                  />
                )
              ) : (
                <span>{userData[field]}</span>
              )}
              <button className="edit-button" onClick={() => handleEditToggle(field)}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
            </div>
          )
        ))}
        {editMode.password && (
          <div className="profile-field">
            <label>Nouveau mot de passe:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="profile-actions">
        <button onClick={handleSave}>Sauvegarder</button>
        <button onClick={handleLogout}>Se déconnecter</button>
        <button onClick={handleDelete}>Supprimer le compte</button>
      </div>
      {editMode.password && (
        <div className="change-password">
          <button onClick={handleChangePassword}>Changer le mot de passe</button>
        </div>
      )}
    </div>
  );
};

export default DelivererProfilePage;
