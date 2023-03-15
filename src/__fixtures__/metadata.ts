import { IMetadata, ITweetData } from 'types';

export const metadataStub1: IMetadata = {
  headers: {
    'cache-control': 'no-cache, no-store, must-revalidate, pre-check=0, post-check=0',
    'content-encoding': 'gzip',
    'content-security-policy':
      "connect-src 'self' blob: https://*.pscp.tv https://*.video.pscp.tv https://*.twimg.com https://api.twitter.com https://api-stream.twitter.com https://ads-api.twitter.com https://aa.twitter.com https://caps.twitter.com https://pay.twitter.com https://sentry.io https://ton.twitter.com https://twitter.com https://upload.twitter.com https://www.google-analytics.com https://accounts.google.com/gsi/status https://accounts.google.com/gsi/log https://app.link https://api2.branch.io https://bnc.lt wss://*.pscp.tv https://vmap.snappytv.com https://vmapstage.snappytv.com https://vmaprel.snappytv.com https://vmap.grabyo.com https://dhdsnappytv-vh.akamaihd.net https://pdhdsnappytv-vh.akamaihd.net https://mdhdsnappytv-vh.akamaihd.net https://mdhdsnappytv-vh.akamaihd.net https://mpdhdsnappytv-vh.akamaihd.net https://mmdhdsnappytv-vh.akamaihd.net https://mdhdsnappytv-vh.akamaihd.net https://mpdhdsnappytv-vh.akamaihd.net https://mmdhdsnappytv-vh.akamaihd.net https://dwo3ckksxlb0v.cloudfront.net https://media.riffsy.com https://*.giphy.com https://media.tenor.com https://c.tenor.com ; default-src 'self'; form-action 'self' https://twitter.com https://*.twitter.com; font-src 'self' https://*.twimg.com; frame-src 'self' https://twitter.com https://mobile.twitter.com https://pay.twitter.com https://cards-frame.twitter.com https://accounts.google.com/ https://client-api.arkoselabs.com/ https://iframe.arkoselabs.com/  https://recaptcha.net/recaptcha/ https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/; img-src 'self' blob: data: https://*.cdn.twitter.com https://ton.twitter.com https://*.twimg.com https://analytics.twitter.com https://cm.g.doubleclick.net https://www.google-analytics.com https://maps.googleapis.com https://www.periscope.tv https://www.pscp.tv https://media.riffsy.com https://*.giphy.com https://media.tenor.com https://c.tenor.com https://*.pscp.tv https://*.periscope.tv https://prod-periscope-profile.s3-us-west-2.amazonaws.com https://platform-lookaside.fbsbx.com https://scontent.xx.fbcdn.net https://scontent-sea1-1.xx.fbcdn.net https://*.googleusercontent.com; manifest-src 'self'; media-src 'self' blob: https://twitter.com https://*.twimg.com https://*.vine.co https://*.pscp.tv https://*.video.pscp.tv https://dhdsnappytv-vh.akamaihd.net https://pdhdsnappytv-vh.akamaihd.net https://mdhdsnappytv-vh.akamaihd.net https://mdhdsnappytv-vh.akamaihd.net https://mpdhdsnappytv-vh.akamaihd.net https://mmdhdsnappytv-vh.akamaihd.net https://mdhdsnappytv-vh.akamaihd.net https://mpdhdsnappytv-vh.akamaihd.net https://mmdhdsnappytv-vh.akamaihd.net https://dwo3ckksxlb0v.cloudfront.net; object-src 'none'; script-src 'self' 'unsafe-inline' https://*.twimg.com https://recaptcha.net/recaptcha/ https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://client-api.arkoselabs.com/ https://www.google-analytics.com https://twitter.com https://app.link https://accounts.google.com/gsi/client https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js  'nonce-ZTIxNjA3M2ItZGEzOS00M2ExLThkZmUtZjhjMTFjOWQxYjA2'; style-src 'self' 'unsafe-inline' https://accounts.google.com/gsi/style https://*.twimg.com; worker-src 'self' blob:; report-uri https://twitter.com/i/csp_report?a=O5RXE%3D%3D%3D&ro=false",
    'content-type': 'text/html; charset=utf-8',
    'cross-origin-embedder-policy': 'unsafe-none',
    'cross-origin-opener-policy': 'same-origin-allow-popups',
    date: 'Thu, 23 Feb 2023 14:26:53 GMT',
    expiry: 'Tue, 31 Mar 1981 05:00:00 GMT',
    'last-modified': 'Thu, 23 Feb 2023 14:26:53 GMT',
    perf: '7626143928',
    pragma: 'no-cache',
    server: 'tsa_f',
    'set-cookie':
      'guest_id=v1%3A167716241308199562; Max-Age=34214400; Expires=Mon, 25 Mar 2024 14:26:53 GMT; Path=/; Domain=.twitter.com; Secure; SameSite=None',
    'strict-transport-security': 'max-age=631138519',
    'x-connection-hash': '2bfaafe9739067702840ad337e9453fbce88e81039edd367a3860a256d189162',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY',
    'x-powered-by': 'Express',
    'x-response-time': '128',
    'x-transaction-id': 'da6fdf7f65fc3c69',
    'x-xss-protection': '0',
  },
  ip: '104.244.42.1',
  url: 'https://twitter.com/arestovych/status/1628702562504306689',
  dns: {
    host: 'twitter.com',
    data: [
      '; <<>> DiG 9.10.6 <<>> twitter.com +trace any',
      ';; global options: +cmd',
      '.\t\t\t12078\tIN\tNS\ti.root-servers.net.',
      '.\t\t\t12078\tIN\tNS\te.root-servers.net.',
      '.\t\t\t12078\tIN\tNS\tl.root-servers.net.',
      '.\t\t\t12078\tIN\tNS\tm.root-servers.net.',
      '.\t\t\t12078\tIN\tNS\th.root-servers.net.',
      '.\t\t\t12078\tIN\tNS\tc.root-servers.net.',
      '.\t\t\t12078\tIN\tNS\td.root-servers.net.',
      '.\t\t\t12078\tIN\tNS\tb.root-servers.net.',
      '.\t\t\t12078\tIN\tNS\tj.root-servers.net.',
      '.\t\t\t12078\tIN\tNS\tg.root-servers.net.',
      '.\t\t\t12078\tIN\tNS\tk.root-servers.net.',
      '.\t\t\t12078\tIN\tNS\tf.root-servers.net.',
      '.\t\t\t12078\tIN\tNS\ta.root-servers.net.',
      '.\t\t\t12078\tIN\tRRSIG\tNS 8 0 518400 20230308050000 20230223040000 951 . gYpGnWJim88jzPX9TbTk1x0+bDUWg6FI4Qcbfzl4wO/NeyF7Sbayjm7O oV2wQzlacKQm8F+8GChw1Tj/mkAbxCcR75zFrD+a7GBLVlj7X2voRvrY WqxZEUGe37bfcncWvgWjzknfxMw5d3FjV7jr8fpU5kWT6mcMlYpPKz+T N7B76550Vv0HIN3N8QnpYSy4z9M1WctCWe95XGOW8Oy2NUAN1BjjeJWJ mjAwZmsePOAOAmpATzIXd1cXJ1Wmb1P1kQP7ewDRpfctA+zFEyofhoAf eWsV7xTs/7UFFTstKNiLjcYb2l9zEG79JOGMl3bGQ1/Qaq4nFCuOU6Ut 2XyZKg==',
      ';; Received 525 bytes from 192.168.1.1#53(192.168.1.1) in 9 ms',
      '',
      'com.\t\t\t172800\tIN\tNS\ta.gtld-servers.net.',
      'com.\t\t\t172800\tIN\tNS\tb.gtld-servers.net.',
      'com.\t\t\t172800\tIN\tNS\tc.gtld-servers.net.',
      'com.\t\t\t172800\tIN\tNS\td.gtld-servers.net.',
      'com.\t\t\t172800\tIN\tNS\te.gtld-servers.net.',
      'com.\t\t\t172800\tIN\tNS\tf.gtld-servers.net.',
      'com.\t\t\t172800\tIN\tNS\tg.gtld-servers.net.',
      'com.\t\t\t172800\tIN\tNS\th.gtld-servers.net.',
      'com.\t\t\t172800\tIN\tNS\ti.gtld-servers.net.',
      'com.\t\t\t172800\tIN\tNS\tj.gtld-servers.net.',
      'com.\t\t\t172800\tIN\tNS\tk.gtld-servers.net.',
      'com.\t\t\t172800\tIN\tNS\tl.gtld-servers.net.',
      'com.\t\t\t172800\tIN\tNS\tm.gtld-servers.net.',
      'com.\t\t\t86400\tIN\tDS\t30909 8 2 E2D3C916F6DEEAC73294E8268FB5885044A833FC5459588F4A9184CF C41A5766',
      'com.\t\t\t86400\tIN\tRRSIG\tDS 8 1 86400 20230308050000 20230223040000 951 . o7EZzJ5CeyVLMrZ2RMJElZqcjCjABmYkF8CDJpbnqirx0brBS9pDajNw DPsgsPzZUxlrqZ74ag3e+X/ZDTIuFkgk69wjFQfBHu+Hg4BDzfy9OHpe INoyqcuA2dvuplHZVLzw5U9LZLHDU7K9F3m0g/syEdjYIEOZhi5ATey4 EeNuVRvtDL2elSLGV1qEI/hNlHKg7en5l5yNvE8G+bFQ3C4Oen4C9+da kENODrEl+XJ5CSzgJHpsiu8yBNqz0K+eg7HssbnIyrbGCUzChkg1vPAe J7OqwBgaatjQauOtALVSBzwJtcUG8KTCHH2IqKi8JFh9jNxQkaFgewzB ftIK5w==',
      ';; Received 1171 bytes from 199.9.14.201#53(b.root-servers.net) in 493 ms',
      '',
      'twitter.com.\t\t172800\tIN\tNS\tns3.p34.dynect.net.',
      'twitter.com.\t\t172800\tIN\tNS\tns4.p34.dynect.net.',
      'twitter.com.\t\t172800\tIN\tNS\td01-01.ns.twtrdns.net.',
      'twitter.com.\t\t172800\tIN\tNS\td01-02.ns.twtrdns.net.',
      'twitter.com.\t\t172800\tIN\tNS\ta.r06.twtrdns.net.',
      'twitter.com.\t\t172800\tIN\tNS\tb.r06.twtrdns.net.',
      'twitter.com.\t\t172800\tIN\tNS\tc.r06.twtrdns.net.',
      'twitter.com.\t\t172800\tIN\tNS\td.r06.twtrdns.net.',
      'CK0POJMG874LJREF7EFN8430QVIT8BSM.com. 86400 IN NSEC3 1 1 0 - CK0Q2D6NI4I7EQH8NA30NS61O48UL8G5  NS SOA RRSIG DNSKEY NSEC3PARAM',
      'CK0POJMG874LJREF7EFN8430QVIT8BSM.com. 86400 IN RRSIG NSEC3 8 2 86400 20230227052255 20230220041255 36739 com. YJw2xFEhDVUfIlym8yUrXw8rVYLxS+e/EkIJVmOkBANnfCmNPVATcGuM /DIrUz8PTWTezM5z6f2tM+KnzzXYMNL1ScDIgO/jaJUrs4aOz1EOPwD4 hk5rJ/pRSY9C87vRoxqdryDIHxg3TwwEfQglqQ9hk+P1qvU7qY5nd0yc tO+IV8Vqd0sRiteg/P1h6Bpp79v/kZNjntRTdnWLI2oW2g==',
      '7T79IH3K98ANHB9RV004M68QQUT9R1LB.com. 86400 IN NSEC3 1 1 0 - 7T7A4HLVUFSDN05CDRJDHI4V9196IP2D  NS DS RRSIG',
      '7T79IH3K98ANHB9RV004M68QQUT9R1LB.com. 86400 IN RRSIG NSEC3 8 2 86400 20230228054330 20230221043330 36739 com. sEP/mI7aUazbnmVhiZEiHktzDmc/b4YNzPjF9M9GIqSNXUV6tCwiXbqi 1nUtwdsDxSkTvzT9u8vB7wPsp6cODEKIRDHhp5af8TSVkG32RHIbKQcH HsGFLql4WG/p2sJ6psKZfqfJvNm3zO5pYpbk0tJ/4OQ6dB7o+Rhyu0dt ut7hRlr9Zm0Hy39v3+m97D7ooe3XnMozEFa8pmItlUC+7g==',
      ';; Received 760 bytes from 192.31.80.30#53(d.gtld-servers.net) in 215 ms',
      '',
      'twitter.com.\t\t1800\tIN\tA\t104.244.42.65',
      'twitter.com.\t\t13999\tIN\tNS\ta.r06.twtrdns.net.',
      'twitter.com.\t\t13999\tIN\tNS\ta.u06.twtrdns.net.',
      'twitter.com.\t\t13999\tIN\tNS\tb.r06.twtrdns.net.',
      'twitter.com.\t\t13999\tIN\tNS\tb.u06.twtrdns.net.',
      'twitter.com.\t\t13999\tIN\tNS\tc.r06.twtrdns.net.',
      'twitter.com.\t\t13999\tIN\tNS\tc.u06.twtrdns.net.',
      'twitter.com.\t\t13999\tIN\tNS\td.r06.twtrdns.net.',
      'twitter.com.\t\t13999\tIN\tNS\td.u06.twtrdns.net.',
      'twitter.com.\t\t13999\tIN\tNS\tns1.p34.dynect.net.',
      'twitter.com.\t\t13999\tIN\tNS\tns2.p34.dynect.net.',
      'twitter.com.\t\t13999\tIN\tNS\tns3.p34.dynect.net.',
      'twitter.com.\t\t13999\tIN\tNS\tns4.p34.dynect.net.',
      'twitter.com.\t\t293\tIN\tSOA\tns1.p26.dynect.net. zone-admin.dyndns.com. 2007176796 3600 600 604800 60',
      'twitter.com.\t\t600\tIN\tMX\t10 aspmx.l.google.com.',
      'twitter.com.\t\t600\tIN\tMX\t20 alt1.aspmx.l.google.com.',
      'twitter.com.\t\t600\tIN\tMX\t20 alt2.aspmx.l.google.com.',
      'twitter.com.\t\t600\tIN\tMX\t30 aspmx2.googlemail.com.',
      'twitter.com.\t\t600\tIN\tMX\t30 aspmx3.googlemail.com.',
      'twitter.com.\t\t293\tIN\tTXT\t"0a8c0fc6-bfa5-4ea7-b09b-87f2989022d6"',
      'twitter.com.\t\t293\tIN\tTXT\t"MS=BEE202D20C326867290BDEFA2DDDF4594B5D6860"',
      'twitter.com.\t\t293\tIN\tTXT\t"adobe-idp-site-verification=a2ff8fc40c434d1d6f02f68b0b1a683e400572ab8c1f2c180c71c3d985b9270a"',
      'twitter.com.\t\t293\tIN\tTXT\t"apple-domain-verification=zd1iHoEO9LILEQIq"',
      'twitter.com.\t\t293\tIN\tTXT\t"atlassian-domain-verification=CCYSIJhsAnbjYWrbdw5r//aHNsYnzgv7Z6Gwz4TkAv5OYdZt3Lm/ycLxT2tmfm/n"',
      'twitter.com.\t\t293\tIN\tTXT\t"bj6sbt5xqs9hw9jrfvz7hplrg0l680sb"',
      'twitter.com.\t\t293\tIN\tTXT\t"canva-site-verification=lMnZ3wMh7c1uqZqa-cxZTg"',
      'twitter.com.\t\t293\tIN\tTXT\t"google-site-verification=TNhAkfLUeIbzzzSgPNxS5aEkKMf3aUcpPmCK1_kmIvU"',
      'twitter.com.\t\t293\tIN\tTXT\t"google-site-verification=h6dJIv0HXjLOkGAotLAWEzvoi9SxqP4vjpx98vrCvvQ"',
      'twitter.com.\t\t293\tIN\tTXT\t"loom-site-verification=638c6bc173b9458997f64d305bf42499"',
      'twitter.com.\t\t293\tIN\tTXT\t"miro-verification=6e1ca9ad6d0c2cd2e4186141265f23ed618cfe37"',
      'twitter.com.\t\t293\tIN\tTXT\t"mixpanel-domain-verify=164dda91-31f4-41e8-a816-0f59b38fea30"',
      'twitter.com.\t\t293\tIN\tTXT\t"traction-guest=6882b04e-4188-4ff9-8bb4-bff5a3d358e6"',
      'twitter.com.\t\t293\tIN\tTXT\t"traction-guest=a4d0248d-fe01-4222-8fcc-33f68323e667"',
      'twitter.com.\t\t293\tIN\tTXT\t"v=spf1 ip4:199.16.156.0/22 ip4:199.59.148.0/22 ip4:8.25.194.0/23 ip4:8.25.196.0/23 ip4:204.92.114.203 ip4:204.92.114.204/31 ip4:54.156.255.69 include:_spf.google.com include:_thirdparty.twitter.com include:spf.smtp2go.com -all"',
      'twitter.com.\t\t293\tIN\tTXT\t"wrike-verification=MjU4MTA5MjoyN2UzNDc1MjU3MDZiZTY4NjBiNzliNDQ2OTUwNWY3NmM5NDgyMTBlYzFkNTcwYTE2YWNmZDdkNTY2ZmE4Yzlh"',
      ';; Received 1822 bytes from 205.251.196.198#53(b.r06.twtrdns.net) in 101 ms',
    ],
  },
};

export const metadataStub2: IMetadata = {
  ip: '127.127.127.127',
  url: 'https://twitter.com',
  dns: {
    host: 'twitter.com',
    data: [
      'twitter.com.\t\t293\tIN\tTXT\t"bj6sbt5xqs9hw9jrfvz7hplrg0l680sb"',
      '; <<>> DiG 9.10.6 <<>> twitter.com +trace any',
    ],
  },
  headers: {
    'cache-control': 'no-cache, no-store, must-revalidate, pre-check=0, post-check=0',
    'content-encoding': 'gzip',
  },
};
