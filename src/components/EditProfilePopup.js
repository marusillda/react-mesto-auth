import { useEffect, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useInput from '../hooks/useInput';

export default function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const name = useInput('', { isEmpty: true, minLength: 2 });
  const description = useInput('', { isEmpty: true, minLength: 2 });

  const currentUser = useContext(CurrentUserContext);

  const handleSubmit = ((e) => {
    e.preventDefault();
    onUpdateUser({
      name: name.value,
      about: description.value,
    });
  });

  useEffect(() => {
    name.setValue(currentUser.name || '');
    description.setValue(currentUser.about || '');
    // eslint-disable-next-line
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={!name.inputValid || !description.inputValid}
    >
      <input
        type="text"
        id="profile-name"
        value={name.value}
        name="name"
        className="popup__field"
        placeholder="Имя"
        required
        onChange={name.onChange}
        onFocus={name.onFocus}
      />
      <span className="popup__error profile-name-error">
        {name.isDirty && name.inputErrors.join(' ')}
      </span>
      <input
        type="text"
        id="profile-about"
        value={description.value}
        name="about"
        className="popup__field"
        placeholder="Профессия"
        required
        onChange={description.onChange}
        onFocus={description.onFocus}
      />
      <span className="popup__error profile-about-error">
        {description.isDirty && description.inputErrors.join(' ')}
      </span>
    </PopupWithForm>
  )
}
