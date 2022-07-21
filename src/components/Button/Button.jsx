import React from 'react';
import styles from './Button.module.scss';

export const Button = ({ onClick, value, height, width, style }) => {
  return (
    <button
      className={styles.button}
      type="submit"
      onClick={onClick}
      height={height}
      width={width}
      style={style}
    >
      {value}
    </button>
  );
};
