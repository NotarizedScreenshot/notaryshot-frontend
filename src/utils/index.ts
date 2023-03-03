export const getPreviewMetadata = (url: string, ip: string = '0.0.0.0') => {
  //TODO: to be removed once real metadata obtainalbe
  const date = new Date(Date.now()).toString();

  const headers: { [id: string]: string } = {
    'accept-ch':
      'Sec-CH-UA-Bitness, Sec-CH-UA-Arch, Sec-CH-UA-Full-Version, Sec-CH-UA-Mobile, Sec-CH-UA-Model, Sec-CH-UA-Platform-Version, Sec-CH-UA-Full-Version-List, Sec-CH-UA-Platform, Sec-CH-UA, UA-Bitness, UA-Arch, UA-Full-Version, UA-Mobile, UA-Model, UA-Platform-Version, UA-Platform, UA',
    date,
    expires: date,
    'last-modified': date,
    location: 'https://ya.ru/?nr=1&redirect_ts=1676310742.38901',
    nel: '{"report_to": "network-errors", "max_age": 100, "success_fraction": 0.001, "failure_fraction": 0.1}',
    p3p: 'policyref="/w3c/p3p.xml", CP="NON DSP ADM DEV PSD IVDo OUR IND STP PHY PRE NAV UNI"',
    'x-content-type-options': 'nosniff',
    'x-req-id':
      '1676310742355222-10222453901922640994-sas2-0311-sas-l7-balancer-8080-BAL-9322',
  };
  const host = new URL(url).host;
  const dns = {
    host,
    data: [
      'J20C0QKDHUA3CUMNKST289FF06U2SQ91.ru. 3600 IN NSEC3 1 1 0 - J21C11SHOOTMOEQKPRM91C8AGL4886M6  NS SOA RRSIG DNSKEY NSEC3PARAM',
      'J20C0QKDHUA3CUMNKST289FF06U2SQ91.ru. 3600 IN RRSIG NSEC3 8 2 3600 20230303214716 20230118081850 5244 ru. uVTLFvwYq7lZiXeA4s5jaLgfa6mAlEEWVl0BXup1vH1pCXBQTYE3bjlq oEsEFRcwmS8DdeodHAPAvVvJmcGpvm4gi0VSp7eycW91WYlnw3N2GoO1 4Ou9X5e1pG0r5F+wOEWJoNpLuRlzuJtC70wwHRYS0kSUqgyf/L4gDeIa n54=',
      '73V67SB5T7RARCDKCVV7DUAU5098A2C4.ru. 3600 IN NSEC3 1 1 0 - 74207CNEQ1H6B9C4K17GU9DTJ3B0PGC1  NS DS RRSIG',
      '73V67SB5T7RARCDKCVV7DUAU5098A2C4.ru. 3600 IN RRSIG NSEC3 8 2 3600 20230303040131 20230122021857 5244 ru. fIoGlPUiHUs4Mmd9CAshzdS6IIJdmhqEI/j6V3bHlpiRReAVMOI5umbj Ea8KpAzJ6YkGu0Pz0cMZCZ8ZUGRaQXc5cz2zJ7zovHcslJsgZoErfgdR +58qStAIQMXN6A5z/3f5HtiKgzbfQ+rgV4/BfOx5x6syKtrw7TLocaKc YvU=',
      ';; Received 653 bytes from 193.232.156.17#53(f.dns.ripn.net) in 145 ms',
      '',
      `${host}.\t\t\t3600\tIN\tSOA\tns1.${host}. sysadmin.${host}. 2023020800 900 600 2592000 900`,
      `${host}.\t\t\t1200\tIN\tTXT\t"v=spf1 redirect=_spf${host}"`,
      `${host}.\t\t\t1200\tIN\tTXT\t"_globalsign-domain-verification=dHoe580bPQ-lfi_vh-BEIwB4NAtUwURIzrzsivByVL"`,
      `${host}.\t\t\t1200\tIN\tTXT\t"e1c8e4dd3d13fad0dd9e8ed54a1813ececd3d5412fb16c4ed2c0612332950fe"`,
      `${host}.\t\t\t1200\tIN\tTXT\t"_globalsign-domain-verification=eLi0_-xATuNmRfuTIX8VQIvgfyi7Od7Hph4V0yNisF"`,
      `${host}.\t\t\t7200\tIN\tMX\t10 mx.${host}.`,
      `${host}.\t\t\t60\tIN\tAAAA\t2a02:6b8::2:242`,
      `${host}.\t\t\t600\tIN\tA\t87.250.250.242`,
      `${host}.\t\t\t7200\tIN\tNS\tns2.${host}.`,
      `${host}.\t\t\t7200\tIN\tNS\tns1.${host}.`,
      `${host}.\t\t\t3600\tIN\tCAA\t0 issue "globalsign.com"`,
      `${host}.\t\t\t3600\tIN\tCAA\t0 issuewild "globalsign.com"`,
      `;; Received 550 bytes from 213.180.193.1#53(ns1.${host}) in 88 ms`,
    ],
  };

  const headersStrings = Object.keys(headers).map(
    (title: string) => `${title} ${headers[title]}`,
  );
  return [...headersStrings, ip, url, dns.host, ...dns.data];
};

