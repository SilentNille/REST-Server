import config from 'config';
import { connect } from 'mongoose';

export async function startDB() {
    console.log("Connect database");
    await connect(config.get<string>("database-config.url"));
    console.log("connected db");
}
