import Header from "../Header/Header";
import Main from "../Main/Main";

export default function ProtectedMain({ userEmail, setLoggedIn, ...props }) {
  return (
    <>
      <Header dataUser={userEmail} setLoggedIn={setLoggedIn} />
      <Main name="main" {...props} />
    </>
  );
}
