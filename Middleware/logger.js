import pkg from 'winston';
const { createLogger, format, transports } = pkg;

const logger = createLogger({
    transports: [
        new transports.File({filename:'logs/index.log', level:'error'}),
        new transports.Console()
    ],
    format: format.combine(
        format.timestamp({format: 'DD-MM-YYYY HH:mm:ss'}),
        format.printf(message=> `${message.level}: ${message.timestamp}: ${message.message}`)
    )
})

export default logger;