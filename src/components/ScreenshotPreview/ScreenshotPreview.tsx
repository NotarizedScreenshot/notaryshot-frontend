import { IScreenshotPreviewProps } from './ScreenshotPreviewProps';
import classes from './ScreenshotPreview.module.scss';
export const ScreenshotPreview: React.FC<IScreenshotPreviewProps> = ({
  screenshot,
  errors,
}) => {
  return (
    <div className={classes.container}>
      {screenshot ? (
        <img src={screenshot} alt='screenshot'></img>
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
