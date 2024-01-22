import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "./api";
import { Link } from "react-router-dom";

const AllOrders = () => {
  const [users, setUsers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const response = await api.fetchAllOrders(setAllOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrdersData();
  }, []);

  const getUsernameForOrder = (order) => {
    const user = users.find((user) => user.id === order.user_id);
    return user ? user.username : "Unknown";
  };

  const handleDeleteOrder = async (orderId) => {
    console.log("Deleting order with ID:", orderId);
    try {
      await api.deleteOrder(orderId);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="orders-container">
      {" "}
      <h1 className="home-title">All Orders</h1>{" "}
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Created At</th>
            <th>User Username</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.created_at}</td>
              <td>{getUsernameForOrder(order)}</td>
              <td>
                <button
                  className="button-style"
                  onClick={() => handleDeleteOrder(order.id)}
                >
                  Delete
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/admin" className="back-button">
        Back to Admin
      </Link>
    </div>
  );
};

export default AllOrders;
