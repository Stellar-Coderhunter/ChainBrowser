(function () {
  if (window.chainBrowser) {
    return;
  }

  const request = (payload) =>
    new Promise((resolve) => {
      const requestId = `chainbrowser-${Date.now()}-${Math.random().toString(16).slice(2)}`;

      const handleMessage = (event) => {
        if (event.source !== window) {
          return;
        }

        if (event.data?.type === 'CHAINBROWSER_RESPONSE' && event.data?.requestId === requestId) {
          window.removeEventListener('message', handleMessage);
          resolve(event.data.data);
        }
      };

      window.addEventListener('message', handleMessage);
      window.postMessage(
        {
          type: 'CHAINBROWSER_PROVIDER',
          requestId,
          ...payload
        },
        '*'
      );
    });

  window.chainBrowser = {
    isChainBrowser: true,
    request
  };

  window.dispatchEvent(new Event('chainbrowser#initialized'));
})();
