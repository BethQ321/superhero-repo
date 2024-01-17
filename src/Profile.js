import React, { useState } from "react";

const Profile = ({ auth }) => {
  const [fname, setFname] = useState(auth.fname);
  const [lname, setLname] = useState(auth.lname);
  const [email, setEmail] = useState(auth.email);
  const [phone, setPhone] = useState(auth.phone);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    if (password === confirmPassword) {
      console.log("Passwords match, changing password...");
    } else {
      console.error("Passwords do not match");
    }
  };

  const handleSaveChanges = () => {
    // Implement logic to save changes (e.g., update user profile)
  };

  return (
    <div>
      {auth ? (
        <div>
          {/* Display user information box */}
          <div className="profile-box">
            <p>User Information:</p>
            <p>First Name: {auth.fname}</p>
            <p>Last Name: {auth.lname}</p>
            <p>Email: {auth.email}</p>
            <p>Phone: {auth.phone}</p>
          </div>

          {/* Profile edit box */}
          <div className="profile-box">
            <p>Welcome to the {auth.username} -cave</p>
            <form className="profile-form">
              <label htmlFor="fname">First Name:</label>
              <input
                type="text"
                id="fname"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
              <label htmlFor="lname">Last Name:</label>
              <input
                type="text"
                id="lname"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button className="save-button" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </form>
          </div>

          {/* Password box */}
          <div className="password-box">
            <p>Password Section</p>
            <form className="password-form">
              <label htmlFor="password">New Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /><br></br>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className="save-password-button"
                onClick={handlePasswordChange}
              >
                Save Password
              </button>
            </form>
          </div>
        </div>
      ) : (
        <p>Loading profile information...</p>
      )}
    </div>
  );
};

export default Profile;
