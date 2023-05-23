import { IProcessSubjectProps } from './ProcessSubjectProps';
import styles from './ProcessSubject.module.scss';
export const ProcessSubject: React.FC<IProcessSubjectProps> = ({ iconImageUrl, title }) => {
  return (
    <div className={styles.container}>
      {iconImageUrl && (
        <div className={styles.userpic}>
          <img className={styles.image} alt='userpic' src={iconImageUrl} />
        </div>
      )}
      <p className={styles.p2}>
        {Array.isArray(title)
          ? title.map((str, index) => (
              <span key={str + index} className={styles.p2}>
                {str}
                <br />
              </span>
            ))
          : title}
      </p>
    </div>
  );
};
