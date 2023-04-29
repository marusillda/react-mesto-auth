import { useState, useEffect, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  const handleNameChange = ((e) => {
    setName(e.target.value);
  });

  const handleDescriptionChange = ((e) => {
    setDescription(e.target.value);
  });

  const handleSubmit = ((e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  });

  useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser, isOpen]);


  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="profile-name"
        value={name} name="name"
        className="popup__field"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        onChange={handleNameChange}
      />
      <span className="popup__error profile-name-error"></span>
      <input
        type="text"
        id="profile-about"
        value={description}
        name="about"
        className="popup__field"
        placeholder="Профессия"
        required
        minLength="2"
        maxLength="200"
        onChange={handleDescriptionChange}
      />
      <span className="popup__error profile-about-error"></span>
    </PopupWithForm>
  )
}
