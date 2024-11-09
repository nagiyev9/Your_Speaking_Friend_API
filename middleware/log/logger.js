import { transports, createLogger, format } from "winston";
import SequelizeTransport from "./sequelizeTransport.js";

const { combine, prettyPrint, timestamp } = format;

export const logger = createLogger({
    level: 'error',
    format: combine(
        timestamp({ format: "DD-MMM-YYYY HH:mm:ss" }),
        prettyPrint()
    ),
    transports: [
        new transports.Console(),
        new SequelizeTransport()
    ]
});