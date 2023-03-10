const ENDPOINT_HOST = 'https://quantumoracle.app';

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  chrome.tabs.query({ active: true }).then((tabs) => {
    const activeTabIndex = tabs[0].index ?? 0;
    if (!!msg.tweetId) {
      chrome.tabs
        .create({
          url: `${ENDPOINT_HOST}/preview?tweetid=${msg.tweetId}`,
          index: activeTabIndex + 1,
        })
        .then(() => {
          sendResponse('Service worker response: url handled');
        });
    }
    if (msg.tweetId === null) {
      chrome.tabs.create({
        url: `${ENDPOINT_HOST}`,
        index: activeTabIndex + 1,
      });
    }
  });
  return true;
});
