import React, { useState, useContext } from "react";
import ContentLoader from "react-content-loader";
import { AppContext } from "../App";

function Card({ id, onFavorite, title, price, image, onPlus, favorited = false, loading = false, }) {

  const { isItemAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);


  const onClickPlus = () => {
    onPlus({ id, title, price, image })
  }

  const onClickFavorite = () => {
    onFavorite({ id, title, price, image })
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="card">
      {
        loading ? (
          <ContentLoader
            speed={2}
            width={155}
            height={250}
            viewBox="0 0 155 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
            <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
            <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
            <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
            <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
          </ContentLoader>
        ) : (
          <>
            <div className="favorite" onClick={onClickFavorite}>
              <img src={isFavorite ? "https://raw.githubusercontent.com/Shaaamo/ReactCart/master/public/img/heart-liked.svg" : "https://raw.githubusercontent.com/Shaaamo/ReactCart/master/public/img/heart-unliked.svg"} alt="Unliked" />
            </div>
            <img width={133} height={112} src={image} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Price:</span>
                <b>{price} zl.</b>
              </div>
              {onPlus && <img className="btn-plus" onClick={onClickPlus} src={isItemAdded(id) ? "https://raw.githubusercontent.com/Shaaamo/ReactCart/master/public/img/btn-checked.svg" : "https://raw.githubusercontent.com/Shaaamo/ReactCart/master/public/img/btn-plus.svg"} alt="Plus" />}
            </div>
          </>
        )}
    </div>
  );
}

export default Card;