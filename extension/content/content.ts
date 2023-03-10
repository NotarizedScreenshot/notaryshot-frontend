import './content.css';

const buttonHandler = (url: string) => () => {  
  const tweetId = new URL(url).pathname.split('/').at(-1);  
  chrome.runtime.sendMessage({ tweetId }, (response) => {
    console.log('button handler sendMessage response: ', response);
  });
};

const bodyObserverCallback = () => {
  const articles = document.querySelectorAll('article');

  articles.forEach((article) => {
    const notarizeButton = article.querySelector('[data-notarize="true"]');
    if (!!notarizeButton) return;

    const idLink = article.querySelector('a:has(time)') as HTMLAnchorElement;
    if (!idLink) return;
    
    const href = idLink?.href;
    const button = document.createElement('button');
    button.classList.add('btn-test');
    button.setAttribute('data-notarize', 'true');
    button.textContent = 'notarize';
    button.onclick = buttonHandler(href);
    article.appendChild(button);
  });
};

const addNotarizeButtons = () => {
  const bodyObserver = new MutationObserver(bodyObserverCallback);
  const body = document.querySelector('body')!;
  const observerConfig = { attributes: false, childList: true, subtree: true };
  bodyObserver.observe(body, observerConfig);
};

addNotarizeButtons();
