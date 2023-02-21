import './content.css';

const buttonHandler = (url: string) => () => {
  chrome.runtime.sendMessage({ url }, (response) => {
    console.log('button handler sendMessage response: ', response);
  });
};

const addNotarizeButtons = () => {
  const bodyObserverCallback = (mutationList: any, bodyObserver: any) => {
    mutationList.forEach((mutationRecord: any) => {
      mutationRecord.addedNodes.forEach((node: any) => {
        if (!!node.tagName && node.tagName.toLocaleLowerCase() === 'section') {
          const tweetsObserver = new MutationObserver((mutationList, tweetsObserver) => {
            mutationList.forEach((mutationRecord) => {
              mutationRecord.addedNodes.forEach((node: any) => {
                if (node.getAttribute('data-testid') === 'cellInnerDiv') {
                  const article = node.querySelector('article');

                  if (!!article) {
                    const link = article.querySelector('a:has(time)');
                    const href = link?.href;
                    const button = document.createElement('button');
                    button.classList.add('btn-test');
                    button.textContent = 'notarize';
                    button.onclick = buttonHandler(href);
                    article.appendChild(button);
                  }
                }
              });
            });
          });

          tweetsObserver.observe(node, { attributes: false, childList: true, subtree: true });
        }
      });
    });
  };

  const bodyObserver = new MutationObserver(bodyObserverCallback);
  const body = document.querySelector('body')!;
  const observerConfig = { attributes: false, childList: true, subtree: true };
  bodyObserver.observe(body, observerConfig);
};

addNotarizeButtons();
