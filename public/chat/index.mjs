import handlePeer from './peer.mjs';

const chat = document.querySelector('.chat');
const chatContainer = document.querySelector('.chat-container');
const messageInput = document.getElementById('message');
const sendMessageBtn = document.querySelector('.send-message-btn');

function createMessage(
  text, itsme = true, date = new Date().toLocaleString())
{
  return itsme ? (
`<div class="media w-50 ml-auto mb-3">
    <div class="media-body">
        <div class="bg-primary rounded py-2 px-3 mb-2">
            <p class="text-small mb-0 text-white message-text">${text}</p>
        </div>
        <p class="small text-muted">${date}</p>
    </div>
</div>`
  ) : (
`<div class="media w-50 mb-3">
    <div class="media-body ml-3">
        <div class="bg-light rounded py-2 px-3 mb-2">
            <p class="text-small mb-0 text-muted message-text">${text}</p>
        </div>
        <p class="small text-muted">${date}</p>
    </div>
</div>`
  );
}

export function addMessage(
  text, itsme = true, date = new Date().toLocaleString())
{

  const template = document.createElement('template');
  template.innerHTML = createMessage(text, itsme, date).trim();
  chatContainer.appendChild(template.content.firstChild);
  setTimeout(() => {
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
  }, 0);
}

export const handlePeerChat = handlePeer({ messageInput, addMessage });

/**
 * Create connect event based on the peer object.
 * @param {{ conn, lastPeerId, peer }} peerObj
 */
export function setupPeerChat(peerObj) {
  function sendMessage()
  {
    if (!messageInput.disabled && peerObj.conn?.open) {
      peerObj.conn.send(messageInput.value);
      addMessage(messageInput.value);
      messageInput.value = '';
    } else {
      console.log('Connection is closed');
    }
  }

  messageInput.addEventListener('keypress', e => {
    if (e.code === 'Enter') sendMessage();
  });

  sendMessageBtn.addEventListener('click', sendMessage);
}

function resizeChat() {
  if (window.outerWidth < 768) {
    const panelH = document.querySelector('.panel').offsetHeight;
    chat.style.maxHeight = `calc(100vh - ${panelH}px)`;
  }
}

window.addEventListener('load', resizeChat);
window.addEventListener('resize', resizeChat);
