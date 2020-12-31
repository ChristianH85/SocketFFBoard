import openSocket from 'socket.io-client';

const socket = openSocket(process.env.PORT||"http://localhost:3001");

export default socket;