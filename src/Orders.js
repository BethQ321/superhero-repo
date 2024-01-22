import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";


//  delete once implimented
//  //fetch shipping address currently will not work untill I am able to push anything to the table
//   //possibly belongs better in src/orders
  // useEffect(() => {
  //   const fetchShippingAddress = async () => {
  //     try {
  //       const response = await axios.get(`/api/shippingAddress?street_address=${street_address}`);
  //       setShipping(response.data);
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   };

  //   fetchShippingAddress();
  // }, [street_address]);
//   //fetch shipping address currently will not work untill I am able to push anything to the table

 
const Orders = ({ orders, products, lineItems, shipping }) => {
  // Function to format a price into dollars (e.g., 100 => $1.00)
  const formatPrice = (price) => {
    return `$${(price / 100).toFixed(2)}`;
  };
  // const params = useParams();
  // let userId = params.id;
  const [shippingInfo, setShippingInfo] = useState ()
  const [error, setError] = useState(null);
//const addShippingInfo = products.filter((shipping,order) => {

    // return  shippingInfo.order_id === order.user_id
  
  // console.log(addShippingInfo.street_address)



useEffect(() => {
    const fetchShippingAddress = async () => {
      try {
        const response = await axios.get(`/api/shippingaddress`);
        console.log(response.data)
        setShippingInfo(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchShippingAddress();
   console.log(shipping.lenght)
  }, []);

  // Function to calculate the total price of an order
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
                      
                    );})}
                </ul>
                {/* <ul className="order-items-list">
                  {shipping
                  .filter((shipping) => shipping.user_id === user.id)
                  .map((shipping) => {
                    const shippingInfo = orders.find(
                      (shippingInfo) => shippingInfo.shipping_address_id === user.id
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
                      
                    );})}
                </ul> */}
              <div><p>Shipping address</p>
              <ul>
              </ul>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Orders;



//   .filter((shipping) => shipping.user_id === order.id)
//   .map((shipping) => {
//     const shippingId = products.find(
//       (shippingId) => shippingId.id === shipping.user_id
//     );
//     return (
//       <li key={shipping.id} className="order-item">
//         <div className="order-item-name">
//           {shippingId
//             ? `${shipping.street_address}/${shipping.city}: `
//             : ""}
//         </div>
//         <div className="order-item-price">
//           {shippingInfo
//             ? formatPrice(order.quantity * product.price)
//             : ""}
//         </div>
//       </li>
      
//           );
// })}