import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Profile = ({ auth, setAuth }) => {
  const getHeaders = () => {
    return {
      headers: {
        authorization: window.localStorage.getItem("token"),
      },
    };
  };

  const [editedUser, setEditedUser] = useState({
    id: "",
    fname: "",
    lname: "",
    email: "",
    phone: "",
    image: "",
  });
  useEffect(() => {
    setEditedUser({
      id: auth.id,
      fname: auth.fname || "",
      lname: auth.lname || "",
      email: auth.email || "",
      phone: auth.phone || "",
      image: auth.image || "",
    });
  }, [auth]);

  const [isEditing, setIsEditing] = useState(false);

  const imageInputRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser({ ...editedUser, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      console.log(editedUser);
      await axios.put(`/api/update/${editedUser.id}`, editedUser);

      window.location.reload();

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <div className="profile-image">
        {editedUser.image ? (
          <img src={editedUser.image} alt="Profile" />
        ) : (
          <img src={auth.image} alt="Profile" />
        )}
      </div>
      <h1>Edit User</h1>
      <button className="save-button" onClick={() => setIsEditing(true)}>
        Edit
      </button>

      {isEditing && (
        <div className="profile-box">
          <h2>Edit User</h2>
          <form className="profile-form" onSubmit={handleSave}>
            <label>
              First Name:
              <input
                type="text"
                name="fname"
                value={editedUser.fname}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="lname"
                value={editedUser.lname}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Phone number:
              <input
                type="text"
                name="phone"
                value={editedUser.phone}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Profile Image:
              <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                onChange={handleImageChange}
              />
            </label>
            <button type="submit" className="save-button">
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Profile;
