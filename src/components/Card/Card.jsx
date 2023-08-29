import CurrentUserContext from "../../contexts/CurrentUserContext";
import BtnLike from "../BtnLike/BtnLike.jsx";
import { useContext } from "react";

export default function Card({ card, onCardClick, openDelete }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <>
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />

      {currentUser._id === card.owner._id && (
        <button
          className="button element__trash-button"
          onClick={() => openDelete(card._id)}
        />
      )}

      <div className="element__container">
        <h2 className="element__text">{card.name}</h2>
        <BtnLike
          likes={card.likes}
          myId={currentUser._id}
          cardId={card._id}
        ></BtnLike>
      </div>
    </>
  );
}
