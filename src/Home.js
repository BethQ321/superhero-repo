import React from "react";
import { Link } from "react-router-dom";

const Home = ({ auth }) => {
  const isLoggedIn = auth && auth.id;
  const username = auth ? auth.username : "";
  return (
    <div className="home-container">
      {isLoggedIn ? (
        <div>
          {auth.is_vip ? (
            <>
              <h1 className="home-title">Welcome, {username}!</h1>
              <h2 className="home-subtitle">VIP Hero!</h2>
              <h3>S.H.I.E.L.D. Shop Salutes Your Heroic Excellence!</h3>
              <p>
                You're not just a user; you're a VIP, and that means you're part
                of an elite league of heroes. As a VIP member, you enjoy
                unprecedented privileges and access to the most exclusive hero
                resources. Here's what awaits you in your VIP experience:
              </p>
              <p>
                🌟 VIP Exclusives: Gain access to a treasure trove of
                limited-edition superhero gear and gadgets, available only to
                our VIP community.
              </p>
              <p>
                🚀 VIP Preview: Be the very first to preview and acquire
                cutting-edge superhero equipment and life-saving devices, often
                before they are unveiled to the public.
              </p>
              <p>
                📦 White Glove Service: Enjoy priority shipping, dedicated
                customer support, and a VIP concierge to assist you with all
                your hero needs.
              </p>
              <p>
                Your VIP membership is a testament to your dedication to heroism
                and excellence. S.H.I.E.L.D. Shop is honored to have you as a
                distinguished VIP member.
              </p>
              <p>
                Embrace your heroic legacy and explore the S.H.I.E.L.D. Shop
                now, where heroism knows no bounds, and you are at the forefront
                of the hero revolution!
              </p>
            </>
          ) : (
            <>
              <h1 className="home-title">Welcome, {username}!</h1>
              {/* Non-VIP content */}
              <p className="home-text">
                Welcome to the S.H.I.E.L.D. Shop - Your Super Hero Inventive
                Equipment and Life-saving Devices Headquarters!
              </p>
              <p className="home-text">Unleash Your Inner Hero with S.H.I.E.L.D. Shop!</p>
              <p>
                You're not just a visitor; you're a valued member of our hero
                community. As a logged-in user, you have exclusive access to the
                full spectrum of hero resources and benefits.
              </p>
              <p className="home-text">
                Thank you for being a part of the S.H.I.E.L.D. Shop family. Your
                dedication to heroism drives us to continuously provide you with
                the best tools and resources to save the day.
              </p>
              <p className="home-text">
                Embrace your inner hero like never before. Explore the
                S.H.I.E.L.D. Shop now and continue your heroic journey!
              </p>
            </>
          )}
          <img src="https://i.imgur.com/aWLFmXi.png"
          alt="Hero Image"
          className="home-image"
          />
        </div>
      ) : (
        /*not logged in*/
        <>
          <h1 className="home-title">S.H.I.E.L.D. Shop</h1>
          <h3 className="home-subtitle"> (Super Hero Inventive Equipment and Life-saving Devices)</h3>
          <p className="home-text">
            Are you ready to step into a world of heroism and adventure? Welcome
            to the S.H.I.E.L.D. Shop, where we provide you with the ultimate
            arsenal of Super Hero Inventive Equipment and Life-saving Devices!
          </p>
          <p className="home-text">
            S.H.I.E.L.D. stands for more than just an acronym; it represents a
            commitment to excellence, innovation, and the relentless pursuit of
            heroism. Whether you're a seasoned superhero, an up-and-coming
            vigilante, or a fan of all things heroic, our store is your haven
            for all your super-powered needs.
          </p>
          <p className="home-text">
            Join the ranks of legendary heroes and make a difference in the
            world. S.H.I.E.L.D. Shop is your partner in every heroic endeavor,
            providing you with the gear and inspiration you need to shine.
          </p>
          <p className="home-text">
            Start your journey to heroism today. Explore the S.H.I.E.L.D. Shop
            now!
          </p>

          <img src="https://i.imgur.com/aWLFmXi.png"
           alt="Hero Image"
           className="home-image"
          />
          <h3 className="home-subtitle">
            Please, <Link to="/Login" className="home-link">Login</Link> in or{" "}
            <Link to="/Register" className="home-link">Register</Link>
          </h3>
        </>
      )}
    </div>
  );
};

export default Home;
