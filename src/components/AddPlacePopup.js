import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useInput from '../hooks/useInput';

export default function AddPlacePopup({ onAddPlace, isOpen, onClose, }) {
  const cardName = useInput('', { isEmpty: true, minLength: 2 });
  const link = useInput('', { isEmpty: true, isURL: true });

  const handleSubmit = ((e) => {
    e.preventDefault();
    onAddPlace({
      name: cardName.value,
      link: link.value,
    })
  });

  useEffect(() => {
    cardName.clearValue();
    link.clearValue();
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={!cardName.inputValid || !link.inputValid}
    >
      <input
        type="text"
        id="card-name"
        name="name"
        className="popup__field"
        placeholder="Название"
        required
        value={cardName.value}
        onChange={cardName.onChange}
        onFocus={cardName.onFocus}
      />
      <span className="popup__error card-name-error">
        {cardName.isDirty && cardName.inputErrors.join(' ')}
      </span>
      <input
        type="url" id="card-link"
        name="link"
        className="popup__field"
        placeholder="Ссылка на картинку"
        required
        value={link.value}
        onChange={link.onChange}
        onFocus={link.onFocus}
      />
      <span className="popup__error card-link-error">
        {link.isDirty && link.inputErrors.join(' ')}
      </span>
    </PopupWithForm>
  )
}
