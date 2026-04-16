require('dotenv').config({ override: true });

const PORT = process.env.NODE_PORT || 3004;
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
const JWT_SECRET = process.env.NODE_JWT_SECRET || 'NODE_JWT_SECRET';
const MONGO_PASSWORD = process.env.NODE_MONGO_PASSWORD;
const MONGO_DB = process.env.NODE_MONGO_DB;
const MONGO_PORT = process.env.NODE_MONGO_PORT;

module.exports = {
    PORT,
    SALT_ROUNDS,
    JWT_SECRET,
    MONGO_DB,
    MONGO_PASSWORD,
    MONGO_PORT,
};