export const convertImageSize = (
  srcWidth: number,
  srcHeight: number,
  canvasWidth: number,
  canvasHeight: number,
): {
  height: number;
  width: number;
} => {
  const srcRatio = srcWidth / srcHeight;
  if ((srcRatio < 1 || canvasWidth >= canvasHeight) && canvasHeight * srcRatio < canvasWidth) {
    return { height: canvasHeight, width: canvasHeight * srcRatio };
  }
  return { height: canvasWidth / srcRatio, width: canvasWidth };
};

export const getOffset = (
  canvasWidth: number,
  canvasHeight: number,
  imageWidth: number,
  imageHeight: number,
  offsetXRatio: number = 0,
  offsetYRatio: number = 0,
): { x: number; y: number } => {
  if (imageWidth > canvasWidth || imageHeight > canvasHeight)
    throw new Error('image bigger that canvas');

  if (
    (imageWidth === canvasWidth && offsetXRatio !== 0) ||
    (imageHeight === canvasHeight && offsetYRatio !== 0)
  )
    throw new Error('cannot offset if equal sizes');

  if (Math.abs(offsetXRatio) > 1 || Math.abs(offsetYRatio) > 1)
    throw new Error('offsetRaion more than 1');

  const xDiff = canvasWidth - imageWidth;
  const yDiff = canvasHeight - imageHeight;

  return { x: (xDiff / 2) * (1 + offsetXRatio), y: (yDiff / 2) * (1 + offsetYRatio) };
};

export const getStampedImagePreviewDataUrl = (
  backgroundImage: HTMLImageElement,
  watermarkImgae: HTMLImageElement,
  metadata: string[] = [],
  canvasWidth: number = 500,
  metadataOptions: {
    stringMaxWidth: number;
    leftPadding: number;
    lineHeight: number;
    font: string;
    color: string;
  } = {
    stringMaxWidth: 400,
    leftPadding: 10,
    lineHeight: 5,
    font: '5px monospace',
    color: 'red',
  },
): string => {
  const canvas = document.createElement('canvas');

  const imgWidth = backgroundImage.width;
  const imgHeight = backgroundImage.height;
  const imgRatio = imgWidth / imgHeight;

  const stampWidth = watermarkImgae.width;
  const stampHeight = watermarkImgae.height;

  const canvasHeight = canvasWidth / imgRatio;

  canvas.setAttribute('width', String(canvasWidth));
  canvas.setAttribute('height', String(canvasHeight));

  const ctx = canvas.getContext('2d')!;

  ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);

  const stampFitCanvasSizes = convertImageSize(
    stampWidth,
    stampHeight,
    canvasWidth,
    canvasHeight,
  );

  const offset = getOffset(
    canvasWidth,
    canvasHeight,
    stampFitCanvasSizes.width,
    stampFitCanvasSizes.height,
  );
  ctx.drawImage(
    watermarkImgae,
    offset.x,
    offset.y,
    stampFitCanvasSizes.width,
    stampFitCanvasSizes.height,
  );

  const { font, color, leftPadding, lineHeight, stringMaxWidth } = metadataOptions;

  ctx.font = font;
  ctx.fillStyle = color;

  metadata.forEach((string, index) => {
    const stringWidth = ctx.measureText(string).width;
    if (stringWidth > stringMaxWidth) {
      const maxLength = Math.floor(stringMaxWidth / (stringWidth / string.length));
      ctx.fillText(string.substring(0, maxLength), leftPadding, lineHeight * index);
      return;
    }
    ctx.fillText(string, leftPadding, lineHeight * index);
  });

  return canvas.toDataURL();
};

export const validateBigInt = (data: string): Promise<boolean> =>
  new Promise((resovle, reject) => {
    if (data.length === 0) reject(new Error('should not be empty'));
    if (!/^\d+$/.test(data)) reject(new Error('should contain only digits'));
    if (BigInt(data) > BigInt(2 ** 64 - 1)) reject(new Error('should be a valid 64-bit UInt'));
    resovle(true);
  });
