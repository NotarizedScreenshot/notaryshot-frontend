import { IScreenshotPreviewProps } from './ScreenshotPreviewProps';
import classes from './ScreenshotPreview.module.scss';
export const ScreenshotPreview: React.FC<IScreenshotPreviewProps> = ({
  screenshotUrl,
  errors,
}) => {
  return (
    <div className={classes.container}>
      {screenshotUrl ? (
        <img src={screenshotUrl} alt='screenshot'></img>
      ) : (
        <div className={classes.failure}>
          {!!errors && errors.length > 0
            ? 'list of errors'
            : "Something goes wrong. Can't get screenshot."}
        </div>
      )}
    </div>
  );
};
