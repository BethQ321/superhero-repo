const client = require("./client");
const { v4 } = require("uuid");
const uuidv4 = v4;

const fetchProducts = async () => {
  const SQL = `
    SELECT *
    FROM products
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchReviews = async () => {
  
    const SQL = `
      SELECT *
      FROM review
    `;
    const response = await client.query(SQL);
    return response.rows;
};

const fetchShippingAddress = async () => {
  
  const SQL = `
    SELECT *
    FROM shipping_address
  `;
  const response = await client.query(SQL);
  return response.rows;
};




const createProduct = async (product) => {
  const SQL = `
    INSERT INTO products (id, name, price, image, description, vip_only, class) 
    VALUES($1, $2, $3, $4, $5, $6, $7) 
    RETURNING *
  `;

  const response = await client.query(SQL, [
    uuidv4(),
    product.name,
    product.price,
    product.image,
    product.description,
    product.vip_only,
    product.class,
  ]);
  return response.rows[0];
};

const createReview = async(review)=> {
  const SQL = `
    INSERT INTO review  (id, product_id, review_title, reviewText, rating) 
    VALUES($1, $2, $3, $4, $5) 
    RETURNING *
  `;
  
  const response = await client.query(SQL, [ 
    uuidv4(), 
    review.product_id, 
    review.review_title, 
    review.reviewText, 
    review.rating,
  ]);
  return response.rows[0];
};

const createShippingAddress = async(shipping)=> {
  const SQL = `
    INSERT INTO shipping_address (id, street_address, city, state, zip_code) 
    VALUES($1, $2, $3, $4, $5) 
    RETURNING *
  `;
  
  const response = await client.query(SQL, [ 
    uuidv4(), 
    shipping.street_address, 
    shipping.city, 
    shipping.state, 
    shipping.zip_code,
  ]);
  return response.rows[0];
};

module.exports = {
  fetchProducts,
  fetchReviews,
  fetchShippingAddress,
  createProduct,
  createReview,
  createShippingAddress,
};
