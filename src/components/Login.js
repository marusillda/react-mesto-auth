import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import InfoTooltip from './InfoTooltip';

export default function Login({ loginUser, buttonText, isLoginFailed, onClose }) {
  const { form, handleChange } = useForm({
    username: "",
    password: "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    loginUser(form);
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__field"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          autoComplete="username"
          required
        />
        <input
          className="login__field"
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
        <button
          type="submit"
          className="login__submit-button"
          aria-label={`Кнопка ${buttonText}`}
        >
          {buttonText}
        </button>
      </form>
      {isLoginFailed && (<InfoTooltip type={false} onClose={onClose} />)}
    </div>
  )
}
