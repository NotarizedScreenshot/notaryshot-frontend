import { IHomeProps } from './HomeProps';
import { Header, Hero, TryIt, HowItWorks, Benefits, Footer, Collapsable, Process } from 'components';
import styles from './Home.module.scss';

export const Home: React.FC<IHomeProps> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.gradientBlack} />
      </div>
      <div className={styles.content}>
        <Header />
        <Hero />
        <TryIt />
        <HowItWorks />
        <Collapsable title='Detailed history'>
          <Process />
        </Collapsable>
        <Benefits />
        <Footer />
      </div>
    </div>
  );
};
