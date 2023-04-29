import { useRef, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const avatarRef = useRef();

  const handleSubmit = ((e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  });

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        id="avatar-link"
        name="link"
        className="popup__field"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error avatar-link-error"></span>
    </PopupWithForm>
  )
}
