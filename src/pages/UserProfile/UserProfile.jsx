import React, { useState, useEffect } from 'react';
import { Avatar, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  useLazyUpdateEmailQuery,
  useLazyChangeNumberQuery,
  useLazyChangeNameQuery,
  useLazyUploadAvatarQuery,
  } from "../../services/userService/userService";
import './UserProfile.css'

export function UserProfile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    avatar: '',
    email: '',
    name: '',
    number: '',
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  }, []);

  const [updateAvatar] = useLazyUploadAvatarQuery();
  const [updateLogin] = useLazyUpdateEmailQuery();
  const [updateName] = useLazyChangeNameQuery();
  const [updatePhoneNumber] = useLazyChangeNumberQuery();

  const handleAvatarChange = (fileList) => {
    if (fileList.length > 0) {
      const formData = new FormData();
      formData.append('avatar', fileList[0]);
      formData.append('user', JSON.stringify(userDetails));
      updateAvatar(formData);
    }
  };

  const handleEmailChange = (newEmail) => {
    updateLogin({ oldEmail: userDetails.email, newEmail });
  };

  const handleNameChange = (newName) => {
    updateName({ email: userDetails.email, newName });
  };

  const handlePhoneNumberChange = (newNumber) => {
    updatePhoneNumber({ email: userDetails.email, newNumber });
  };

  const handleSaveChanges = async () => {
    await Promise.all([
      handleNameChange(userDetails.name),
      handlePhoneNumberChange(userDetails.number),
      handleEmailChange(userDetails.email),
      handleAvatarChange(userDetails.avatar),
    ]);
  };

  return (
    <section className="user-profile">
      <header className="user-profile-header">
        <h1>Личный кабинет</h1>
        <Button onClick={() => navigate('/dashboard')}>Назад</Button>
      </header>

      <div className="user-avatar">
        <Avatar size={150} src={`http://localhost:3555/uploads/${userDetails.avatar}`} />
      </div>

      <div className="user-info">
        <h1>
          Профиль
        </h1>
        <h3>
          Добро пожаловать, <span>{userDetails.name}</span>!
        </h3>
        <h2>Email: <span>{userDetails.email}</span></h2>
        <h2>Телефон: <span>{userDetails.number}</span></h2>
        <Button onClick={() => setEditMode(!editMode)}>Редактировать</Button>
      </div>

      {editMode && (
        <div className="edit-profile">
          <label htmlFor="avatar-upload" className="avatar-upload-label">
            <Avatar size={42} src={`http://localhost:3555/uploads/${userDetails.avatar}`} />
            <span>Нажмите здесь, чтобы выбрать новый аватар</span>
            <input
              id="avatar-upload"
              type="file"
              hidden
              onChange={(e) => handleAvatarChange(e.target.files)}
            />
          </label>

          <input
            className="input-field"
            placeholder="Новое имя"
            value={userDetails.name}
            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
          />

          <input
            className="input-field"
            placeholder="Новый email"
            value={userDetails.email}
            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
          />

          <input
            className="input-field"
            placeholder="Новый телефон"
            value={userDetails.number}
            onChange={(e) => setUserDetails({ ...userDetails, number: e.target.value })}
          />

          <Button className="save-button" onClick={handleSaveChanges}>
            Сохранить
          </Button>
        </div>
      )}
    </section>
  );
}
