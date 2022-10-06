import PocketBase from 'pocketbase';
import dotenv from 'dotenv'
dotenv.config();

const client = new PocketBase(process.env.PB_URL);
console.log(process.env.EMAIL, process.env.PASSWORD)
const authData = await client.admins.authViaEmail(process.env.EMAIL, process.env.PASSWORD);

export default client;