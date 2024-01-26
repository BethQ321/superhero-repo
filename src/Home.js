import React from "react";
import { Link } from "react-router-dom";

const Home = ({ auth, isDarkMode }) => {
  const isLoggedIn = auth && auth.id;
  const username = auth ? auth.username : "";

  return (
    <div className="home-container">
      {isLoggedIn ? (
        <>
          {auth.is_vip ? (
            <>
              {isDarkMode ? (
                <>
                  <h1 className="home-title">Welcome, {username}!</h1>
                  <img
                    className="homepage-image"
                    src="https://i.imgur.com/yoJLg9c.png"
                    alt="Villain"
                    width="150px"
                  />
                  <h2 className="home-subtitle">VIP Villain!</h2>
                  <p className="home-text">
                    Embrace your dark side and wreak havoc with our sinister
                    collection of Villainous tools and gadgets. You're not just
                    a user; you're a Villain, and that means you're part of an
                    elite league of chaos creators. As a Villain, you enjoy
                    exclusive access to the most destructive devices. Here's
                    what awaits you in your Villainous experience:
                  </p>
                  {/* Add Villain-specific content here */}
                </>
              ) : (
                <>
                  <h1 className="home-title">Welcome, {username}!</h1>
                  <img
                    className="homepage-image"
                    src="https://i.imgur.com/yoJLg9c.png"
                    alt="Hero"
                    width="150px"
                  />
                  <h2 className="home-subtitle">VIP Hero!</h2>
                  <p className="home-text">
                    You're not just a user; you're a VIP, and that means you're
                    part of an elite league of heroes. As a VIP member, you
                    enjoy unprecedented privileges and access to the most
                    exclusive hero resources.
                  </p>
                  {/* Add VIP-specific content here */}
                </>
              )}
            </>
          ) : (
            <>
              {isDarkMode ? (
                <>
                  <h1 className="home-title">Welcome, {username}!</h1>
                  <img
                    className="homepage-image"
                    src="https://i.imgur.com/yoJLg9c.png"
                    alt="Villain"
                    width="150px"
                  />
                  <p className="home-text">
                    Embrace your dark side and wreak havoc with our sinister
                    collection of Villainous tools and gadgets. You're not just
                    a user; you're a Villain, and that means you're part of an
                    elite league of chaos creators. As a Villain, you enjoy
                    exclusive access to the most destructive devices.
                  </p>
                  {/* Add Villain-specific content here */}
                </>
              ) : (
                <>
                  <h1 className="home-title">Welcome, {username}!</h1>
                  <img
                    className="homepage-image"
                    src="https://i.imgur.com/yoJLg9c.png"
                    alt="Profile"
                    width="150px"
                  />
                  {/* Non-VIP content */}
                  <p className="home-text">
                    Welcome to the S.H.I.E.L.D. Shop - Your Super Hero Inventive
                    Equipment and Life-saving Devices Headquarters!
                  </p>
                  <p className="home-text">
                    Unleash Your Inner Hero with S.H.I.E.L.D. Shop!
                  </p>
                  <p>
                    You're not just a visitor; you're a valued member of our
                    hero community. As a logged-in user, you have exclusive
                    access to the full spectrum of hero resources and benefits.
                  </p>
                  <p className="home-text">
                    Thank you for being a part of the S.H.I.E.L.D. Shop family.
                    Your dedication to heroism drives us to continuously provide
                    you with the best tools and resources to save the day.
                  </p>
                  <p className="home-text">
                    Embrace your inner hero like never before. Explore the
                    S.H.I.E.L.D. Shop now and continue your heroic journey!
                  </p>
                </>
              )}
            </>
          )}
          <img
            src={
              isDarkMode
                ? "https://i.imgur.com/nfCnQii.png"
                : "https://i.imgur.com/nqm797X.png"
            }
            alt={isDarkMode ? "Villain" : "Hero"}
            className="home-image"
          />
        </>
      ) : (
        /* Not logged in */
        <>
          {isDarkMode ? (
            <>
              <h1 className="home-title">S.H.I.E.L.D. Shop</h1>
              <h3 className="home-subtitle">
                (Super Hero Inventive Equipment and Life-saving Devices)
              </h3>
              <p className="home-text">
                Are you ready to step into a world of villainy and chaos?
                Welcome to the S.H.I.E.L.D. Shop, where we provide you with the
                ultimate arsenal of Super Villain Inventive Equipment and
                Chaos-inducing Devices!
              </p>
              {/* Add Villain-specific content here */}
            </>
          ) : (
            <>
              <h1 className="home-title">S.H.I.E.L.D. Shop</h1>
              <h3 className="home-subtitle">
                (Super Hero Inventive Equipment and Life-saving Devices)
              </h3>
              <p className="home-text">
                Are you ready to step into a world of heroism and adventure?
                Welcome to the S.H.I.E.L.D. Shop, where we provide you with the
                ultimate arsenal of Super Hero Inventive Equipment and
                Life-saving Devices!
              </p>
              {/* Add Hero-specific content here */}
            </>
          )}
          <img
            src={
              isDarkMode
                ? "https://i.imgur.com/nfCnQii.png"
                : "https://i.imgur.com/nqm797X.png"
            }
            alt={isDarkMode ? "Villain" : "Hero"}
            className="home-image"
          />
          <h3 className="home-subtitle" style={{marginTop: "25px"}}>
            Please,{" "}
            <Link to="/Login" className="a-link">
              Login
            </Link>{" "}
            in or{" "}
            <Link to="/Register" className="a-link">
              Register
            </Link>
          </h3>
        </>
      )}
    </div>
  );
};

export default Home;
