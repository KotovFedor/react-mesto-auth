import "./Popup.css";
import closeIcon from "../../images/popup__close-icon.svg";

export default function Popup({ name, children, isOpen, onClose }) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={onClose}
    >
      <div
        className={`${
          name === "image" ? "popup__image-container" : "popup__container"
        } ${
          name === "success" || name === "error"
            ? "popup__registration-container"
            : ""
        }`}
        onMouseDown={(evt) => evt.stopPropagation()}
      >
        <button
          className="button popup__close-button"
          type="button"
          onClick={onClose}
        >
          <img
            className="popup__close-icon"
            src={closeIcon}
            alt="Кнопка закрытия формы"
          />
        </button>
        {children}
      </div>
    </div>
  );
}
