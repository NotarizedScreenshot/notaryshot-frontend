import React from 'react';
import styles from './Button.module.scss';

export const Button = ({ onClick, value }) => {
  return (
    <button className={styles.button} type="submit" onClick={onClick}>
      {value}
    </button>
  );
};
