import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { UrlForm, Header, ScreenshotPreview } from 'components';
import classes from 'App.module.scss';
import { getPreviewMetadata, getStampedImagePreviewDataUrl } from 'utils';

const PREVIEW_IMG_DEFAULT_WIDTH = 500;
const WATERMARK_URL = 'stamp.png';

function App() {
  const [requesting, setRequesting] = useState<boolean>(false);
  const [requested, setRequested] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [stampedScreenshotUrl, setStampedScreenshotUrl] = useState<string | null>(null);
  const [requestUrl, setRequestUtl] = useState<string | null>(null);

  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  

  const getScreenShot = async (url: string): Promise<boolean> => {
    try {
      if (!isConnected) {
        openConnectModal!();
        return false;
      }
      if (!address) {
        throw new Error('can not get address');
      }
      setRequesting(true);
      setRequested(false);
      setScreenshotUrl(null);
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
      setScreenshotUrl(objectURL);

      setRequested(true);
      setRequesting(false);
    } catch (error: any) {
      setErrors((prev) => [...prev, error.message]);
    } finally {
      if (!!address) {
        setRequested(true);
        setRequesting(false);
      }
      return true;
    }
  };

  useEffect(() => {
    if (!!screenshotUrl && !!requestUrl) {
      const img = new Image();
      img.src = screenshotUrl;

      const stamp = new Image();
      stamp.src = WATERMARK_URL;

      const loadImage = (src: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Error on loading image src: ${img.src}`));
          img.src = src;
        });

      Promise.all([loadImage(screenshotUrl), loadImage(WATERMARK_URL)])
        .then(([backgroundImage, watermarkImage]) => {
          setStampedScreenshotUrl(
            getStampedImagePreviewDataUrl(
              backgroundImage,
              watermarkImage,
              getPreviewMetadata(requestUrl),
              PREVIEW_IMG_DEFAULT_WIDTH,
            ),
          );
        })
        .catch((error) => {
          setErrors((prev) => [...prev, error.message]);
        });
    }
  }, [screenshotUrl, requestUrl]);

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
          <ScreenshotPreview screenshotUrl={screenshotUrl} />
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
          <ScreenshotPreview screenshotUrl={stampedScreenshotUrl} />
        </div>
      )}
    </div>
  );
}

export default App;
