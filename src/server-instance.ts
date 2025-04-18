import axios from 'axios';

const serverInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

export default serverInstance as any;
