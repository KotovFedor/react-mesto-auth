import { useEffect, useState } from "react";
import likeImg from "../../images/element__icon.svg";
import api from "../../utils/api";

export default function BtnLike({ likes, myId, cardId }) {
  const [isLike, setIsLike] = useState(false);
  const [count, setCount] = useState(likes.length);

  useEffect(() => {
    setIsLike(likes.some((item) => myId === item._id));
  }, [likes, myId]);

  function handleLike() {
    if (isLike) {
      api
        .deleteLike(cardId)
        .then((res) => {
          setIsLike(false);
          setCount(res.likes.length);
        })
        .catch((error) => console.log(error));
    } else {
      api
        .addLike(cardId)
        .then((res) => {
          setIsLike(true);
          setCount(res.likes.length);
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className="like">
      <button className="button element__button" type="button">
        <img
          className={`element__icon ${isLike ? "element__icon_active" : ""}`}
          src={likeImg}
          alt="Кнопка лайка"
          onClick={handleLike}
        />
      </button>
      <p className="like-count">{count}</p>
    </div>
  );
}
