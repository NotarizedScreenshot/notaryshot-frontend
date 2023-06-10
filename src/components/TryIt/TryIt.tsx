import { ITryItProps } from './TryItProps';
import styles from './TryIt.module.scss';
import { TweetIdForm, CircledNumber, ProcessIcon } from 'components';

export const TryIt: React.FC<ITryItProps> = () => {
  return (
    <div className={styles.container}>
      <TweetIdForm />

      <ol className={styles.ol}>
        <li className={styles.li}>
          <div className={styles.number}>
            <CircledNumber number={1} />
          </div>
          <p className={styles.p2}>Login with your crypto wallet</p>
        </li>
        <li className={styles.li}>
          <div className={styles.number}>
            <CircledNumber number={2} />
          </div>
          <p className={styles.p2}>Paste a tweet link or ID</p>
        </li>
        <li className={styles.li}>
          <div className={styles.number}>
            <CircledNumber number={3} />
          </div>
          <p className={styles.p2}>Capture a screenshot</p>
        </li>
        <li className={styles.li}>
          <div className={styles.number}>
            <CircledNumber number={4} />
          </div>

          <p className={styles.p2}>Notarize the screenshot for authenticity.</p>
        </li>
        <li className={styles.li}>
          <div className={styles.number}>
            <CircledNumber number={5} />
          </div>
          <p className={styles.p2}>Receive a verified NFT screenshot, its authenticity recorded on the blockchain</p>
        </li>
      </ol>
      <div className={styles.description}>
        <div className={styles.process}>
          <h2 className={styles.h2}>As web2 and web3 merge</h2>
          <p className={styles.p2}>
            QuantumOracle consolidates the content on web2 servers into a decentralized storage. This captures the
            content&apos;s exact state and retrieval history, including:
          </p>
          <div className={styles.processOrder}>
            <ProcessIcon title='Server DNS' iconURL='images/icon-dns.png' />
            <div className={styles.divider}>
              <img src='images/divider-line.png' alt='div-line'></img>
            </div>
            <ProcessIcon title='Timestamp' iconURL='images/icon-timestamp.png' />
            <div className={styles.divider}>
              <img src='images/divider-line.png' alt='div-line'></img>
            </div>
            <ProcessIcon title='Content hash' iconURL='images/icon-hash.png' />
          </div>
        </div>
        <div className={styles.web3note}>
          <div className={styles.rects}>
            <div className={styles.spy}>
              <img src='images/spy-2.png' alt='spy'></img>
            </div>
            <div className={styles.web}>
              <p>web 2.0</p>
              <p>web 3.0</p>
            </div>
          </div>
          <p className={styles.p2}>
            Combining, verifying, and delivering all of this through web3 technologies provides more robust proof than a
            simple image that can be easily manipulated in a matter of minutes.
          </p>
        </div>
      </div>
    </div>
  );
};
