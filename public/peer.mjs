/**
 * Create the Peer object for our end of the connection.
 *
 * Sets up callbacks that handle any events related to our
 * peer object.
 */
export const createPeer = ({
  peerOpen,
  peerConnection,
  peerDisconnected,
  peerClose,
  peerError,
  connectionData,
  connectionClose,
}) => {
  const obj = {
    lastPeerId: null,
    peer: null,
    conn: null,
  };

  // Create own peer object with connection to shared PeerJS server
  obj.peer = new Peer(null, {
    debug: 2,
  });

  obj.peer.on('open', (id) => {
    // Workaround for peer.reconnect deleting previous id
    if (id === null) obj.peer.id = obj.lastPeerId;
    else obj.lastPeerId = id;

    peerOpen?.(obj.peer);
  });

  obj.peer.on('connection', connection => {
    // Allow only a single connection
    if (obj.conn?.open) {
      connection.on('open', () => {
        connection.send('Already connected to another client');
        setTimeout(() => { connection.close(); }, 500);
      });
      return;
    }

    obj.conn = connection;
    obj.conn.on('data', (data) => { connectionData?.(data); });
    obj.conn.on('close', () => {
      obj.conn = null;
      connectionClose?.();
    });

    peerConnection?.(obj.peer, obj.conn);
  });

  obj.peer.on('disconnected', () => {
    // Workaround for peer.reconnect deleting previous id
    obj.peer.id = obj.lastPeerId;
    obj.peer._lastServerId = obj.lastPeerId;
    obj.peer.reconnect();
    peerDisconnected?.();
  });

  obj.peer.on('close', () => {
    obj.conn = null;
    peerClose?.();
  });

  obj.peer.on('error', error => {
    console.error(error);
    peerError?.(error);
  });

  return obj;
}
