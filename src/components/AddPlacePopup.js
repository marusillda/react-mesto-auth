import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ onAddPlace, isOpen, onClose, }) {
  const newCardNameRef = useRef();
  const newCardLinkRef = useRef();

  const handleSubmit = ((e) => {
    e.preventDefault();
    onAddPlace({
      name: newCardNameRef.current.value,
      link: newCardLinkRef.current.value,
    })
  });

  useEffect(() => {
    newCardNameRef.current.value = '';
    newCardLinkRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={newCardNameRef}
        type="text"
        id="card-name"
        name="name"
        className="popup__field"
        placeholder="Название"
        required minLength="2"
        maxLength="30"
      />
      <span className="popup__error card-name-error"></span>
      <input
        ref={newCardLinkRef}
        type="url" id="card-link"
        name="link"
        className="popup__field"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error card-link-error"></span>
    </PopupWithForm>
  )
}
