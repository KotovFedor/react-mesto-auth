import Popup from "../Popup/Popup";
import "./InfoTooltip.css";

export default function InfoTooltip({ name, isSuccessful, isOpen, onClose }) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <div
        className={`popup__registration-image ${
          !isSuccessful ? "popup__registration-image_type_error" : ""
        }`}
      />
      <h2 className="popup__registration-title">
        {isSuccessful
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте ещё раз."}
      </h2>
    </Popup>
  );
}
