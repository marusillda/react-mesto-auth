import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';

export default function Login({ loginUser, buttonText }) {
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
          required
        />
        <input
          className="login__field"
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="login__submit-button"
          aria-label={`Кнопка ${buttonText}`}
        >
          Войти
        </button>
      </form>
    </div>
  )
}
