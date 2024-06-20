import {io} from 'socket.io-client';
const socket = io.connect(process.env.NOTIFICATIONURL, {
  transports: ['websocket'],
});
export default socket;
