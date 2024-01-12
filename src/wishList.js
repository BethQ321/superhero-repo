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
    {wishList.length > 0 ? (
      <ul>
        {wishList.map((lineItem) => {
    
          return (
            <li key={lineItem.id}>
              {`${lineItem.name} ${formatPrice(lineItem.price)}`}
              <button
  onClick={async () => {
    try {
      await updateOrder({ ...cart, is_cart: true, lineItem });
      removeFromWishList(lineItem.id);
    } catch (error) {

      console.error('Could not add item to cart:', error);
    }
  }}
>
  Add to cart
</button>
            </li>
          );
        })}
      </ul>
    ) : (
      <p>Wish List is empty.</p>
    )}
  </div>
)};



export default wishList;
