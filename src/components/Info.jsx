import React, { useContext } from 'react';
import { AppContext } from '../App';

function Info({ image, title, description }) {
    const { setCartOpened } = useContext(AppContext)

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width="120px" src={image} alt="Empty" />
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <button onClick={() => setCartOpened(false)} className="greenButton">
                <img src="https://raw.githubusercontent.com/Shaaamo/ReactCart/master/public/img/arrow.svg" alt="Arrow" />
                Get back
            </button>
        </div>
    );
}

export default Info;