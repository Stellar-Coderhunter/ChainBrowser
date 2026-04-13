// Background service worker for ChainBrowser extension
import { DEFAULT_NETWORKS } from '@/utils/network';

console.log('ChainBrowser background service worker started');

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log('ChainBrowser installed:', details.reason);
  
  // Initialize storage with default values
  if (details.reason === 'install') {
    chrome.storage.local.set({
      currentNetwork: DEFAULT_NETWORKS[1], // Default to testnet
      wallets: [],
      settings: {
        theme: 'dark',
        notifications: true,
        autoLock: true,
        autoLockTimeout: 300 // 5 minutes
      }
    });
  }
});

// Handle messages from popup, content scripts, etc.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received message:', message);
  
  switch (message.type) {
    case 'GET_NETWORK':
      chrome.storage.local.get(['currentNetwork'], (result) => {
        sendResponse(result.currentNetwork);
      });
      return true; // Keep message channel open for async response
      
    case 'SET_NETWORK':
      chrome.storage.local.set({ currentNetwork: message.network }, () => {
        sendResponse({ success: true });
      });
      return true;
      
    case 'GET_WALLETS':
      chrome.storage.local.get(['wallets'], (result) => {
        sendResponse(result.wallets || []);
      });
      return true;
      
    case 'SAVE_WALLET':
      chrome.storage.local.get(['wallets'], (result) => {
        const wallets = result.wallets || [];
        wallets.push(message.wallet);
        chrome.storage.local.set({ wallets }, () => {
          sendResponse({ success: true });
        });
      });
      return true;
      
    case 'SIGN_TRANSACTION':
      // Handle transaction signing request
      chrome.storage.local.get(['activeWallet'], (result) => {
        if (result.activeWallet) {
          sendResponse({ wallet: result.activeWallet });
        } else {
          sendResponse({ error: 'No active wallet' });
        }
      });
      return true;
      
    default:
      console.warn('Unknown message type:', message.type);
      sendResponse({ error: 'Unknown message type' });
      return true;
  }
});

// Handle tab updates for dApp detection
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    // Check if the URL is a known dApp
    // This is where you would inject web3 provider for dApps
    console.log('Tab updated:', tab.url);
  }
});

// Set up periodic tasks (e.g., balance refresh)
chrome.alarms.create('refreshBalances', { periodInMinutes: 5 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'refreshBalances') {
    console.log('Refreshing balances...');
    // TODO: Implement balance refresh logic
  }
});

export {};
