import React from 'react';

const Orders = ({ orders, products, lineItems }) => {
  // Function to format a price into dollars (e.g., 100 => $1.00)
  const formatPrice = (price) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  // Function to calculate the total price of an order
  const calculateOrderTotal = (order) => {
    const orderLineItems = lineItems.filter((lineItem) => lineItem.order_id === order.id);
    let totalPrice = 0;

    orderLineItems.forEach((lineItem) => {
      const product = products.find((product) => product.id === lineItem.product_id);
      if (product) {
        totalPrice += product.price * lineItem.quantity;
      }
    });

    return formatPrice(totalPrice);
  };

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.filter((order) => !order.is_cart).map((order) => (
          <li key={order.id}>
            ({new Date(order.created_at).toLocaleString()}) Total Price: {calculateOrderTotal(order)}
            <ul>
              {lineItems
                .filter((lineItem) => lineItem.order_id === order.id)
                .map((lineItem) => {
                  const product = products.find((product) => product.id === lineItem.product_id);
                  return (
                    <li key={lineItem.id}>
                      {product ? `${lineItem.quantity} ${product.name}` : ''}
                    </li>
                  );
                })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
