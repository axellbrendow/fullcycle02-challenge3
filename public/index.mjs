import { handlePeerChat, setupPeerChat } from './chat/index.mjs';
import { handlePeerPanel, setupPeerPanel } from './panel/index.mjs';
import { createPeer } from './peer.mjs';

const peerObj = createPeer({
  peerOpen: (peer) => {
    handlePeerChat.peerOpen(peer);
    handlePeerPanel.peerOpen(peer);
  },
  peerConnection: (peer, connection) => {
    handlePeerChat.peerConnection(peer, connection);
    handlePeerPanel.peerConnection(peer, connection);
  },
  peerDisconnected: () => {
    handlePeerChat.peerDisconnected();
    handlePeerPanel.peerDisconnected();
  },
  peerClose: () => {
    handlePeerChat.peerClose(peer);
    handlePeerPanel.peerClose(peer);
  },
  peerError: (error) => {
    handlePeerChat.peerError(error);
    handlePeerPanel.peerError(error);
  },
  connectionData: (data) => {
    handlePeerChat.connectionData(data);
    handlePeerPanel.connectionData(data);
  },
  connectionClose: () => {
    handlePeerChat.connectionClose();
    handlePeerPanel.connectionClose();
  }
});

setupPeerChat(peerObj);
setupPeerPanel(peerObj);
