chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  chrome.tabs.query({ active: true }, (tabs) => {
    const activeTabIndex = tabs[0].index ?? 0;
    console.log(msg);
    if (!!msg.url) {
      chrome.tabs.create(
        {
          url: `https://quantumoracle.app?url=${msg.url}`,
          index: activeTabIndex + 1,
        },
        () => sendResponse('Service worker response: message handled'),
      );
    }
  });
});
