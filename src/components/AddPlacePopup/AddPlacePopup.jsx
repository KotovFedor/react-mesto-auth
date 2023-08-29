import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isSend }) {
  const { values, errors, isValid, isInputValid, handleChange, reset } =
    useFormValidation();

  function clear() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name: values.name, link: values.link }, reset);
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      titleBtn="Создать"
      isOpen={isOpen}
      onClose={clear}
      isSend={isSend}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div className="popup__set popup__set-top">
        <input
          className={`popup__input popup__input_card_name `}
          name="name"
          placeholder="Название"
          type="text"
          minLength={2}
          maxLength={30}
          required=""
          noValidate=""
          id="place-name-input"
          value={values.name ? values.name : ""}
          onChange={handleChange}
          disabled={isSend}
        />
        <span className="place-name-input-error popup__input-error">
          {errors.name}
        </span>
      </div>
      <div className="popup__set popup__set-bottom">
        <input
          className={`popup__input popup__input_card_link ${
            isInputValid.link === undefined || isInputValid.link
              ? ""
              : "popup__input_type_error"
          }`}
          name="link"
          placeholder="Ссылка на картинку"
          type="url"
          required=""
          noValidate=""
          id="place-link-input"
          value={values.link ? values.link : ""}
          onChange={handleChange}
          disabled={isSend}
        />
        <span className="place-link-input-error popup__input-error">
          {errors.link}
        </span>
      </div>
    </PopupWithForm>
  );
}
