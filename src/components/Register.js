import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import InfoTooltip from './InfoTooltip';

export default function Register({ registerUser, buttonText, isRegistered, registrationStatus, onClose }) {
  const { form, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(form);
  };

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__field"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="register__field"
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="register__submit-button"
          aria-label={`Кнопка ${buttonText}`}
        >
          {buttonText}
        </button>
      </form>
      <div className="register__signin">
        <p className="register__signin-link">Уже зарегистрированы? </p>
        <Link to="/sign-in" className="register__signin-link">Войти</Link>
      </div>

      {isRegistered && (<InfoTooltip type={registrationStatus} onClose={onClose} />)}

    </div>
  )
}
