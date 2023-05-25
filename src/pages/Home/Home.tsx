import { IHomeProps } from './HomeProps';
import { Header, Hero, TryIt, HowItWorks, Benefits, Footer } from 'components';
import styles from './Home.module.scss';

export const Home: React.FC<IHomeProps> = () => {
  const navigate = useNavigate();
  const submitHandler = async () => {
    navigate(`/preview`);
    return true;
  };
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
        <Benefits />
        <Footer />
      </div>
    </div>
  );
};
