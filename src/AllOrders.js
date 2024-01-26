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

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      if (newStatus !== "") {
        await api.updateOrderStatus(orderId, newStatus);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
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
            <th>Order Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.created_at}</td>
              <td>{getUsernameForOrder(order)}</td>
              <td>{order.status}</td>
              <td>
                <div className="status-dropdown">
                  <select
                    onChange={(e) =>
                      handleUpdateOrderStatus(order.id, e.target.value)
                    }
                    value={order.status || ""}
                  >
                    <option value="">Change Status</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/admin" className="nav-link">
        Back to Admin
      </Link>
    </div>
  );
};

export default AllOrders;
