import { IHowItWorksProps } from './HowItWorksProps';
import styles from './HowItWorks.module.scss';
import { HowItWorksCard } from 'components/HowItWorksCard';
export const HowItWorks: React.FC<IHowItWorksProps> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bg}>
        <img className={styles.byImage} src='images/background-vector.png' alt='bg' />
      </div>
      <h2>How it works</h2>
      <div className={styles.cards}>
        <HowItWorksCard
          number={1}
          message='OMG! We found a flying saucer in the desert! I have to post this!'
          personImageUrl='images/card1-person-1.png'
          tweetImageUrl='images/card1-tweet-1.png'
        />
        <HowItWorksCard
          number={2}
          message={['I must save the evidence', 'immediately before they hide it', 'again. I use QuantumOracle!']}
          personImageUrl='images/card2-person-2.png'
          tweetImageUrl='images/card2-tweet-2.png'
        />
        <HowItWorksCard
          number={3}
          message={'I have to delete this tweet immediately and keep the secret!'}
          personImageUrl='images/card3-person-3.png'
          tweetImageUrl='images/card3-tweet-3.png'
        />
        <HowItWorksCard
          number={4}
          message={`I stored the evidence in a decentralized storage and blockchain. Shh... don't tell the CIA where I live.`}
          personImageUrl='images/card4-person-4.png'
          tweetImageUrl='images/card4-tweet-4.png'
        />
      </div>
    </div>
  );
};
