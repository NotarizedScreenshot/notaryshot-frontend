import React from 'react';
import styles from './Input.module.scss';
export const Input = ({ value, onChange, placeholder, type }) => {
  return (
    <input
      type={type || 'text'}
      className={styles.input}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
    ></input>
  );
};
