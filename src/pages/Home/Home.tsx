import { useNavigate } from 'react-router-dom';
import { IHomeProps } from './HomeProps';
import classes from './Home.module.scss';
import { Header, TwitterIdForm } from 'components';
import { validateBigInt } from 'utils';

export const Home: React.FC<IHomeProps> = () => {
  const navigate = useNavigate();
  const submitHandler = async (data: string) => {
    console.log('handler');
    navigate(`/preview?tweetid=${data}`);
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
          <TwitterIdForm onSubmit={submitHandler} validate={validateBigInt} inline />
        </div>
        <p className={classes.p}>
          Quantum Oracle helps create verified screenshots - NFTs proving that whatever their
          minter found on the net actually existed at that moment.
        </p>
      </div>
    </div>
  );
};
