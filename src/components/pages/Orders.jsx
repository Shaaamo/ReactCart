import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import Card from '../Card';


function Orders() {
    const { onAddFavorite, onAddToCart } = useContext(AppContext)
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('https://63a4e3fe2a73744b0081b2ee.mockapi.io/orders')
                setOrders(data.map(obj => obj.items).flat())
                setIsLoading(false)
            } catch (error) {
                console.log(error, 'Error while getting the order');
            }
        })();
    }, [])

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>My Orders</h1>
            </div>

            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(8)] : orders).map((el, index) => (
                    <Card
                        key={index}
                        onFavorite={onAddFavorite}
                        loading={isLoading}
                        {...el}
                    />
                ))}
            </div>
        </div>
    )
}

export default Orders