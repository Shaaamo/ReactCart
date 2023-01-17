import React, { createContext } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';


import Home from './components/pages/Home';
import Favorites from './components/pages/Favorites';
import Orders from './components/pages/Orders';

export const AppContext = createContext({});

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    try {
      async function fetchData() {
        const cartResponse = await axios.get('https://63a4e3fe2a73744b0081b2ee.mockapi.io/cart')
        const favoritesResponse = await axios.get('https://63a4e3fe2a73744b0081b2ee.mockapi.io/Favorites')
        const itemsResponse = await axios.get('https://63a4e3fe2a73744b0081b2ee.mockapi.io/items')

        setIsLoading(false)

        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)
      }
      fetchData()
    } catch (error) {
      console.log(error, "Can't get data from database");
    }
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://63a4e3fe2a73744b0081b2ee.mockapi.io/cart/${obj.id}`)
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
      } else {
        axios.post('https://63a4e3fe2a73744b0081b2ee.mockapi.io/cart', obj)
        setCartItems(prev => [...prev, obj])
      }
    } catch (error) {
      console.log("Can't add to cart(((", error);
    }
  }

  const onAddFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => favObj.id === obj.id)) {
        axios.delete(`https://63a4e3fe2a73744b0081b2ee.mockapi.io/Favorites/${obj.id}`)
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
      } else {
        const { data } = await axios.post('https://63a4e3fe2a73744b0081b2ee.mockapi.io/Favorites', obj)
        setFavorites(prev => [...prev, data])
      }
    } catch (error) {
      console.log("Can't add to favorites(((", error);
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://63a4e3fe2a73744b0081b2ee.mockapi.io/cart/${id}`)
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const onChangeInput = event => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{
      items,
      cartItems,
      favorites,
      isItemAdded,
      setCartOpened,
      setCartItems,
      onAddFavorite,
      onAddToCart,
    }}>
      <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route path="/ReactCart" element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeInput={onChangeInput}
              onAddFavorite={onAddFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />}
          />
          <Route path="/favorites" element={
            <Favorites
              onAddFavorite={onAddFavorite}
            />}
          />
          <Route path="/orders" element={
            <Orders
            />}
          />
        </Routes>

      </div>
    </AppContext.Provider>
  );
}

export default App;
