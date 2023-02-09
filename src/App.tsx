import { useState } from 'react';
import cn from 'classnames';
import { UrlForm } from 'components';
import classes from 'App.module.scss';

function App() {
  const [requesting, setRequesting] = useState<boolean>(false);
  const [requested, setRequested] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const getScreenShot = (url: string) => {
    console.log('url for screenshot: ', url);
    setRequesting(true);
    setRequested(false);
    setScreenshot(null);
    setErrors([]);

    fetch('/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          response.json().then(({ error }) => {
            setErrors((prev) => [...prev, error]);
          });
          return;
        }
        response.blob().then((blob) => {
          const objectURL = URL.createObjectURL(blob);
          setScreenshot(objectURL);
        });
      })
      .catch((error) => {
        console.log('error', error);
        if (error instanceof Error) {
          setErrors((prev) => [...prev, error.message]);
        }
      })
      .finally(() => {
        setRequested(true);
        setRequesting(false);
      });
  };
  return (
    <div className={cn(classes.App, requesting || requested ? classes.requesting : null)}>
      <h1 className={classes.h1}>Welcome to Quantum Oracle</h1>
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
