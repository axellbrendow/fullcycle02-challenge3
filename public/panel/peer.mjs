export default function handlePeer({
  yourIdLabel,
  connectBtn,
  connectBtnSpinner
}) {
  return {
    peerOpen: (peer) => {
      yourIdLabel.innerHTML = peer.id;
    },
    peerConnection: (peer, connection) => {
      yourIdLabel.innerHTML = peer.id;
      connectBtnSpinner.classList.add('d-none');
    },
    peerDisconnected: () => {
      console.info(`[PANEL]: peer disconnected`);
      yourIdLabel.innerHTML = `<div class="spinner-border" role="status"></div>`;
      connectBtnSpinner.classList.remove('d-none');
    },
    peerClose: () => {
      //
    },
    peerError: () => {
      //
    },
    connectionData: () => {
      //
    },
    connectionClose: () => {
      //
    }
  }
};