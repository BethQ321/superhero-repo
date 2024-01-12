import React from 'react';
import {Link} from 'react-router-dom';



const Home = ({auth}) => {
    const isLoggedIn = auth && auth.id;
    const username = auth ? auth.username: '';
    return (
        <div>
            {isLoggedIn ? (
            <>
            <h1>Welcome, {username} ! </h1>
           <h2> {auth.is_vip ? 'VIP User' : ''}</h2>
            <img src="https://i.pinimg.com/originals/60/23/ab/6023abd8e8c340bca6f0968bcdac2c4a.jpg"></img>
            </>
            ) : (
                <>
                <h1>Welcome to the Super Hero Store</h1>
                <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4302373e-0609-4da3-b679-ff47c4c0b484/d7gbzfa-9950b011-f99d-4c53-be5e-1f0b2434ac50.jpg/v1/fill/w_1280,h_475,q_75,strp/batman_arkham_origins_batcave__by_gryphart_d7gbzfa-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDc1IiwicGF0aCI6IlwvZlwvNDMwMjM3M2UtMDYwOS00ZGEzLWI2NzktZmY0N2M0YzBiNDg0XC9kN2diemZhLTk5NTBiMDExLWY5OWQtNGM1My1iZTVlLTFmMGIyNDM0YWM1MC5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.KYimchrzZxA8BDP_63zLBXYJ6krxFLvvixJUmYzqFdA"></img>
                <h3>Please, <Link to="/Login">Login</Link> in or <Link to="/Register">Register</Link></h3>
                </>
            )}
        </div>
    )
}

export default Home