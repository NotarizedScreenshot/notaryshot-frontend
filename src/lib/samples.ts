export const getSampleMetadata = () => {
  return {
    ip: '0.0.0.0',
    url: 'https://twitter.com',
    dns: {
      host: 'twitter.com',
      data: [
        'twitter.com.\t\t\t12078\tIN\tNS\ti.root-servers.net.',
        'twitter.com.\t\t\t12078\tIN\tNS\te.root-servers.net.',
        'twitter.com.\t\t\t12078\tIN\tNS\tl.root-servers.net.',
        'twitter.com.\t\t\t12078\tIN\tNS\tm.root-servers.net.',
        'twitter.com.\t\t\t12078\tIN\tNS\th.root-servers.net.',
        'twitter.com.\t\t\t12078\tIN\tNS\tc.root-servers.net.',
        'twitter.com.\t\t\t12078\tIN\tNS\td.root-servers.net.',
      ],
    },
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, pre-check=0, post-check=0',
      'content-encoding': 'gzip',
      'content-type': 'text/html; charset=utf-8',
      'cross-origin-embedder-policy': 'unsafe-none',
      'cross-origin-opener-policy': 'same-origin-allow-popups',
    },
  };
};
