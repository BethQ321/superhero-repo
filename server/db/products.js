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

//fourth? add username
const createReview = async (review) => {
  const SQL = `
    INSERT INTO review  (id, name, product_id, review_title, reviewText, rating) 
    VALUES($1, $2, $3, $4, $5, $6) 
    RETURNING *
  `;

  const response = await client.query(SQL, [
    uuidv4(),
    review.name,
    review.product_id,
    review.review_title,
    review.reviewText,
    review.rating,
  ]);
  return response.rows[0];
};


const createShippingAddress = async(shipping, userId)=> {
  const SQL = `
    INSERT INTO shipping_address (id, user_id, street_address, city, state, zip_code) 
    VALUES($1, $2, $3, $4, $5, $6) 
    RETURNING *
  `;
  
  const response = await client.query(SQL, [ 
    uuidv4(), 
    userId,
    shipping.street_address, 
    shipping.city, 
    shipping.state, 
    shipping.zip_code,
  ]);
  return response.rows[0];
}
const updateProduct = async (productId, name, description, price) => {
  try {
    const SQL = `
      UPDATE products
      SET name = $2, description = $3, price = $4
      WHERE id = $1
      RETURNING *
    `;

    const response = await client.query(SQL, [
      productId,
      name,
      description,
      price,
    ]);

    if (response.rows.length === 0) {
      throw new Error("Product not found");
    }

    return response.rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (productId) => {
  try {
    const SQL = `
      DELETE FROM products
      WHERE id = $1
    `;
    await client.query(SQL, [productId]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchProducts,
  fetchReviews,
  fetchShippingAddress,
  createProduct,
  createReview,
  createShippingAddress,
  updateProduct,
  deleteProduct,
};
