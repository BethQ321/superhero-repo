import React from "react";

const Orders = ({ orders, products, lineItems, shipping }) => {
  const formatPrice = (price) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  const calculateOrderTotal = (order) => {
    const orderLineItems = lineItems.filter(
      (lineItem) => lineItem.order_id === order.id
    );
    let totalPrice = 0;

    orderLineItems.forEach((lineItem) => {
      const product = products.find(
        (product) => product.id === lineItem.product_id
      );
      if (product) {
        totalPrice += product.price * lineItem.quantity;
      }
    });

    return formatPrice(totalPrice);
  };

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      <ul className="orders-list">
        {orders
          .filter((order) => !order.is_cart)
          .map((order) => (
            <li key={order.id} className="order-item">
              <div className="order-details">
                <div className="order-date">
                  ({new Date(order.created_at).toLocaleString()})
                </div>
                <div className="order-total">
                  Total Price: {calculateOrderTotal(order)}
                </div>
              </div>
              <ul className="order-items-list">
                {lineItems
                  .filter((lineItem) => lineItem.order_id === order.id)
                  .map((lineItem) => {
                    const product = products.find(
                      (product) => product.id === lineItem.product_id
                    );
                    return (
                      <li key={lineItem.id} className="order-item">
                        <div className="order-item-name">
                          {product
                            ? `${lineItem.quantity} ` + `${product.name}: `
                            : ""}
                        </div>
                        <div className="order-item-price">
                          {product
                            ? formatPrice(lineItem.quantity * product.price)
                            : ""}
                        </div>
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
