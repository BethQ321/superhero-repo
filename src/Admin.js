import React from "react";
import { Link, NavLink } from "react-router-dom";

const Admin = () =>{
    return (
        <>
        <h1>Administrator</h1>
        <NavLink to="/addproduct">Add Product</NavLink>
        <NavLink to="/allusers">Users</NavLink>
        <NavLink to="/editproducts">Edit Products</NavLink>
        </>
    )
}

export default Admin