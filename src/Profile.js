import React, { useState } from "react";
import axios from "axios";

const Profile = ({ auth }) => {

//   console.log("huh")
//   const [fname, setFname] = useState(auth.fname || '');
//   const [lname, setLname] = useState(auth.lname || '');
//   const [email, setEmail] = useState(auth.email || '');
//   const [phone, setPhone] = useState(auth.phone || '');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState(null);
 

//   const handlePasswordChange = () => {
//     if (password === confirmPassword) {
//       console.log("Passwords match, changing password...");
//     } 
//   };

 
//   const user_id = auth.id

//   const updateUserProfile = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put("/api/profile", user_id, {  //error 500
//       //await axios.put("/api/auth/profile", user_id, {  //error404
     
//   fname, lname, email,phone,
// });
//    //console.log(response.data);

     
//     } catch (error) {
//       console.error('Error updating profile in src/profile');
//       setError('Error updating profile. Please try again.');
//     }
//   };


//   return (
//     <div>
//       {auth ? (
//         <div>
//           <div className="profile-box">
//             <p>User Information:</p>
//             <p>First Name: {auth.fname}</p>
//             <p>Last Name: {auth.lname}</p>
//             <p>Email: {auth.email}</p>
//             <p>Phone: {auth.phone}</p>
//             {/* {console.log(auth)} */}
//           </div>

          
//           <div className="profile-box">
//             <p>Welcome to the {auth.username} -2cave</p>
//             <form className="profile-form">
//               <label htmlFor="fname">First Name:</label>
//               <input
//                 type="text"
//                 id="fname"
//                 value={fname}
//                 onChange={(e) => setFname(e.target.value)}
//                 required
//               />
//               <label htmlFor="lname">Last Name:</label>
//               <input
//                 type="text"
//                 id="lname"
//                 value={lname}
//                 onChange={(e) => setLname(e.target.value)}
//                 required
//               />
//               <label htmlFor="email">Email:</label>
//               <input
//                 type="text"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <label htmlFor="phone">Phone:</label>
//               <input
//                 type="text"
//                 id="phone"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 required
//               />
//               <button className="save-button" onClick={updateUserProfile}>
//                 Save Changes
//               </button>
//             </form>
//           </div>

          
//           <div className="password-box">
//             <p>Password Section</p>
//             <br></br>
//             <form className="password-form">
//               <label htmlFor="password">New Password:</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               /><br></br>
//               <label htmlFor="confirmPassword">Confirm Password:</label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//               <br></br>
//               <button
//                 className="save-password-button"
//                 onClick={handlePasswordChange}
//               >
//                 Save Password
//               </button>
//             </form>
//           </div>
//         </div>
//       ) : (
//         <p>Loading profile information...</p>
//       )}
//     </div>
//   );






  const [editedU, setEditedU] = useState({
    id: "",
    fname: "",
    lname: "",
    email: "",
    phone: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (auth) => {
  setEditedU({
    id: auth.id,
    fname: auth.fname,
    lname: auth.lname,
    email: auth.email,
    phone: auth.phone,
    });
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedU({
      ...editedU,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(editedU.id)
    try {

      // await axios.put(`/api/auth/${editedU.id}`, editedU, {   //error 404
      //   params: { id: editedU.id }
      // });

      await axios.put(`/api/auth/${editedU.id}`, { //404 error

        fname: editedU.fname,
        lname: editedU.lname,
        email: editedU.email,
        phone: editedU.phone,

        
      });

      setEditedU({
        fname: "",
        lname: "",
        email: "",
        phone: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating src/profile:", error);
    }
  };

  return (
    <>
      <h1>Edit User</h1>
      <button onClick={() => handleEdit(auth)}>Edit</button>

      {/* Edit Form */}
      {isEditing && (
        <div>
          <h2>Edit User</h2>
          <form>
            <label>
              First Name:
              <input
                type="text"
                name="fname"
                value={editedU.fname}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                type="text"
                name="lname"
                value={editedU.lname}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                name="email"
                value={editedU.email}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Price (in cents):
              <input
                type="text"
                name="phone"
                value={editedU.phone}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button onClick={handleSave}>Save</button>
          </form>
        </div>
      )}
    </>

  )



























};

export default Profile;
