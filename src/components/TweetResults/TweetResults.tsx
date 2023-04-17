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
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ScreenshotPreview />
        <div className={styles.heading}>
          <TweetAuthor />
          <TweetTime />
          <TweetDate />
        </div>
        <div className={styles.text}>
          Today, I attended an important conference at @TEDTalks where legends like @BillGates and @elonmusk spoke. They
          discussed the future of technology and progress, and I couldn't help but share my thoughts. Additionally, I
          bought a new book by @StephenKing that I can't wait to start reading. Finally, I attended a yoga class at
          @yogaworks studio. This day was full of new experiences and motivation!
        </div>
        <TweetAttributes />
        <TweetStats />
        <TweetMedia />
      </div>
      <NotarizeButton />
    </div>
  );
};
