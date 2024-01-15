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

const fetchReviews = async()=> {
  const SQL = `
    SELECT *
    FROM review
  `;
  const response = await client.query(SQL);
  return response.rows;
};


const createProduct = async (product) => {
  const SQL = `
    INSERT INTO products (id, name, price, image, description, vip_only) 
    VALUES($1, $2, $3, $4, $5, $6) 
    RETURNING *
  `;

  const response = await client.query(SQL, [
    uuidv4(),
    product.name,
    product.price,
    product.image,
    product.description,
    product.vip_only,
  ]);
  return response.rows[0];
};

const createReview = async(review)=> {
  const SQL = `
    INSERT INTO review  (id, product_id, reviewText, rating) 
    VALUES($1, $2, $3, $4) 
    RETURNING *
  `;
  
  const response = await client.query(SQL, [ uuidv4(), review.product_id, review.reviewText, review.rating]);
  return response.rows[0];
};


module.exports = {
  fetchProducts,
  fetchReviews,
  createProduct,
  createReview,
};
