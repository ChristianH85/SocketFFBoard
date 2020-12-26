// import {} from ''

// const endpoint= process.env.Port || 'http://127.0.0.1:3001'
//         // const socket = socketIOClient(endpoint);
//         const [socket] = useSocket(endpoint)
//         socket.connect();
import openSocket from 'socket.io-client';

const socket = openSocket("http://localhost:3001");

export default socket;