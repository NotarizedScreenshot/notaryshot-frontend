import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { UrlForm, Header, ScreenshotPreview } from 'components';
import classes from 'App.module.scss';
import { getPreviewMetadata, convertImageSize, getOffset } from 'utils';

function App() {
  const [requesting, setRequesting] = useState<boolean>(false);
  const [requested, setRequested] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [stampedScreenshot, setStampedScreenshot] = useState<string | null>(null);
  const [requestUrl, setRequestUtl] = useState<string | null>(null);

  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const getScreenShot = async (url: string): Promise<boolean> => {
    try {
      if (!isConnected) {
        openConnectModal!();
        return false;
      }
      console.log('tests');
      if (!address) {
        throw new Error('can not get address');
      }
      setRequesting(true);
      setRequested(false);
      setScreenshot(null);
      setErrors([]);
      setRequestUtl(url);
      const response = await fetch('/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        try {
          if (response.status === 404) {
            setErrors((prev) => [...prev, 'can not find server']);
          }
          const data = await response.json();
          setErrors((prev) => [...prev, data.error]);
        } catch (error: any) {
          if (response.status === 500) {
            setErrors((prev) => [...prev, 'Internal Server Error']);
          }
          setErrors((prev) => [...prev, error.message]);
        }
        return true;
      }

      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      setScreenshot(objectURL);

      setRequested(true);
      setRequesting(false);
    } catch (error: any) {
      setErrors((prev) => [...prev, error.message]);
    } finally {
      if (!address) return true;
      setRequested(true);
      setRequesting(false);
      return true;
    }
  };

  useEffect(() => {
    if (!!screenshot && !!requestUrl) {
      const img = new Image();
      img.src = screenshot;
      console.log('img', img.width, img.height, img.sizes);

      const stamp = new Image();
      stamp.src = 'stamp.png';

      stamp.onload = () =>
        (img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 500;

          const imgWidth = img.width;
          const imgHeight = img.height;
          const imgRatio = imgWidth / imgHeight;

          const stampWidth = stamp.width;
          const stampHeight = stamp.height;

          const CANVAS_WIDTH = maxWidth;
          const CANVAS_HEIGHT = CANVAS_WIDTH / imgRatio;

          canvas.setAttribute('width', String(CANVAS_WIDTH));
          canvas.setAttribute('height', String(CANVAS_HEIGHT));

          const ctx = canvas.getContext('2d')!;

          ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

          const stampFitCanvasSizes = convertImageSize(
            stampWidth,
            stampHeight,
            CANVAS_WIDTH,
            CANVAS_HEIGHT,
          );

          const offset = getOffset(
            CANVAS_WIDTH,
            CANVAS_HEIGHT,
            stampFitCanvasSizes.width,
            stampFitCanvasSizes.height,
          );
          ctx.drawImage(
            stamp,
            offset.x,
            offset.y,
            stampFitCanvasSizes.width,
            stampFitCanvasSizes.height,
          );

          ctx.font = '5px monospace';
          ctx.fillStyle = 'red';
          const ctxFillTextX = 10;
          const ctxFillTextY = 5;

          const metaPreview = getPreviewMetadata(requestUrl);

          metaPreview.forEach((string, index) => {
            const stringWidth = ctx.measureText(string).width;
            if (stringWidth > 480) {
              const maxLength = Math.floor(480 / (stringWidth / string.length));
              ctx.fillText(string.substring(0, maxLength), ctxFillTextX, ctxFillTextY * index);
              return;
            }
            ctx.fillText(string, ctxFillTextX, ctxFillTextY * index);
          });

          const buf = canvas.toDataURL();
          setStampedScreenshot(buf);
        })();
    }
  }, [screenshot, requestUrl]);

  return (
    <div className={cn(classes.App, requesting || requested ? classes.requesting : null)}>
      <Header />
      <h1 className={classes.h1} hidden={requesting || requested}>
        Welcome to Quantum Oracle
      </h1>
      <div className={classes.urlForm}>
        <UrlForm onSubmit={getScreenShot} inline={requested || requesting} />
      </div>
      {requesting && <div className={classes.progress}>Requesting...</div>}
      {requested && (
        <div className={classes.results}>
          <ScreenshotPreview screenshot={screenshot} />
          {
            <div className={cn(classes.status, errors.length > 0 ? classes.failure : null)}>
              <h3 className={classes.h3}>status:</h3>
              {errors.length > 0 ? (
                errors.map((error, index) => (
                  <div key={error + index} className={classes.errorMessage}>
                    {'error: ' + error}
                  </div>
                ))
              ) : (
                <div className={classes.succeed}>succeed</div>
              )}
            </div>
          }
          <ScreenshotPreview screenshot={stampedScreenshot} />
        </div>
      )}
    </div>
  );
}

export default App;
