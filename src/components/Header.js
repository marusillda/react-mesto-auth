import headerLogo from '../images/header-logo.svg';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ userData, signOut }) {
  const { pathname } = useLocation();
  const showRegistration = pathname === '/sign-in';
  const showLogin = pathname === '/sign-up';

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип сайта Место" />
      <div className="header__navbar">
        {showRegistration && (<Link to="/sign-up" className="header__navbar-link">Регистрация</Link>)}
        {showLogin && (<Link to="/sign-in" className="header__navbar-link">Войти</Link>)}
        {!showLogin && !showRegistration && (
          <>
            <div className="header__navbar-user">{userData.email}</div>
            <Link to="/sign-in" className="header__navbar-link header__navbar-link_exit" onClick={signOut}>Выйти</Link>
          </>)}
      </div>
    </header>
  )
}
