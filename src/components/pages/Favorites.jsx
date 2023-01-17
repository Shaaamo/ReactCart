import React from 'react';
import { useContext } from 'react';
import Card from '../Card';
import { AppContext } from '../../App'

function Favorites({ onAddFavorite }) {
    const { favorites } = useContext(AppContext)

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>FAVORITES</h1>
            </div>

            <div className="d-flex flex-wrap">
                {favorites.map((el, index) => (
                    <Card
                        key={index}
                        favorited={true}
                        onFavorite={onAddFavorite}
                        {...el}
                    />
                ))}
            </div>
        </div>
    )
}

export default Favorites