import { useState, useEffect } from 'react';
import api from '../utils/Api.js';
import Header from './Header.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './Register.js';
import Login from './Login.js';
import { register, authorize, getUserData } from '../utils/AuthApi.js';

export default function App() {

  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    _id: "",
    email: "",
  });
  const [token, setToken] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const registerUser = ({ email, password }) => {
    register(email, password)
      .then((res) => {
        setRegistrationStatus(true);
      })
      .catch((error) => {
        console.log(`Ошибка регистрации пользователя: ${error}`);
        setRegistrationStatus(false);
      })
      .finally(() => {
        setIsRegistered(true);
      });
  }

  const loginUser = ({ password, email }) => {
    authorize(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setToken(res.token);
      })
      .catch((error) => {
        console.log(`Ошибка авторизации пользователя: ${error}`);
        setIsLoginFailed(true);
      })
  }

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [])

  useEffect(() => {
    if (!token) {
      return;
    }
    getUserData(token).then(userData => {
      setUserData(userData);
      setIsLoggedIn(true);
      navigate('/', { replace: true });
    })
      .catch(error => console.log(`Ошибка проверки токена: ${error}`));
  }, [token, navigate])

  const handleLoginTooltipClose = () => {
    setIsLoginFailed(false);
  }

  const handleRegisterTooltipClose = () => {
    if (isRegistered && registrationStatus) {
      navigate('/', { replace: true });
    }
    setIsRegistered(false);
  }

  const handleCardLike = ((card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const promise = isLiked ? api.unlikeCard(card._id) : api.likeCard(card._id);
    promise.then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch(error => console.log(`Ошибка лайка и дизлайка: ${error}`));
  });

  const handleCardDelete = ((cardId) => {
    api.deleteCard(cardId).then(() => {
      setCards((state) => state.filter((c) => c._id !== cardId));
    })
      .catch(error => console.log(`Ошибка при удалении карточки: ${error}`));
  });

  const handleUpdateUser = ((userProfile) => {
    api.changeUserProfile(userProfile).then(user => {
      setCurrentUser(user);
      closeAllPopups();
    })
      .catch(error => console.log(`Ошибка обновления профиля пользователя: ${error}`));
  });

  const handleUpdateAvatar = (({ avatar }) => {
    api.changeAvatar(avatar).then(user => {
      setCurrentUser(user);
      closeAllPopups();
    })
      .catch(error => console.log(`Ошибка обновления аватара: ${error}`));
  });

  const handleAddPlaceSubmit = ((card) => {
    api.addNewCard(card).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch(error => console.log(`Ошибка добавления новой карточки: ${error}`));
  });

  useEffect(() => {
    api.getUserProfile().then(user => {
      setCurrentUser(user);
    })
      .catch(error => console.log(`Ошибка загрузки профиля пользователя: ${error}`));
  }, []);

  useEffect(() => {
    api.getInitialCards().then(cards => {
      setCards(cards);
    })
      .catch(error => console.log(`Ошибка загрузки начальных карточек: ${error}`));
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userData={userData} />
        <Routes>
          <Route path="/" element={
            <Main
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />} />
          <Route path="/sign-up" element={
            <Register
              registerUser={registerUser}
              buttonText="Зарегистрироваться"
              isRegistered={isRegistered}
              registrationStatus={registrationStatus}
              onClose={handleRegisterTooltipClose}
            />} />
          <Route path="/sign-in" element={
            <Login
              loginUser={loginUser}
              isLoginFailed={isLoginFailed}
              onClose={handleLoginTooltipClose}
              buttonText="Войти"
            />} />
        </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          name="delete-confirm"
          title="Вы уверены?"
          buttonText="Да"
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div >
    </CurrentUserContext.Provider>
  );
}
