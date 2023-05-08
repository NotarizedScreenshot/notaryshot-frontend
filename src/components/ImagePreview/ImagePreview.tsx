import { IImagePreviewProps } from './ImagePreviewProps';
import classes from './ImagePreview.module.scss';

import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

export const ImagePreview: React.FC<IImagePreviewProps> = ({ image, qrData }) => {
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [qrCodeError, setQrCodeError] = useState<Error | null>(null);

  useEffect(() => {
    if (!!qrData)
      QRCode.toDataURL(JSON.stringify(qrData))
        .then(setQrUrl)
        .catch((error) => {
          console.log('qr error', error);
          setQrCodeError(error);
        });
  }, [qrData]);
  return (
    <div className={classes.container}>
      <div className={classes.image}>
        {image ? <img src={image} alt='preview screenshot' /> : 'Failed to load image'}
      </div>
      <div className={classes.qr}>
        {!!qrUrl ? (
          <>
            <img className={classes.qrImage} src={qrUrl} alt='meta qr' />
            <p className={classes.p}>Scan to get your metadata</p>
          </>
        ) : qrCodeError ? (
          <div>{qrCodeError.message}</div>
        ) : (
          <div className={classes.loading}>Loading QR...</div>
        )}
      </div>
    </div>
  );
};
