const client = require("./client");
const { v4: uuidv4 } = require("uuid");

async function addToWishlist(userId, productId) {
  const id = uuidv4(); 
  const SQL = `INSERT INTO wishlist (id, user_id, product_id) VALUES ($1, $2, $3) RETURNING *;`;
  const response = await client.query(SQL, [id, userId, productId]);
  return response.rows[0];
}
async function fetchWishlist(userId) {
  const SQL = `
        SELECT 
            w.id as wishlist_id,
            w.created_at as wishlist_created_at,
            w.product_id,
            p.id as product_id,
            p.name as product_name,
            p.price as product_price,
            p.description as product_description,
            p.image as product_image,
            p.vip_only as product_vip_only
        FROM wishlist w
        JOIN products p ON w.product_id = p.id
        WHERE w.user_id = $1;
    `;
  const response = await client.query(SQL, [userId]);
  return response.rows;
}

async function removeFromWishlist(wishlistItemId) {
  const SQL = `DELETE FROM wishlist WHERE id = $1;`;
  await client.query(SQL, [wishlistItemId]);
}

module.exports = {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
};
