import { memo } from "react";

import Register from "../Register/Register";
import Login from "../Login/Login";
import HomePage from "../HomePage/HomePage";
import "./Main.css";

const Main = memo(
  ({
    name,
    openCard,
    openProfile,
    openAvatar,
    openDelete,
    onCardClick,
    onCardLike,
    cards,
    isLoading,
    setIsSend,
    setLoggedIn,
    setIsSuccessful,
    setIsError,
  }) => {
    return (
      <main className="main">
        {name === "main" ? (
          <HomePage
            openCard={openCard}
            openProfile={openProfile}
            openAvatar={openAvatar}
            openDelete={openDelete}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            cards={cards}
            isLoading={isLoading}
          />
        ) : name === "signup" ? (
          <Register
            setIsSend={setIsSend}
            setIsSuccessful={setIsSuccessful}
            setIsError={setIsError}
          />
        ) : (
          <Login
            setIsSend={setIsSend}
            setLoggedIn={setLoggedIn}
            setIsSuccessful={setIsSuccessful}
            setIsError={setIsError}
          />
        )}
      </main>
    );
  }
);

export default Main;
