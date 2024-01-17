const client = require("./client");
const { v4 } = require("uuid");
const uuidv4 = v4;

const fetchUsers = async () => {
  const SQL = `
      SELECT *
      FROM users
    `;
  const response = await client.query(SQL);
  return response.rows;
};

const toggleVIPStatus = async (userId, isVip) => {
  try {
    const SQL = `
        UPDATE users
        SET is_vip = $2
        WHERE id = $1
        RETURNING *
      `;
    const response = await client.query(SQL, [userId, isVip]);
    return response.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchUsers,
  toggleVIPStatus,
};
