import Card from '../Card';
import React from 'react';




function Home({
    items,
    searchValue,
    setSearchValue,
    onChangeInput,
    onAddFavorite,
    onAddToCart,
    isLoading,
}) {
    

    const renderItems = () => {
        const filtredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()),
        );
        return (isLoading ? [...Array(8)] : filtredItems).map((el, index) => (
            <Card
                key={index}
                onFavorite={onAddFavorite}
                onPlus={(obj) => onAddToCart(obj)}
                loading={isLoading}
                {...el}
            />
        ))
    }


    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Searching for: "${searchValue}"` : 'All products'}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search" />
                    {searchValue && <img onClick={() => setSearchValue('')} className="cu-p clear" src="/img/btn-remove.svg" alt="Clean" />}
                    <input onChange={onChangeInput} value={searchValue} placeholder="Search..." />
                </div>
            </div>

            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>
        </div>
    )
}

export default Home