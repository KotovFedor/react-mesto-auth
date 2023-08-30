import editImage from "../../images/edit-image.svg";
import addImage from "../../images/add-image.svg";
import { useContext } from "react";

import Card from "../Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Main({
  openProfile,
  openCard,
  openAvatar,
  onCardClick,
  openDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <div className="avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar ? currentUser.avatar : "#"}
            alt="Аватар профиля"
          />
          <button className="avatar-edit-button" onClick={openAvatar} />
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">
              {currentUser.name ? currentUser.name : ""}
            </h1>
            <button
              className="button profile__edit-button"
              type="button"
              onClick={openProfile}
            >
              <img
                className="profile__edit-image"
                src={editImage}
                alt="Кнопка редактирования"
              />
            </button>
          </div>
          <p className="profile__profession">
            {currentUser.about ? currentUser.about : ""}
          </p>
        </div>
        <button
          className="button profile__add-button"
          type="button"
          onClick={openCard}
        >
          <img
            className="profile__add-image"
            src={addImage}
            alt="Кнопка добавления карточки"
          />
        </button>
      </section>
      <template id="card-tempalte" />
      <section className="elements">
        <ul className="element-grid">
          {
            cards.map((data) => {
              return (
                <li className="element" key={data._id}>
                  <Card
                    card={data}
                    onCardClick={onCardClick}
                    openDelete={openDelete}
                  ></Card>
                </li>
              );
            })
            // .reverse()
          }
        </ul>
      </section>
    </>
  );
}
