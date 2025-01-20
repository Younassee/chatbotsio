import winston from "winston"

export function logger() {
    return winston.createLogger({
        level: "info",
        format: winston.format.json(),
        transports: [
            new winston.transports.File({ filename: 'storage/logs/error.log', level: 'error',  }),
            new winston.transports.File({ filename: 'storage/logs/combined.log'}),
        ]
    })
}