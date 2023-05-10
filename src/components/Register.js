import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import InfoTooltip from './InfoTooltip';
import useInput from '../hooks/useInput';

export default function Register({ registerUser, buttonText, isRegistered, registrationStatus, onClose }) {
  const email = useInput('', { isEmpty: true, minLength: 5, isEmail: true });
  const password = useInput('', { isEmpty: true, minLength: 6 });

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
          value={email.value}
          onChange={(e) => {
            email.onChange(e);
            handleChange(e);
          }}
          onFocus={email.onFocus}
          autoComplete="username"
          required
        />
        <span className="popup__error profile-name-error">
          {email.isDirty && email.inputErrors.join(' ')}
        </span>
        <input
          className="register__field"
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          value={password.value}
          onChange={(e) => {
            password.onChange(e);
            handleChange(e);
          }}
          onFocus={password.onFocus}
          autoComplete="current-password"
          required
        />
        <span className="popup__error profile-name-error">
          {password.isDirty && password.inputErrors.join(' ')}
        </span>
        <button
          disabled={!email.inputValid || !password.inputValid}
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
