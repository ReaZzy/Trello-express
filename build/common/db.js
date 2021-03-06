import { getConnection, createConnection } from "typeorm";
const config = require("./ormconfig");
const connectToDb = async () => {
    let connection;
    try {
        connection = await getConnection();
    }
    catch (e) {
        process.stderr.write(`${e}\n`);
    }
    try {
        if (connection) {
            if (!connection.isConnected)
                await connection.connect();
            else
                await createConnection(config);
            console.log(`Connected to postgres on port ${process.env.PORT}`);
        }
    }
    catch (e) {
        console.log(`Connect to DB failed`);
    }
};
module.exports = { connectToDb };
