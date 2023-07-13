const pino = require('pino');

// const fileTransport = pino.transport({
//     target: 'pino/file',
// options: { destination: `logs/app.log` },
// });

module.exports = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
        }
    },
    // fileTransport
});