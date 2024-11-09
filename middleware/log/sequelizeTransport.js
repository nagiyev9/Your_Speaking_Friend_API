import { Transport } from "winston";
import { supabase } from "../../database/db.js";
import { logger } from "./logger.js";

class SequelizeTransport extends Transport {
    async log(info, callback) {
        const { level, message, timestamp } = info;

        try {
            const { error } = await supabase
                .from('server_error_logs')
                .insert([
                    {
                        level,
                        message,
                        timestamp: timestamp || new Date().toISOString()
                    }
                ]);

            if (error) {
                logger.error(error.message);
                callback(error);
                return;
            }

            callback();
        } catch (error) {
            logger.error(error.message);
            callback(error);
        }
    }
}

export default SequelizeTransport;
