const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function insertMessage(text, username) {
  await pool.query('INSERT INTO messages (text, username) VALUES ($1, $2)', [text, username]);
}

module.exports = {
  getAllMessages,
  insertMessage
};