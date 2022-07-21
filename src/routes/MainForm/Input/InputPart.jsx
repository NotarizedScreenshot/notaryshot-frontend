import React from 'react';
import { Button } from '../../../components';
import styles from './Input.module.scss';

export default ({ save, onChange, onKeyDown, value }) => {
  return (
    <div className={styles.container}>
      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder="Image url..."
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button value={'Send'} onClick={save} />
      </div>
    </div>
  );
};
