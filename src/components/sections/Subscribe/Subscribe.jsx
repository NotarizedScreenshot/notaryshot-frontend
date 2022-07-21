import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '../../../components';
import api from '../../../api';
import styles from './Subscribe.module.scss';

export const Subscribe = () => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const submitHandler = (event) => {
    event.preventDefault();
    api.submitSubscriptionForm({ subscriptionValue: inputValue });
    setInputValue('');
  };
  return (
    <div className={styles.container}>
      <img src="../../../../static/images/img-subscribe.png" alt="subscribe" />
      <h4>
        {t('subscribe.title.l1')}
        <br />
        {t('subscribe.title.l2')}
      </h4>
      <form onSubmit={submitHandler}>
        <Input
          type="email"
          value={inputValue}
          onChange={setInputValue}
          placeholder={t('subscribe.placeholder')}
        />

        <Button value={t('subscribe.subscribeButton')} />
      </form>
    </div>
  );
};
