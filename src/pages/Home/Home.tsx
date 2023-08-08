import { IHomeProps } from './HomeProps';
import { Header, Hero, TryIt, HowItWorks, Benefits, Footer, Collapsable, Process } from 'components';
import styles from './Home.module.scss';
import { useModalContext } from 'contexts';
import cn from 'classnames';

export const Home: React.FC<IHomeProps> = () => {
  const { isShowModal } = useModalContext();
  return (
    <div className={cn(styles.container, isShowModal ? styles.noscroll : null)}>
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
