import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import SendContext from "../contexts/SendContext";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import ProtectedMain from "./ProtectedMain/ProtectedMain.jsx";
import { registration, authorization, getUserData } from "../utils/auth";
import InfoTooltip from "./InfoTooltip/InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopup] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isSend, setIsSend] = useState(false);
  // const [isImagePopupOpen, setImagePopup] = useState(false);
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState("");

  const [cards, setCards] = useState([]);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [deleteCardId, setDeleteCardId] = useState("");

  const [isSuccessful, setIsSuccessful] = useState(false);
  // const [isError, setIsError] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false);
  const [isCheckToken, setIsCheckToken] = useState(true);

  const navigate = useNavigate();
  //переменная состояния попапов
  const isOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isDeletePopupOpen ||
    isImagePopupOpen ||
    isResultPopupOpen;

  const closeAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setDeletePopupOpen(false);
    setIsImagePopup(false);
    setIsSuccessful(false);
  }, []);

  // const setStatestoClosePopups = useCallback(() => {
  //   setIsEditAvatarPopupOpen(false);
  //   setIsEditProfilePopupOpen(false);
  //   setIsAddPlacePopupOpen(false);
  //   setIsImagePopup(false);
  //   setDeletePopupOpen(false);
  // }, []);

  // const closePopupByEscape = useCallback(
  //   (evt) => {
  //     if (evt.key === "Escape") {
  //       setStatestoClosePopups();
  //       document.removeEventListener("keydown", closePopupByEscape);
  //     }
  //   },
  //   [setStatestoClosePopups]
  // );

  const handleSubmit = useCallback(
    (request, textError) => {
      setIsSend(true);
      request()
        .then(closeAllPopups)
        .catch((err) => console.error(`${textError} ${err}`))
        .finally(() => setIsSend(false));
    },
    [closeAllPopups]
  );

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    // setEventListenerForDocument();
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    // setEventListenerForDocument();
  }

  // function handleAddPlaceClick() {
  //   setIsAddPlacePopupOpen(true);
  //   setEventListenerForDocument();
  // }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopup(true);
    // setEventListenerForDocument();
  }

  function handleDeletePopupClick(cardId) {
    setDeleteCardId(cardId);
    setDeletePopupOpen(true);
    // setEventListenerForDocument();
  }

  // function closeAllPopupsByOverLay(evt) {
  //   if (evt.target === evt.currentTarget) {
  //     closeAllPopups();
  //     document.removeEventListener("keydown", closePopupByEscape);
  //   }
  // }

  // function setEventListenerForDocument() {
  //   document.addEventListener("keydown", closePopupByEscape);
  // }

  useEffect(() => {
    function closePopupsByEsc(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closePopupsByEsc);
      return () => {
        document.removeEventListener("keydown", closePopupsByEsc);
      };
    }
  }, [isOpen, closeAllPopups]);

  useEffect(() => {
    setIsLoadingCards(true);
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser);
        setCards(dataCards);
        setIsLoadingCards(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (localStorage.jwt) {
      getUserData(localStorage.jwt)
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          setIsCheckToken(false);
        })
        .catch((err) =>
          console.error(`Ошибкак авторизации при повторном входе ${err}`)
        );
    } else {
      setLoggedIn(false);
      setIsCheckToken(false);
    }
  }, [loggedIn]);

  const handleAddPlaceClick = useCallback(() => {
    setIsAddPlacePopupOpen(true);
  }, []);

  function handleDeleteClick(evt) {
    evt.preventDefault();
    setIsSend(true);
    api
      .deleteCard(deleteCardId)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== deleteCardId;
          })
        );
        closeAllPopups();
        setIsSend(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsSend(false));
  }

  // function handleUpdateUser(dataUser, reset) {
  //   setIsSend(true);
  //   api
  //     .sendUserInfo(dataUser)
  //     .then((res) => {
  //       setCurrentUser(res);
  //       closeAllPopups();
  //       reset();
  //       setIsSend(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .finally(() => setIsSend(false));
  // }

  function handleUpdateAvatar(dataUser, reset) {
    setIsSend(true);
    api
      .sendUserAvatar(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
        setIsSend(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsSend(false));
  }

  function handleAddPlaceSubmit(dataCards, reset) {
    setIsSend(true);
    api
      .addCard(dataCards)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        reset();
        setIsSend(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsSend(false));
  }

  function handleLogin(password, email) {
    setIsSend(true);
    authorization(password, email)
      .then((res) => {
        console.log(res);
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        window.scrollTo(0, 0);
        navigate("/");
      })
      .catch((err) => {
        setIsResultPopupOpen(true);
        setIsSuccessful(false);
        console.error(`Ошибка при авторизации ${err}`);
      })
      .finally(() => setIsSend(false));
  }

  function handleRegister(password, email) {
    setIsSend(true);
    registration(password, email)
      .then(() => {
        setIsResultPopupOpen(true);
        setIsSuccessful(true);
        window.scrollTo(0, 0);
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsResultPopupOpen(true);
        setIsSuccessful(false);
        console.error(`Ошибка при регистрации ${err}`);
      })
      .finally(() => setIsSend(false));
  }

  const handleUpdateUser = useCallback(
    (userEmail) => {
      function makeRequest() {
        return api.sendUserInfo(userEmail).then((res) => {
          setCurrentUser(res);
        });
      }
      handleSubmit(makeRequest, "Ошибка при редактировании профиля");
    },
    [handleSubmit]
  );

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="wrapper">
        <SendContext.Provider value={isSend}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={ProtectedMain}
                  userEmail={userEmail}
                  openCard={handleAddPlaceClick}
                  openProfile={handleEditProfileClick}
                  openAvatar={handleEditAvatarClick}
                  openDelete={handleDeletePopupClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  isLoading={isLoadingCards}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  isCheckToken={isCheckToken}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <>
                  <Header name="signup" />
                  <Main
                    name="signup"
                    isCheckToken={isCheckToken}
                    handleRegister={handleRegister}
                  />
                </>
              }
            />
            <Route
              path="/sign-in"
              element={
                loggedIn ? (
                  <Navigate to={"/"} />
                ) : (
                  <>
                    <Header name="signin" />
                    <Main
                      name="signin"
                      isCheckToken={isCheckToken}
                      handleLogin={handleLogin}
                    />
                  </>
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SendContext.Provider>

        <Footer />
        <SendContext.Provider value={isSend}>
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            isSend={isSend}
          ></EditProfilePopup>

          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            isSend={isSend}
          ></AddPlacePopup>

          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            isSend={isSend}
          ></EditAvatarPopup>

          <PopupWithForm
            name="delete-card"
            title="Вы уверены?"
            titleBtn="Да"
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleDeleteClick}
            isSend={isSend}
          />
          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
        </SendContext.Provider>
        <InfoTooltip
          name="result"
          isSuccessful={isSuccessful}
          isOpen={isResultPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
