import React from "react";

const Cart = ({
  updateOrder,
  removeFromCart,
  lineItems,
  cart,
  products,
  updateLineItem,
  handleDecrement,
}) => {
  const formatPrice = (price) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  // Filter line items to consider only the items in the current cart
 const cartLineItems = cart && cart.id 
    ? lineItems.filter((lineItem) => lineItem.order_id === cart.id)
   : []; //fixing my cart issue 

  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>
      <ul className="cart-list">
        {cartLineItems.map((lineItem) => {
          const product =
            products.find((product) => product.id === lineItem.product_id) || {};
          const totalPrice = lineItem.quantity * lineItem.product_price; // Calculate total price
          return (
            <li key={lineItem.id}>
              {product.name} ({lineItem.quantity}) - Total:{" "}
              {formatPrice(totalPrice)}
              <div className="cart-actions">
                <button onClick={() => updateLineItem(lineItem)}>+</button>
                <button onClick={() => handleDecrement(lineItem)}>-</button>
                <button onClick={() => removeFromCart(lineItem)}>
                  Remove From Cart
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {cartLineItems.length ? (
        <div className="cart-actions">
          <button
            onClick={() => {
              updateOrder({ ...cart, is_cart: false });
            }}
          >
            Create Order
          </button>
          <p className="cart-total">
            Total Price:{" "}
            {formatPrice(
              cartLineItems.reduce(
                (total, lineItem) =>
                  total + lineItem.quantity * lineItem.product_price,
                0
              )
            )}
          </p>
        </div>
      ) : (
        <p>Cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
