import { connect } from 'mongoose';

export async function startDB(){
    console.log("Connect database")
    await connect('mongodb://127.0.0.1:27017/test');
    console.log("connected db")
}
