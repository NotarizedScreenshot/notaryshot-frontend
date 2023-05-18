import { useNavigate } from 'react-router-dom';
import { IHomeProps } from './HomeProps';
import { Header, TweetIdForm } from 'components';
import { validateBigInt } from 'utils';
import classes from './Home.module.scss';

export const Home: React.FC<IHomeProps> = () => {
  const navigate = useNavigate();
  const submitHandler = async () => {
    navigate(`/preview`);
    return true;
  };
  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.background}></div>
      <div className={classes.content}>
        <h2 className={classes.h2}>Everything is verifiable.</h2>
        <h1 className={classes.h1}>Welcome to Quantum Oracle</h1>
        <div className={classes.formContainer}>
          <TweetIdForm onSubmitCallback={submitHandler} validate={validateBigInt} />
        </div>
        <p className={classes.p}>
          Quantum Oracle helps create verified screenshots - NFTs proving that whatever their minter found on the net
          actually existed at that moment.
        </p>
      </div>
    </div>
  );
};
