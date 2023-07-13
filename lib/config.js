const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    JWT_SECRET : process.env.JWT_SECRET, // required
    PROCESS_COUNT: process.env.PROCESS_COUNT || 1,
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING // required
}

if (!config.DB_CONNECTION_STRING) throw new Error("'JWT_SECRET' is required as an environment variable!");
if (!config.DB_CONNECTION_STRING) throw new Error("'DB_CONNECTION_STRING' is required as an environment variable!");

module.exports = config;