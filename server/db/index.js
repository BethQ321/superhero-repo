const client = require("./client");

const { fetchProducts, createProduct, createReview } = require("./products");

const { createUser, authenticate, findUserByToken } = require("./auth");

const {
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchOrders,
} = require("./cart");

const { fetchUsers } = require("./users");

const seed = async () => {
  const SQL = `
    DROP TABLE IF EXISTS line_items;
    DROP TABLE IF EXISTS review;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    
    CREATE TABLE products(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) UNIQUE NOT NULL,
      price INTEGER,
      image VARCHAR(1000) NOT NULL,
      description VARCHAR(1000),
      vip_only BOOLEAN DEFAULT false NOT NULL,
      class VARCHAR (100)

    );

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

    CREATE TABLE review(
      id UUID PRIMARY KEY,
      name VARCHAR(20),
      product_id VARCHAR(500) NOT NULL,
      review_title VARCHAR(30),
      reviewText VARCHAR(1000),
      rating INTEGER DEFAULT 1
      
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
      product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
      order_id UUID REFERENCES orders(id) NOT NULL,
      quantity INTEGER DEFAULT 1,
      product_price INTEGER,
      CONSTRAINT product_and_order_key UNIQUE(product_id, order_id)
    );

    
  
  


  `;
  await client.query(SQL);

  const [moe, lucy, ethyl, jonas, matthew, billy, devin] = await Promise.all([
    createUser({
      username: "moe",
      password: "m_password",
      Fname: "FirstName",
      Lname: "LastName",
      phone: "555-555-5555",
      email: "email1@email.com",
      is_admin: false,
      is_vip: false,
    }),
    createUser({
      username: "lucy",
      password: "l_password",
      Fname: "FirstName",
      Lname: "LastName",
      phone: "555-555-5555",
      email: "emai2l@email.com",
      is_admin: false,
      is_vip: false,
    }),
    createUser({
      username: "ethyl",
      password: "1234",
      Fname: "FirstName",
      Lname: "LastName",
      phone: "555-555-5555",
      email: "email3@email.com",
      is_admin: false,
      is_vip: false,
    }),
    createUser({
      username: "jonas",
      password: "j123",
      Fname: "FirstName",
      Lname: "LastName",
      phone: "555-555-5555",
      email: "emai4l@email.com",
      is_admin: true,
      is_vip: false,
    }),
    createUser({
      username: "matthew",
      password: "m123",
      Fname: "FirstName",
      Lname: "LastName",
      phone: "555-555-5555",
      email: "email5@email.com",
      is_admin: true,
      is_vip: false,
    }),
    createUser({
      username: "billy",
      password: "b123",
      Fname: "FirstName",
      Lname: "LastName",
      phone: "555-555-5555",
      email: "email6@email.com",
      is_admin: true,
      is_vip: false,
    }),
    createUser({
      username: "devin",
      password: "d123",
      Fname: "FirstName",
      Lname: "LastName",
      phone: "555-555-5555",
      email: "email7@email.com",
      is_admin: true,
      is_vip: true,
    }),
  ]);
  const [
    Mjolnir,
    Umbrella_Shotgun,
    Freezer_Ray,
    Shark_laser,
    Lightsaber,
    Spartan_Power_Armor,
    BatRang,
    Webshooter,
    Jet_Pack,
    Gravity_Boots,
    Stealth_Cloak,
    Holographic_Projectors,
    Kryptonite_SprayON,
  ] = await Promise.all([
    createProduct({
      name: "Mjolnir",
      price: 100,
      image: "https://i.imgur.com/OCMJFCK.png",
      description:
        "Enchanted hammer that grants the wielder (if worthy, no refunds!) control over lightning, flight and superhuman",
      vip_only: true,
      class: "weapon",
    }),
    createProduct({
      name: "Vortex Vial:",
      price: 100,
      image: "https://i.imgur.com/Ml3KgVM.png",
      description:
        "A small vial containing a miniature tornado that can be released to create localized storms or tornadoes.",
      vip_only: false,
      class: "mystic",
    }),
    createProduct({
      name: "Probability Manipulator Dice:",
      price: 100,
      image: "https://i.imgur.com/GWTCsuy.png",
      description:
        "A set of enchanted dice that can alter the probability of events, allowing the hero to influence luck and outcomes.",
      vip_only: false,
      class: "mystic",
    }),
    createProduct({
      name: "Shark Laser",
      price: 100,
      image:
        "https://www.geekalerts.com/u/Shark-With-Frickin-Laser-Pointer.jpg",
      description:
        "This is an easily mounted high energy precision laser that fits most big sharks (not hammerheads). Excelent for shark tanks under trap doors in secret layers or castle dikes. ***Batteries and shark not included*** ",
      vip_only: false,
      class: "weapon",
    }),
    createProduct({
      name: "Lightsaber",
      price: 100,
      image: "https://m.media-amazon.com/images/I/21CwADI7+ML._AC_US40_.jpg",
      description:
        'Perfect weapon for heros or villains who know how to handle a sword, color not guaranteed might change over time based "mood" best if used outdoors, best if user is strong in the force but not a requirement',
      vip_only: false,
      class: "weapon",
    }),
    createProduct({
      name: "Power_Armor",
      price: 100,
      image: "https://i.imgur.com/Qdr2Xso.png",
      description:
        "Heavy duty Power Armor for all non super powered heros comes with a cape for added heroic look ( does not work with jet pack add on )- performance enhancing and bulletproof and comes with bluetooth and USB-C charging cable",
      vip_only: false,
      class: "suit",
    }),
    createProduct({
      name: "BatRang",
      price: 100,
      image: "https://m.media-amazon.com/images/I/6117YUjfJUL._AC_SX466_.jpg",
      description:
        "A bat-shaped throwing weapon used by Batman. It can be thrown at enemies or used for various utility purposes.",
      vip_only: false,
      class: "weapon",
    }),
    createProduct({
      name: "Webshooter",
      price: 100,
      image: "https://i.imgur.com/Djw9jqJ.png",
      description:
        "Wrist-mounted devices that allowed Spider-Man to shoot and swing from webs. They are a crucial tool for his acrobatic crime-fighting. Comes in different colors and customizable webs and materials that suits your task",
      vip_only: false,
      class: "tech",
    }),
    createProduct({
      name: "Jet_Pack",
      price: 100,
      image: "https://i.imgur.com/OQQzPt4.png",
      description:
        "Allows the wearer up to 2 hour flight time, to escape or infiltrate the most dificicult situations imaginable... or just to make a cool entrance. Not reccomended with outfits that include capes or highly flammable materials like flannel. Runs on jetfuel or in emergencies 95 octain or higer ",
      vip_only: false,
      class: "tech",
    }),
    createProduct({
      name: "Gravity_Boots",
      price: 100,
      image: "https://i.imgur.com/46pKPqE.png",
      description:
        "Boots with adjustable gravity manipulation, allowing the hero to walk on walls, ceilings, or make impressive leaps. This gadget would provide enhanced mobility and escape options. Is grated to be used in atmosphere and in space by at least two scientists",
      vip_only: false,
      class: "tech",
    }),
    createProduct({
      name: "Shadow-Distortion Cloak",
      price: 100,
      image: "https://i.imgur.com/ENyIxVe.png852_679301.jpg",
      description:
        "A cloak that can manipulate light and shadow, allowing the hero to blend into darkness or create illusions. Great for infiltration and the material is super slippery and does not catch on sharp objects, is very silent and is anti bacterial and odor to throw off scent",
      vip_only: false,
      class: "suit",
    }),
    createProduct({
      name: "Holographic_Projectors",
      price: 100,
      image: "https://i.imgur.com/6tXEOGm.png",
      description:
        "Small, portable devices that can project realistic holograms. Heroes could use them for disguise, creating illusions, or communicating with allies.",
      vip_only: false,
      class: "tech",
    }),
    createProduct({
      name: "Kryptonite_SprayON",
      price: 100,
      image: "https://i.imgur.com/p5XGoXb.png",
      description:
        "Harmless and biodegradable for most, but for that special someone will put them on even then playing field. Just spray any item and let dry for 2 hours before use, Not recomended for direct use due to short range",
      vip_only: false,
      class: "tech",
    }),
    createProduct({
      name: "Gravitational Singularity Sphere",
      price: 100,
      image: "https://i.imgur.com/LTC503R.png",
      description:
        "A handheld orb that can create miniature black holes, capable of absorbing or repelling matter in a localized area.",
      vip_only: false,
      class: "mystic",
    }),
    createProduct({
      name: "Elemental Fusion Crystal:",
      price: 100,
      image: "https://i.imgur.com/tO4PWc0.png",
      description:
        "A gemstone that, when activated, can combine two elements (e.g., fire, water, earth, and air) to create a unique elemental power. Prior knowledge of chemistry is helpful with this mystical artifact as you will probably not be able to familirazie yourself with all possible combinations last minute, in the right hands this is a very powerful tool in the wrong hands it might end up unleashing catostrophic destruction.",
      vip_only: false,
      class: "mystic",
    }),
    createProduct({
      name: "Submercible vehicle AKA SubMERICA",
      price: 100,
      image: "https://i.imgur.com/FoUEBpM.png",
      description:
        "An aquatic vehicle equipped with sonar, torpedoes, and advanced navigation for underwater missions. Can be used as forward operation command post and a temporary secret layer. ",
      vip_only: false,
      class: "vehicle",
    }),
    createProduct({
      name: "Atlas - Giant mech suite",
      price: 100,
      image: "https://i.imgur.com/NPHeXeW.png",
      description:
        "A colossal ( empire state height ) mechanical suit piloted by the hero, capable of taking on colossal threats or rescuing civilians from danger. Remote piloting possible but not reccomended as it still in Beta testing and could cause catostrophic disctruction of civilian infrastructure. This is not a road legal or axle bearing vehicle and should not be used on infrastucture and or civilan areas unless in absolout last case end of the world scenarios",
      vip_only: false,
      class: "vehicle",
    }),
    createProduct({
      name: "Reacto spacecraft",
      price: 100,
      image: "https://i.imgur.com/QLAY7Za.png",
      description:
        "A spacecraft equipped for interstellar travel, enabling the hero to protect Earth from extraterrestrial threats. Can operate in atmosphere and gravity its main purpos is for last minuite space missions, comes equipped with 1 years rations of food and diplomatic material for 'first contact' scenarios",
      vip_only: false,
      class: "vechicle",
    }),
    createProduct({
      name: "Terraforming device",
      price: 100,
      image: "https://i.imgur.com/pxxAw9P.png",
      description:
        "A device that can manipulate and reshape the environment, useful for disaster relief or combating environmental threats. Please note that any hostile intention of use of this device will result in immideate shut down of device and all payments are non refundable",
      vip_only: false,
      class: "tech",
    }),
    createProduct({
      name: "Time bubble Gun",
      price: 100,
      image: "https://i.imgur.com/5l3r7i8.png",
      description:
        "A time manipulaton device that emits a time destortion buble around the user. Once used the device has the ability to slow down time within that bubble and the range is adjustable, bigger the radius the less time distortion available... bcause sicence. An effective tool or defense against speedsters and mystics. ps. a sidenote everything in the bubble will slow down except for the user him self or anyone who is in direct contact and remains in contact with the user upon activation. Bullets that enter the field will slow down allowing the user to reinact the famous Matrix sceane. ",
      vip_only: false,
      class: "tech",
    }),
    createProduct({
      name: " Eye of Heimdall - Astral Projection Amulet",
      price: 100,
      image: "https://i.imgur.com/kXSJe8T.png",
      description:
        "An amulet that allows the hero to project their consciousness into the astral plane, exploring other realms and gathering information in the way very few can, knowledge is power.",
      vip_only: false,
      class: "mystic",
    }),
    createProduct({
      name: "Gemini - Soul-Linking Bracelet",
      price: 100,
      image: "https://i.imgur.com/E14Z6ud.png",
      description:
        " A bracelet that links the hero's soul with another individual, enabling telepathic communication and sharing of experiences. Allows the master werear to learn the truth even faster and with greater accuracy than with the Lasso of truth",
      vip_only: false,
      class: "mystic",
    }),
    createProduct({
      name: "Dreamwalker - Enchanted Dreamcatcher",
      price: 100,
      image: "https://i.imgur.com/oGCNqAR.png",
      description:
        "A dreamcatcher crown that allows the user to manipulate dreams of others. The hero will have the ability to directly affect user through sleepwalking or implanting thoughts or ideas in the short term. Long term affects have been disabled due to dictatorial and world domination tendancies and corruption. VIP only",
      vip_only: true,
      class: "mystic",
    }),
    createProduct({
      name: "Mistwalker - Enchanted cape",
      price: 100,
      image: "https://i.imgur.com/lBCL7Nl.jpg",
      description:
        "Mystic Enchanted Cape: A cape imbued with enchantments that grant the hero the ability to phase through solid objects and become incorporeal.",
      vip_only: true,
      class: "suit",
    }),
    createProduct({
      name: "Dreamscape Goggles",
      price: 100,
      image: "https://i.imgur.com/nOFjF8c.png",
      description:
        "Goggles that allow the hero to enter and interact with the dream world, influencing the subconscious minds of others.",
      vip_only: false,
      class: "tech",
    }),
    createProduct({
      name: "Dimensional Resonance Whistle",
      price: 100,
      image: "https://i.imgur.com/gFJmLV2.png",
      description:
        "A whistle that can resonate with alternate dimensions, summoning creatures or allies from parallel worlds.",
      vip_only: false,
      class: "mystic",
    }),
    createProduct({
      name: "Morphing Liquid Chain",
      price: 100,
      image: "https://i.imgur.com/Q8cL8Uf.png",
      description:
        "A chain made of shape-shifting liquid metal that can transform into various weapons or tools on command.",
      vip_only: false,
      class: "weapon",
    }),
    createProduct({
      name: "Utility Belt",
      price: 100,
      image: "https://i.imgur.com/bkdnGNq.png",
      description:
        "A versatile belt with compartments to store various gadgets, tools, and weapons.",
      vip_only: false,
      class: "suit",
    }),
    createProduct({
      name: "Elemental Fusion Crystal",
      price: 100,
      image: "https://i.imgur.com/tO4PWc0.png",
      description:
        "A gemstone that, when activated, can combine two elements (e.g., fire, water, earth, and air) to create a unique elemental power.",
      vip_only: false,
      class: "mystic",
    }),
    createProduct({
      name: "Dimensional Anchor Gloves",
      price: 100,
      image: "https://i.imgur.com/0EcMpsj.png",
      description:
        "Gloves that can create stable dimensional anchors, preventing teleportation or interdimensional movement in a specific area.",
      vip_only: false,
      class: "tech",
    }),
    createProduct({
      name: "Bio-Nano Hive Armor (Men)",
      price: 100,
      image: "https://i.imgur.com/83NB7MB.png",
      description:
        "A suit made of nanobots that can rapidly adapt to incoming threats, forming protective shields or augmenting the hero's abilities.",
      vip_only: false,
      class: "suit",
    }),
    createProduct({
      name: "Bio-Nano Hive Armor (Women)",
      price: 100,
      image: "https://i.imgur.com/XI1Z4XY.png",
      description:
        "A suit made of nanobots that can rapidly adapt to incoming threats, forming protective shields or augmenting the hero's abilities.",
      vip_only: false,
      class: "suit",
    }),
    createProduct({
      name: "Mind Shielding Helmet",
      price: 100,
      image: "https://i.imgur.com/nEr4lpb.png",
      description:
        "A helmet that provides protection against mental attacks, such as telepathy or mind control.",
      vip_only: false,
      class: "tech",
    }),
    createProduct({
      name: "Healing Serum",
      price: 100,
      image: "https://i.imgur.com/tfCU69G.png",
      description:
        " A special serum that accelerates the hero's healing process, aiding in recovery from injuries.",
      vip_only: false,
      class: "tech",
    }),
    createProduct({
      name: "Reality-Warping Kaleidoscope",
      price: 100,
      image: "https://i.imgur.com/qfPO5LP.png",
      description:
        "A kaleidoscope that can twist and distort reality, creating mesmerizing visual effects and illusions. It casts a wide web and affects as big of an area as the hero can muster, be careful this item is powerfull but using it will come at a cost (other than our store price) to the user as it feeds of the sanity of the user, the more you will loose your sanity so use it wisely and sparsly",
      vip_only: false,
      class: "tech",
    }),
    createProduct({
      name: "Interdimensional Motorcycle",
      price: 100,
      image: "https://i.imgur.com/dP3031s.jpg",
      description:
        "A motorcycle equipped with a device that allows heroes to travel between different dimensions and realities.",
      vip_only: false,
      class: "vehicle",
    }),
    createProduct({
      name: "Titanium Armored Battle Bus",
      price: 100,
      image: "https://i.imgur.com/2jmsmre.jpg",
      description:
        "A heavily armored and weaponized bus that serves as a mobile command center for superhero teams, equipped with advanced surveillance and communication systems.",
      vip_only: false,
      class: "vehicle",
    }),
    createProduct({
      name: "Dragon Scale Armor",
      price: 100,
      image: "https://i.imgur.com/KWmmWc5.jpg",
      description:
        "Armor crafted from dragon scales, providing not only exceptional protection but also the ability to withstand extreme temperatures and dragon-related powers.",
      vip_only: false,
      class: "suit",
    }),
    createProduct({
      name: "Holographic Command Center",
      price: 100,
      image: "https://i.imgur.com/qZFoh9J.jpg",
      description:
        "A portable device that projects a full-scale holographic command center, complete with a 3D interface for mission planning and coordination.",
      vip_only: false,
      class: "tech",
    }),
    createProduct({
      name: "Sorcerer's Grimoire",
      price: 100,
      image: "https://i.imgur.com/jxk2ww9.jpg",
      description:
        "A spellbook filled with powerful incantations and rituals, allowing the user to cast a wide range of magical spells.",
      vip_only: false,
      class: "mystic",
    }),
    createProduct({
      name: "Magnetic Gauntlets",
      price: 100,
      image: "https://i.imgur.com/dz5TCCz.jpg",
      description:
        "Gauntlets that can generate magnetic fields, providing heroes with the ability to control metal objects or create magnetic pathways.",
      vip_only: false,
      class: "tech",
    }),
    createProduct({
      name: "Wearable Exoskeleton",
      price: 100,
      image: "https://i.imgur.com/wz5N7av.jpg",
      description:
        "An exoskeleton suit that enhances the user's strength, agility, and endurance, making it easier to perform physically demanding tasks.",
      vip_only: false,
      class: "suit",
    }),
    createProduct({
      name: "Rebreather Mask",
      price: 100,
      image: "https://i.imgur.com/eM85u6r.jpg",
      description:
        "A mask that allows users to breathe underwater by filtering and recycling oxygen, perfect for underwater missions.",
      vip_only: false,
      class: "suit",
    }),
    createProduct({
      name: "Electromagnetic Pulse (EMP) Emitter",
      price: 100,
      image: "https://i.imgur.com/DPUa2my.jpg",
      description:
        "A handheld device that emits an electromagnetic pulse to disrupt or disable electronic devices, useful for disabling security systems or drones",
      vip_only: false,
      class: "tech",
    }),
    createProduct({
      name: "Aerodynamic Utility Umbrella",
      price: 100,
      image: "https://i.imgur.com/jfvrin5.png",
      description:
        "An umbrella with a reinforced frame that doubles as a lightweight glider, allowing for controlled descents from heights",
      vip_only: false,
      class: "tech",
    }),
    createProduct({
      name: "Smart Contact Lenses",
      price: 100,
      image: "https://i.imgur.com/DSDJrqh.jpg",
      description:
        "Contact lenses with augmented reality displays, providing vital information, analysis, and mission updates directly to the wearer's eyes.",
      vip_only: false,
      class: "tech",
    }),
    createProduct({
      name: "Remote-Controlled Insect Drone",
      price: 100,
      image: "https://i.imgur.com/Z7XsK6l.jpg",
      description:
        "A small, insect-like drone with camera capabilities, useful for covert surveillance and reconnaissance.",
      vip_only: false,
      class: "tech",
    }),
    createProduct({
      name: "Molecular Disruptor Grenades",
      price: 100,
      image: "https://i.imgur.com/Ie791Vx.png",
      description:
        " Grenades that disintegrate or rearrange the molecular structure of objects, causing them to break down or transform.",
      vip_only: false,
      class: "tech",
    }),
    createProduct({
      name: "Nano-Replicator Pen",
      price: 100,
      image: "https://i.imgur.com/WKGrwkU.jpg",
      description:
        "A pen-like device that uses nanotechnology to replicate small objects, tools, or keys when pressed against the desired target.",
      vip_only: false,
      class: "tech",
    }),
    createProduct({
      name: "",
      price: 100,
      image: "",
      description: "",
      vip_only: false,
      class: "",
    }),
  ]);
  let orders = await fetchOrders(ethyl.id);
  let cart = orders.find((order) => order.is_cart);
  let lineItem = await createLineItem({
    order_id: cart.id,
    product_id: Mjolnir.id,
  });
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({
    order_id: cart.id,
    product_id: Umbrella_Shotgun.id,
  });
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
  client,
};
