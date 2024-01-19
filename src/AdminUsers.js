import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminUsers = ({ auth }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  const toggleVIPStatus = async (userId, isVip) => {
    try {
      await axios.put(`/api/users/${userId}/toggleVIP`, { isVip: !isVip });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, is_vip: !isVip } : user
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="orders-container">
      <h2>All Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Is Admin</th>
            <th>Is VIP</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.Fname}</td>
              <td>{user.Lname}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.is_admin ? "Yes" : "No"}</td>
              <td>{user.is_vip ? "Yes" : "No"}</td>
              <td>
                {" "}
                <button onClick={() => toggleVIPStatus(user.id, user.is_vip)}>
                  Toggle VIP
                </button>
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

export default AdminUsers;
