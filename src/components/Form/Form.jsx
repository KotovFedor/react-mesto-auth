import { useContext } from "react";

import SendContext from "../../contexts/SendContext";

import "./Form.css";

export default function Form({
  name,
  titleButton,
  children,
  isValid,
  onSubmit,
}) {
  const isSend = useContext(SendContext);

  return (
    <form noValidate name={name} onSubmit={onSubmit}>
      {children}
      {
        {
          login: (
            <button
              className={`login__button  ${
                isValid ? "" : "login__button_disable"
              }`}
              disabled={isSend || !isValid}
            ></button>
          ),
          popup: (
            <button
              className={`popup__submit ${
                isSend ? "popup__submit_loading" : ""
              } ${isValid ? "" : "popup__submit_disable"}`}
              disabled={isSend || !isValid}
            >
              {isSend ? "" : titleButton || "Сохранить"}
            </button>
          ),
        }[`${name === "signin" || name === "signup" ? "login" : "popup"}`]
      }
    </form>
  );
}
