require('dotenv').config({ override: true });

const PORT = process.env.NODE_PORT;
const SALT_ROUNDS = process.env.NODE_SALT_ROUNDS;
const JWT_SECRET = process.env.NODE_JWT_SECRET;

module.exports = { PORT, SALT_ROUNDS, JWT_SECRET };
