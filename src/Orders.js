import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = ({ orders, products, lineItems, shipping, error, setError }) => {
  const formatPrice = (price) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  const [shippingInfo, setShippingInfo] = useState([]);

  useEffect(() => {
    const fetchShippingAddress = async () => {
      try {
        const response = await axios.get(`/api/shippingaddress`);
        setShippingInfo(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchShippingAddress();
  }, []);

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
      <h2 className="orders-header">Orders</h2>
      <ul className="orders-list">
        {orders
          .filter((order) => !order.is_cart)
          .map((order) => {
            const orderShippingInfo = shippingInfo.find(
              (shippingInfo) => shippingInfo.user_id === order.user_id
            );
            return (
              <li key={order.id} className="order-item">
                <div className="order-details">
                  {orderShippingInfo && (
                    <div className="shipping-info">
                      <h4>Shipping Address</h4>
                      <div>Street: {orderShippingInfo.street_address}</div>
                      <div>City: {orderShippingInfo.city}</div>
                      <div>State: {orderShippingInfo.state}</div>
                      <div>Zip Code: {orderShippingInfo.zip_code}</div>
                      <br />
                      <div className="order-date">
                        Order created @
                        <div>{new Date(order.created_at).toLocaleString()}</div>
                        <br />
                        <div>Order ID: {order.id}</div>
                        <br />
                        <div>Status:{order.status}</div>
                      </div>
                    </div>
                  )}
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
                              ? `${lineItem.quantity} x ${product.name}: `
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
                  <div className="order-total">
                    Total Price: {calculateOrderTotal(order)}
                  </div>
                </ul>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Orders;
