import PocketBase from 'pocketbase';

const client = new PocketBase(import.meta.env.VITE_API_URL);

export default client;