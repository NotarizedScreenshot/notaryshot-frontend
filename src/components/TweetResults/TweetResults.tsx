import { ITweetResultsProps } from './TweetResultsProps';
import styles from './TweetResults.module.scss';
import {
  NotarizeButton,
  ScreenshotPreview,
  TweetAttributes,
  TweetAuthor,
  TweetDate,
  TweetMedia,
  TweetStats,
  TweetTime,
} from './components';
export const TweetResults: React.FC<ITweetResultsProps> = () => {
  const date = new Date(Date.now());

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ScreenshotPreview />
        <div className={styles.heading}>
          <TweetAuthor />
          <TweetTime date={date} />
          <TweetDate date={date} />
        </div>
        <div className={styles.text}>
          Today, I attended an important conference at @TEDTalks where legends like @BillGates and @elonmusk spoke. They
          discussed the future of technology and progress, and I couldn't help but share my thoughts. Additionally, I
          bought a new book by @StephenKing that I can't wait to start reading. Finally, I attended a yoga class at
          @yogaworks studio. This day was full of new experiences and motivation!
        </div>
        <div className={styles.glow}>
          <img src='/images/glow-1.png' alt='glow' />
        </div>
        <TweetAttributes />
        <TweetStats />
        <TweetMedia />
      </div>
      <NotarizeButton />
    </div>
  );
};
