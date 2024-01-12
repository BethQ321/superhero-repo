import React from 'react';

const wishList = ({removeFromWishList, wishList, products, updateOrder, cart }) => {

//Convert Price
  const formatPrice = (price) => {
    return `$${(price / 100).toFixed(2)}`;
  };

// const calculateTotalPrice = (lineItem) => {
//   const product = products.find(product => product.id === lineItem.product_id);
//   return lineItem.quantity * (product ? product.price : 0);
// }

  return (
    <div>
      <h2>Wish List</h2>
      { wishList.length > 0 ? (
      <ul>
        { wishList.map(lineItem => {
            const product = products.find(product => product.id === lineItem.product_id) || {};
            return (
              <li key={lineItem.id}>
                {product.name}: {formatPrice(product.price)}
                <button onClick={() => { updateOrder({ ...cart, is_cart: true, lineItem });}}>Add to cart</button>
                <button onClick={() => removeFromList(lineItem.id)}>Remove From List</button>
              </li>
            );
          })}
      </ul>
        ) : (
          <p>Wish List is empty.</p> //Will display if the wishlist is empty 
        )}
    </div>
  );
};

export default wishList;


