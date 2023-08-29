import { useContext, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isSend,
}) {
  const currentUser = useContext(CurrentUserContext);

  const {
    values,
    errors,
    isValid,
    isInputValid,
    handleChange,
    reset,
    setValue,
  } = useFormValidation();

  useEffect(() => {
    setValue("name", currentUser.name);
    setValue("profession", currentUser.about);
  }, [currentUser, setValue]);

  function clear() {
    onClose();
    reset({ name: currentUser.name, profession: currentUser.about });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name: values.name, profession: values.profession }, reset);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={clear}
      isValid={isValid}
      isSend={isSend}
      onSubmit={handleSubmit}
    >
      {" "}
      <div className="popup__set popup__set-top">
        <input
          className={`popup__input popup__input_user_name ${
            isInputValid.name === undefined || isInputValid.name
              ? ""
              : "popup__input_type_error"
          }`}
          placeholder="Жак-Ив Кусто"
          name="name"
          type="text"
          minLength={2}
          maxLength={40}
          required=""
          noValidate=""
          id="name-input"
          value={values.name ? values.name : ""}
          onChange={handleChange}
          disabled={isSend}
        />
        <span className="name-input-error popup__input-error">
          {errors.name}
        </span>
      </div>
      <div className="popup__set popup__set-bottom">
        <input
          className={`popup__input popup__input_user_profession ${
            isInputValid.profession === undefined || isInputValid.profession
              ? ""
              : "popup__input_type_error"
          }`}
          placeholder="Исследователь океана"
          name="profession"
          type="text"
          minLength={2}
          maxLength={200}
          required=""
          noValidate=""
          id="profession-input"
          value={values.profession ? values.profession : ""}
          onChange={handleChange}
          disabled={isSend}
        />
        <span className="profession-input-error popup__input-error">
          {errors.profession}
        </span>
      </div>
    </PopupWithForm>
  );
}
