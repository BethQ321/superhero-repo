import React from "react";
import { Link } from "react-router-dom";

const Home = ({ auth }) => {
  const isLoggedIn = auth && auth.id;
  const username = auth ? auth.username : "";
  return (
    <div>
      {isLoggedIn ? (
        <div>
          {auth.is_vip ? (
            <>
              <h1>Welcome, {username}!</h1>
              <h2>VIP Hero!</h2>
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
              <h1>Welcome, {username}!</h1>
              {/* Non-VIP content */}
              <p>
                Welcome to the S.H.I.E.L.D. Shop - Your Super Hero Inventive
                Equipment and Life-saving Devices Headquarters!
              </p>
              <p>Unleash Your Inner Hero with S.H.I.E.L.D. Shop!</p>
              <p>
                You're not just a visitor; you're a valued member of our hero
                community. As a logged-in user, you have exclusive access to the
                full spectrum of hero resources and benefits.
              </p>
              <p>
                Thank you for being a part of the S.H.I.E.L.D. Shop family. Your
                dedication to heroism drives us to continuously provide you with
                the best tools and resources to save the day.
              </p>
              <p>
                Embrace your inner hero like never before. Explore the
                S.H.I.E.L.D. Shop now and continue your heroic journey!
              </p>
            </>
          )}
          <img src="https://i.pinimg.com/originals/60/23/ab/6023abd8e8c340bca6f0968bcdac2c4a.jpg"></img>
        </div>
      ) : (
        /*not logged in*/
        <>
          <h1>S.H.I.E.L.D. Shop</h1>
          <h3> (Super Hero Inventive Equipment and Life-saving Devices)</h3>
          <p>
            Are you ready to step into a world of heroism and adventure? Welcome
            to the S.H.I.E.L.D. Shop, where we provide you with the ultimate
            arsenal of Super Hero Inventive Equipment and Life-saving Devices!
          </p>
          <p>
            S.H.I.E.L.D. stands for more than just an acronym; it represents a
            commitment to excellence, innovation, and the relentless pursuit of
            heroism. Whether you're a seasoned superhero, an up-and-coming
            vigilante, or a fan of all things heroic, our store is your haven
            for all your super-powered needs.
          </p>
          <p>
            Join the ranks of legendary heroes and make a difference in the
            world. S.H.I.E.L.D. Shop is your partner in every heroic endeavor,
            providing you with the gear and inspiration you need to shine.
          </p>
          <p>
            Start your journey to heroism today. Explore the S.H.I.E.L.D. Shop
            now!
          </p>

          <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4302373e-0609-4da3-b679-ff47c4c0b484/d7gbzfa-9950b011-f99d-4c53-be5e-1f0b2434ac50.jpg/v1/fill/w_1280,h_475,q_75,strp/batman_arkham_origins_batcave__by_gryphart_d7gbzfa-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDc1IiwicGF0aCI6IlwvZlwvNDMwMjM3M2UtMDYwOS00ZGEzLWI2NzktZmY0N2M0YzBiNDg0XC9kN2diemZhLTk5NTBiMDExLWY5OWQtNGM1My1iZTVlLTFmMGIyNDM0YWM1MC5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.KYimchrzZxA8BDP_63zLBXYJ6krxFLvvixJUmYzqFdA"></img>
          <h3>
            Please, <Link to="/Login">Login</Link> in or{" "}
            <Link to="/Register">Register</Link>
          </h3>
        </>
      )}
    </div>
  );
};

export default Home;
