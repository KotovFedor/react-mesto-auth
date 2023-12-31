import Enter from "../Enter/Enter";
import useFormValidation from "../../utils/useFormValidation";
import Input from "../Input/Input";
import { useNavigate } from "react-router-dom";
import { authorization } from "../../utils/auth";

export default function Login({ setIsSend, setLoggedIn, setIsError }) {
  const { values, errors, isValid, isInputValid, handleChange } =
    useFormValidation();
  const navigate = useNavigate();

  function onLogin(evt) {
    evt.preventDefault();
    setIsSend(true);
    authorization(values.password, values.email)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setIsError(true);
        console.error(`Ошибкак при авторизации ${err}`);
      })
      .finally(() => setIsSend(false));
  }

  return (
    <Enter name="signin" onSubmit={onLogin} isValid={isValid}>
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
