import closeIcon from "../../images/popup__close-icon.svg";

export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <section
      className={`popup popup_card-view ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
      aria-label="Попап для просмотра фотографий"
    >
      <div
        className="popup__container-card-view"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          className="button popup__close-button popup__close-button-card-view"
          type="button"
          onClick={onClose}
        >
          <img
            className="popup__close-icon"
            src={closeIcon}
            alt="Кнопка закрытия формы"
          />
        </button>
        <img
          className="popup__image"
          src={card.link ? card.link : "#"}
          alt={card.name ? card.name : "#"}
        />
        <h2 className="popup__text-card-view">{card.name}</h2>
      </div>
    </section>
  );
}
