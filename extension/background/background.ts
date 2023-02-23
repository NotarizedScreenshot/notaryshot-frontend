chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  chrome.tabs.query({ active: true }).then((tabs) => {
    const activeTabIndex = tabs[0].index ?? 0;
    if (!!msg.url) {
      chrome.tabs
        .create({
          url: `http://localhost:3000?url=${msg.url}`,
          index: activeTabIndex + 1,
        })
        .then(() => {
          sendResponse('Service worker response: url handled');
        });
    }
    if (msg.url === null) {
      chrome.tabs.create({
        url: `https://quantumoracle.app`,
        index: activeTabIndex + 1,
      });
    }
  });
  return true;
});
