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
  const cartLineItems = lineItems.filter(
    (lineItem) => lineItem.order_id === cart.id
  );

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartLineItems.map((lineItem) => {
          const product =
            products.find((product) => product.id === lineItem.product_id) ||
            {};
          const totalPrice = lineItem.quantity * lineItem.product_price; // Calculate total price
          return (
            <li key={lineItem.id}>
              {product.name} ({lineItem.quantity}) - Total:{" "}
              {formatPrice(totalPrice)}
              <button onClick={() => updateLineItem(lineItem)}>+</button>
              <button onClick={() => handleDecrement(lineItem)}>-</button>
              <button onClick={() => removeFromCart(lineItem)}>
                Remove From Cart
              </button>
            </li>
          );
        })}
      </ul>
      {cartLineItems.length ? (
        <div>
          <button
            onClick={() => {
              updateOrder({ ...cart, is_cart: false });
            }}
          >
            Create Order
          </button>
          <p>
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
