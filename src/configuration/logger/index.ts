import winston, { transports, format } from 'winston';
const { combine, timestamp } = format;

const logFormat = format.printf(info => {
    return `${info.timestamp} [${info.level}]: ${info.message}`
})

export const AppLogger = winston.createLogger({
    level: "debug",
    format: combine(
        timestamp(),
        logFormat
    ),

    defaultMeta: { service: `${process.env.npm_package_name}-${process.env.npm_package_version}` },
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'logs/combined.log',
            format: format.combine(format.json())
        })
    ],
});
