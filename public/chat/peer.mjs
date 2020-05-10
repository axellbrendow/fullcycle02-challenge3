export default function handlePeer({ messageInput, addMessage }) {
  return {
    peerOpen: () => {
      //
    },
    peerConnection: () => {
      messageInput.disabled = false;
    },
    peerDisconnected: () => {
      messageInput.disabled = true;
      console.info(`[CHAT]: peer disconnected`);
    },
    peerClose: () => {
      messageInput.disabled = true;
    },
    peerError: () => {
      //
    },
    connectionData: (data) => {
      addMessage(data, false);
    },
    connectionClose: () => {
      //
    }
  }
};
