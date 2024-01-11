const client = require('./client')

const {
  fetchProducts,
  createProduct
} = require('./products');

const {
  createUser,
  authenticate,
  findUserByToken
} = require('./auth');

const {
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchOrders
} = require('./cart');


const seed = async()=> {
  const SQL = `
    DROP TABLE IF EXISTS line_items;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;

    CREATE TABLE users(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      Fname VARCHAR (100) NOT NULL, 
      Lname VARCHAR (100) NOT NULL, 
      email VARCHAR(100) UNIQUE NOT NULL,
      phone VARCHAR (20) NOT NULL,
      is_admin BOOLEAN DEFAULT false NOT NULL,
      is_vip BOOLEAN DEFAULT false NOT NULL
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) UNIQUE NOT NULL,
      price INTEGER,
      image VARCHAR(1000) NOT NULL,
      description VARCHAR(1000)

    );

    CREATE TABLE orders(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      is_cart BOOLEAN NOT NULL DEFAULT true,
      user_id UUID REFERENCES users(id) NOT NULL
    );

    CREATE TABLE line_items(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      product_id UUID REFERENCES products(id) NOT NULL,
      order_id UUID REFERENCES orders(id) NOT NULL,
      quantity INTEGER DEFAULT 1,
      product_price INTEGER,
      CONSTRAINT product_and_order_key UNIQUE(product_id, order_id)
      );

  `;
  await client.query(SQL);

  const [moe, lucy, ethyl, jonas, matthew, billy, devin] = await Promise.all([
    createUser({ username: 'moe', password: 'm_password', Fname: 'FirstName', Lname: 'LastName', phone: '555-555-5555', email: 'email1@email.com', is_admin: false, is_vip: false}),
    createUser({ username: 'lucy', password: 'l_password', Fname: 'FirstName', Lname: 'LastName', phone: '555-555-5555', email: 'emai2l@email.com', is_admin: false, is_vip: false}),
    createUser({ username: 'ethyl', password: '1234', Fname: 'FirstName', Lname: 'LastName', phone: '555-555-5555', email: 'email3@email.com', is_admin: true, is_vip: false}),
    createUser({ username: 'jonas', password: 'j123', Fname: 'FirstName', Lname: 'LastName', phone: '555-555-5555', email: 'emai4l@email.com', is_admin: true, is_vip: false}),
    createUser({ username: 'matthew', password: 'm123', Fname: 'FirstName', Lname: 'LastName', phone: '555-555-5555', email: 'email5@email.com', is_admin: true, is_vip: false}),
    createUser({ username: 'billy', password: 'b123', Fname: 'FirstName', Lname: 'LastName', phone: '555-555-5555', email: 'email6@email.com', is_admin: true, is_vip: false}),
    createUser({ username: 'devin', password: 'd123', Fname: 'FirstName', Lname: 'LastName', phone: '555-555-5555', email: 'email7@email.com', is_admin: true, is_vip: true}),

  ]);
  const [Mjolnir, Umbrella_Shotgun, Freezer_Ray, Shark_laser, Lightsaber, Spartan_Power_Armor, BatRang, Webshooter, Jet_Pack, Gravity_Boots, Stealth_Cloak, Holographic_Projectors, Kryptonite_SprayON,] = await Promise.all([
    createProduct({ name: 'Mjolnir',  price: 100, image:'https://m.media-amazon.com/images/I/715bjLVC4fL._AC_SY550_.jpg', description:'Enchanted hammer that grants the wielder (if worthy, no refunds!) control over lightning, flight and superhuman' }),
    createProduct({ name: 'Umbrella_Shotgun', price: 100, image:'https://cdn.trendhunterstatic.com/thumbs/gun-umbrella.jpeg?auto=webp', description:'A classic weapon that all superheroes or villains dream of using, rain or shoot it will do the job and then some!'  }),
    createProduct({ name: 'Freezer_Ray', price: 100, image:'https://www.julienslive.com/images/lot/3875/387512_xl.jpg?ts=1694578248', description:'Freeze gun that emits a cold ray capable of freezing anything it touches.' }),
    createProduct({ name: 'Shark_laser',  price: 100, image:'https://www.geekalerts.com/u/Shark-With-Frickin-Laser-Pointer.jpg', description:'This is an easily mounted high energy precision laser that fits most big sharks (not hammerheads). Excelent for shark tanks under trap doors in secret layers or castle dikes. ***Batteries and shark not included*** ' }),
    createProduct({ name: 'Lightsaber',  price: 100, image:'https://m.media-amazon.com/images/I/21CwADI7+ML._AC_US40_.jpg', description:'Perfect weapon for heros or villains who know how to handle a sword, color not guaranteed might change over time based "mood" best if used outdoors, best if user is strong in the force but not a requirement' }),
    createProduct({ name: 'Spartan_Power_Armor',  price: 100, image:'https://m.media-amazon.com/images/I/8180fuwj5GL._AC_SY879_.jpg', description:'Heavy duty Power Armor for all non super powered heros out there - performance enhancing and bulletproof and comes with bluetooth and USB-C charging cable' }),
    createProduct({ name: 'BatRang',  price: 100, image:'https://m.media-amazon.com/images/I/6117YUjfJUL._AC_SX466_.jpg', description:'A bat-shaped throwing weapon used by Batman. It can be thrown at enemies or used for various utility purposes.' }),
    createProduct({ name: 'Webshooter',  price: 100, image:'https://m.media-amazon.com/images/I/41UQC-jh7vL._AC_US40_.jpg', description:'Wrist-mounted devices that allow Spider-Man to shoot and swing from webs. They are a crucial tool for his acrobatic crime-fighting.' }),
    createProduct({ name: 'Jet_Pack',  price: 100, image:'https://i.ebayimg.com/images/g/fzAAAOSwNAlkgO0d/s-l140.jpg', description:'Allows the wearer a 2 hour flight time, to escape or infiltrate the most dificicult situations imaginable... or just to make a cool entrance' }),
    createProduct({ name: 'Gravity_Boots',  price: 100, image:'https://gravitec.com/wp-content/uploads/2016/06/Boot-White.jpg', description:'Boots with adjustable gravity manipulation, allowing the hero to walk on walls, ceilings, or make impressive leaps. This gadget would provide enhanced mobility and escape options.' }),
    createProduct({ name: 'Stealth_Cloak',  price: 100, image:'https://static.bhphoto.com/images/images150x150/1292836852_679301.jpg', description:'An increadibly hard to see adaptive camouflage cloak that can blend into the surroundings, rendering the hero practically invisible. It could use advanced light-bending technology or even incorporate chameleon-like capabilities.' }),
    createProduct({ name: 'Holographic_Projectors',  price: 100, image:'https://m.media-amazon.com/images/I/41NEyYKajeL._AC_US100_.jpg', description:'Small, portable devices that can project realistic holograms. Heroes could use them for disguise, creating illusions, or communicating with allies.' }),
    createProduct({ name: 'Kryptonite_SprayON',  price: 100, image:'https://m.media-amazon.com/images/I/81-2z43BSwL._AC_SX679_.jpg', description:'Harmless and biodegradable for most, but for that special someone will put them on even then playing field. Just spray any item and let dry for 2 hours before use, Not recomended for direct use due to short range' }),
  ]);
  let orders = await fetchOrders(ethyl.id);
  let cart = orders.find(order => order.is_cart);
  let lineItem = await createLineItem({ order_id: cart.id, product_id: Mjolnir.id});
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({ order_id: cart.id, product_id: Umbrella_Shotgun.id});
  cart.is_cart = false;
  await updateOrder(cart);
};

module.exports = {
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  authenticate,
  findUserByToken,
  seed,
  client
};
