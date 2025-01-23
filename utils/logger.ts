import winston from "winston"
import type {Request} from "express"

function logger() {
    return winston.createLogger({
        level: "info",
        format: winston.format.json(),
        transports: [
            new winston.transports.File({ filename: 'storage/logs/error.log', level: 'error',  }),
            new winston.transports.File({ filename: 'storage/logs/combined.log'}),
        ]
    })
}

export function loggerInfo(req : Request) {
    logger().info("info", {
        date : Date.now(),
        method: req.method,
        headers : req.headers,
        ip : req.ip,
    })
}


export function loggerError(error: string) {
    logger().error({
        date: Date.now(),
        error : error
    })
}