import logo from "../../images/header__logo.svg";
import { Link, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Header.css";

export default function Header({ name, dataUser, setLoggedIn }) {
  const [count, setCount] = useState(0);

  function handelClick() {
    count === 0 ? setCount(1) : setCount(0);
  }

  function onSignOut() {
    setCount(0);
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  useEffect(() => {
    function closeBurgerForResize() {
      if (document.documentElement.clientWidth > "767") {
        setCount(0);
        window.removeEventListener("resize", closeBurgerForResize);
      }
    }
    if (count === 1) {
      window.addEventListener("resize", closeBurgerForResize);
      return () => window.removeEventListener("resize", closeBurgerForResize);
    }
  }, [count]);
  return (
    <header className="header">
      <a className="link" href="#" target="_blank">
        <img className="header__logo" src={logo} alt='Логотип "Место"' />
      </a>
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link to={"/sign-in"} className="header__link">
              {"Войти"}
            </Link>
          }
        />

        <Route
          path="/sign-in"
          element={
            <Link to={"/sign-up"} className="header__link">
              {"Регистрация"}
            </Link>
          }
        />

        <Route
          path="/"
          element={
            <>
              <div
                className={`header__email-container ${
                  count !== 0 ? "header__email-container_opened" : ""
                }`}
              >
                <p className="header__email">{dataUser}</p>
                <Link
                  to={`/sign-in`}
                  className="header__unlogin"
                  onClick={onSignOut}
                >
                  Выйти
                </Link>
              </div>
              <button
                className={`header__button ${
                  count !== 0 ? "header__button_active" : ""
                }`}
                onClick={handelClick}
              ></button>
            </>
          }
        />
      </Routes>
    </header>
  );
}
