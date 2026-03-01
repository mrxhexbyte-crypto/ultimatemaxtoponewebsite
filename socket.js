
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3001 });

const broadcastVisitorCount = () => {
  const message = JSON.stringify({
    type: 'visitor-count',
    payload: { count: wss.clients.size }
  });
  wss.clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  });
};

wss.on('connection', function connection(ws) {
  console.log('A new client connected! Total clients: ', wss.clients.size);
  broadcastVisitorCount();

  ws.on('message', function message(data) {
    console.log('received: %s', data);
    // We can handle incoming messages here if needed in the future
  });

  ws.on('close', () => {
    console.log('Client disconnected. Total clients: ', wss.clients.size);
    broadcastVisitorCount();
  });

  ws.send(JSON.stringify({
    type: 'welcome',
    payload: 'Welcome to the Zayx-OS WebSocket server!'
  }));
});

console.log('Real-time visitor server is running on ws://localhost:3001');
