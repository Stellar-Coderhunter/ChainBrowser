// Content script to inject Web3 provider into web pages
console.log('ChainBrowser content script loaded');

// Create and inject the inpage script
const script = document.createElement('script');
script.src = chrome.runtime.getURL('inpage.js');
script.onload = () => {
  script.remove();
};
(document.head || document.documentElement).appendChild(script);

// Listen for messages from the injected script
window.addEventListener('message', (event) => {
  // Only accept messages from our own context
  if (event.source !== window) return;
  
  if (event.data.type && event.data.type === 'CHAINBROWSER_PROVIDER') {
    console.log('Received message from inpage script:', event.data);
    
    // Forward to background script
    chrome.runtime.sendMessage(event.data, (response) => {
      // Send response back to the page
      window.postMessage({
        type: 'CHAINBROWSER_RESPONSE',
        requestId: event.data.requestId,
        data: response
      }, '*');
    });
  }
});

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.log('Content script received from background:', message);
  
  // Forward to the page
  window.postMessage({
    type: 'CHAINBROWSER_FROM_BACKGROUND',
    data: message
  }, '*');
  
  sendResponse({ received: true });
});

export {};
