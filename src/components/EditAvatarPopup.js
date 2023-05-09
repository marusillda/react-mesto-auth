import { useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
import useInput from '../hooks/useInput';

export default function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const link = useInput('', { isEmpty: true, isURL: true });

  const handleSubmit = ((e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: link.value,
    });
  });

  useEffect(() => {
    link.clearValue();
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={!link.inputValid}
    >
      <input
        type="url"
        id="avatar-link"
        name="link"
        className="popup__field"
        placeholder="Ссылка на картинку"
        value={link.value}
        onChange={link.onChange}
        onFocus={link.onFocus}
        required
      />
      <span className="popup__error profile-name-error">
        {link.isDirty && link.inputErrors.join(' ')}
      </span>
    </PopupWithForm>
  )
}
