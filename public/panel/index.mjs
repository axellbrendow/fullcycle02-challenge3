import handlePeer from './peer.mjs';
import { addMessage } from '../chat/index.mjs';

const yourIdLabel = document.getElementById('your-id');
const friendIdInput = document.getElementById('friend-id');
const messageInput = document.getElementById('message');
const connectBtn = document.getElementById('connect');
const connectBtnSpinner = document.querySelector('#connect .spinner-border');

export const handlePeerPanel = handlePeer({
  yourIdLabel,
  connectBtn,
  connectBtnSpinner
});

/**
 * Create connect event based on the peer object.
 * @param {{ conn, lastPeerId, peer }} peerObj
 */
export function setupPeerPanel(peerObj) {
  /**
   * Create the connection between the two Peers.
   *
   * Sets up callbacks that handle any events related to the
   * connection and data received on it.
   */
  function makeConnection() {
    if (peerObj.conn) peerObj.conn.close(); // Close old connection

    // Create connection to destination peer specified in the input field
    peerObj.conn = peerObj.peer.connect(friendIdInput.value, { reliable: true });

    peerObj.conn.on('open', function () {
      connectBtnSpinner.classList.add('d-none');
      messageInput.disabled = false;
      // Check URL params for comamnds that should be sent immediately
      // var command = getUrlParam("command");
      // if (command)
      //   peerObj.conn.send(command);
    });
    // Handle incoming data (messages only since this is the signal sender)
    peerObj.conn.on('data', function (data) {
      addMessage(data, false);
    });
    // peerObj.conn.on('close', () => {});
  }

  connectBtn.addEventListener('click', () => {
    connectBtnSpinner.classList.remove('d-none');
    makeConnection();
  });
}
