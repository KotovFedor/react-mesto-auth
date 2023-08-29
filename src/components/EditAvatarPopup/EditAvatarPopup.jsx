import { useRef } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isSend,
}) {
  const input = useRef();
  const { values, errors, isInputValid, isValid, handleChange, reset } =
    useFormValidation();

  function clear() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({ link: input.current.value }, reset);
  }

  return (
    <PopupWithForm
      name="edit-avatar-profile"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={clear}
      onSubmit={handleSubmit}
      isSend={isSend}
      isValid={isValid}
    >
      <div className="popup__set popup__set-bottom">
        <input
          ref={input}
          className={`popup__input popup__input_card_link ${
            isInputValid.avatar === undefined || isInputValid.avatar
              ? ""
              : "popup__input_type_error"
          }`}
          name="link"
          placeholder="Ссылка на картинку"
          type="url"
          required=""
          noValidate=""
          id="place-avatar-link-input"
          value={values.link ? values.link : ""}
          onChange={handleChange}
          disabled={isSend}
        />
        <span className="place-avatar-link-input-error popup__input-error">
          {errors.link}
        </span>
      </div>
    </PopupWithForm>
  );
}
