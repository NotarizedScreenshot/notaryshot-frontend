import { useState } from 'react';
import cn from 'classnames';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { UrlForm } from 'components';
import classes from 'App.module.scss';

function App() {
  const [requesting, setRequesting] = useState<boolean>(false);
  const [requested, setRequested] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const getScreenShot = async (url: string): Promise<boolean> => {
    try {
      if (!isConnected) {
        openConnectModal!();
        return true;
      }
      if (!address) {
        throw new Error('can not get address');
      }
      setRequesting(true);
      setRequested(false);
      setScreenshot(null);
      setErrors([]);
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
      setRequested(true);
      setRequesting(false);
      return true;
    }
  };

  return (
    <div className={cn(classes.App, requesting || requested ? classes.requesting : null)}>
      <ConnectButton />
      <h1 className={classes.h1} hidden={requesting || requested}>
        Welcome to Quantum Oracle
      </h1>
      <div className={classes.urlForm}>
        <UrlForm onSubmit={getScreenShot} inline={requested || requesting} />
      </div>
      {requesting && <div className={classes.progress}>Requesting...</div>}
      {requested && (
        <div className={classes.results}>
          {
            <div className={classes.screenshot}>
              {screenshot ? (
                <img src={screenshot} alt='screenshot'></img>
              ) : (
                <div className={classes.failure}>
                  Something goes wrong. Can't get screenshot.
                </div>
              )}
            </div>
          }
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
        </div>
      )}
    </div>
  );
}

export default App;
