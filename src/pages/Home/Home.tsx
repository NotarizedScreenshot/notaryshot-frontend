import { IHomeProps } from './HomeProps';
import { Header, Hero, TryIt, HowItWorks, Benefits, Footer, Collapsable, Process } from 'components';
import styles from './Home.module.scss';

export const Home: React.FC<IHomeProps> = () => {
  const windowWidth = window.innerWidth;
  console.log(windowWidth);
  return (
    <div className={styles.container}>
      {windowWidth > 1200 ? (
        <>
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
        </>
      ) : (
        <div className='nomobile'>
          <h1>mobile version coming soon!</h1>
        </div>
      )}
    </div>
  );
};
