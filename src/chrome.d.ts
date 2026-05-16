declare const chrome: {
  runtime: {
    onInstalled: {
      addListener: (
        callback: (details: { reason: string }) => void
      ) => void;
    };
    onMessage: {
      addListener: (
        callback: (
          message: {
            type?: string;
            network?: unknown;
            wallet?: unknown;
          },
          sender: unknown,
          sendResponse: (response?: unknown) => void
        ) => boolean | void
      ) => void;
    };
    getURL: (path: string) => string;
    sendMessage: (
      message: unknown,
      callback?: (response: unknown) => void
    ) => void;
  };
  storage: {
    local: {
      get: (
        keys: string[],
        callback: (result: Record<string, unknown>) => void
      ) => void;
      set: (items: Record<string, unknown>, callback?: () => void) => void;
    };
  };
  tabs: {
    onUpdated: {
      addListener: (
        callback: (
          tabId: number,
          changeInfo: { status?: string },
          tab: { url?: string }
        ) => void
      ) => void;
    };
  };
  alarms: {
    create: (name: string, info: { periodInMinutes: number }) => void;
    onAlarm: {
      addListener: (callback: (alarm: { name: string }) => void) => void;
    };
  };
};
