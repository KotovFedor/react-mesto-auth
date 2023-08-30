import Enter from "../Enter/Enter";
import useFormValidation from "../../utils/useFormValidation";
import Input from "../Input/Input";
import { auth } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Register({ setIsSend, setIsSuccessful, setIsError }) {
  const { values, errors, isValid, isInputValid, handleChange } =
    useFormValidation();
  const navigate = useNavigate();

  function onRegister(evt) {
    evt.preventDefault();
    setIsSend(true);
    auth(values.password, values.email)
      .then((res) => {
        setIsSuccessful(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsError(true);
        console.error(`Ошибка при регистрации ${err}`);
      })
      .finally(() => setIsSend(false));
  }

  return (
    <Enter name="signup" onSubmit={onRegister} isValid={isValid}>
      <Input
        name="email"
        type="email"
        placeholder={"Email"}
        value={values.email}
        onChange={handleChange}
        isInputValid={isInputValid.email}
        error={errors.email}
      />
      <Input
        name="password"
        type="password"
        placeholder={"Пароль"}
        minLength={3}
        value={values.password}
        onChange={handleChange}
        isInputValid={isInputValid.password}
        error={errors.password}
      />
    </Enter>
  );
}
