import React from 'react';
import { Link } from 'react-router-dom';
import InputPart from './Input/InputPart';
import sha256 from 'crypto-js/sha256';
import encHex from 'crypto-js/enc-hex';
import CryptoJS, { EvpKDF } from 'crypto-js';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import * as yup from 'yup';
import { Glitch } from '../../components';
import { gql } from '@apollo/client';
import { App } from './App2';

const HYPERDAPP_UI =
  'https://quantumoracle.app/flow/QmTFtdPgiJB6W4AwQgAiBUdZzXfHJEH2Smfzi6kcqVdWfL';

import styles from './MainForm.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';

export const MainForm = () => {
  return (
    <div className={styles.container}>
      <App />
    </div>
  );
};

export const UrlInputGroup = ({ onSubmit, defaultUrl }) => {
  const { t } = useTranslation();

  yup.setLocale({
    string: {
      url: t('errors.urlError'),
    },
    mixed: {
      required: t('errors.required'),
    },
  });

  const urlValidationSchema = { value: yup.string().required().url() };
  const validate = (
    value, // type value: { value: string }
  ) => yup.object().shape(urlValidationSchema).validate(value);

  const [isInvalid, setIsInvalid] = useState(false);
  const [inputValue, setInputValue] = useState(defaultUrl);
  const [errorMessage, setErrorMessage] = useState(null);
  const onChangeHandler = async (event) => {
    const { value } = event.target;

    setInputValue(value);
    validate({ value })
      .then(() => {
        setIsInvalid(false);
        setErrorMessage(null);
      })
      .catch((error) => {
        setErrorMessage(error.errors[0]);
        setIsInvalid(true);
      });
  };
  const pasteButtonHandler = async () => {
    const clipboardData = await navigator.clipboard.readText();
    setInputValue(clipboardData);
    validate({ value: clipboardData })
      .then(() => {
        setIsInvalid(false);
        setErrorMessage(null);
      })
      .catch((error) => {
        setErrorMessage(error.errors[0]);
        setIsInvalid(true);
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    validate({ value: inputValue })
      .then(() => {
        setIsInvalid(false);
        setErrorMessage(null);
        onSubmit(inputValue);
      })
      .catch((error) => {
        setErrorMessage(error.errors[0]);
        setIsInvalid(true);
      });
  };

  return (
    <div className={styles.uploadformGroup}>
      <form onSubmit={submitHandler}>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            placeholder={t('uploadForm.urlInputPlaceHolder')}
            onChange={onChangeHandler}
            value={inputValue}
          ></input>
          <button type="button" className={styles.pasteButton} onClick={pasteButtonHandler}>
            {t('uploadForm.pasteButton')}
          </button>
        </div>
        <button disabled={isInvalid} className={styles.submitButton}>
          {t('uploadForm.submitButton')}
        </button>
        {isInvalid && <div className={styles.errorTip}>{errorMessage}</div>}
      </form>
    </div>
  );
};

export const SuccessUploadedForm = ({ imageSrc, onBack, hash, url, setPrevData }) => {
  const hex1 = '0xe4066d1db579fd52d55933d37b70eb039519c';
  // console.log(BigInt('0xe4066d1db579fd52d55933d37b70eb039519c').toString(10));
  const { t } = useTranslation();
  const query = gql`
    {
      notarizedScreenshots {
        id
        owner
        metadataCID
        uri
      }
    }
  `;
  const { data } = useQuery(query);

  console.log('data  start', data);

  const copyToClipboardHandler = (value) => () => {
    navigator.clipboard.writeText(value);
  };

  useEffect(() => {
    if (data) {
      console.log('got data');
      console.log(setPrevData(data));
    }
  }, [data]);

  return (
    <div className={styles.successformGroup}>
      <div className={styles.backButton}>
        <button onClick={onBack}>Back</button>
      </div>
      <div className={styles.title}>
        {t('successForm.title.l1')}
        <br />
        {t('successForm.title.l2')}
      </div>
      <div className={styles.central}>
        <div className={styles.picture}>
          <div className={styles.imageContainer}>
            <img src={imageSrc} alt="image" />
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.urlTitle}>
            {t('successForm.imageUrlTitle')}{' '}
            <button onClick={copyToClipboardHandler(url)}>{t('copyButtons.copyURL')}</button>
          </div>
          <div className={styles.url}>{url}</div>
          <div className={styles.hashTitle}>
            {t('successForm.hashTitle')}{' '}
            <button onClick={copyToClipboardHandler(hash)}>{t('copyButtons.copyHash')}</button>
          </div>
          <div className={styles.hash}>{hash}</div>
        </div>
      </div>
      <div className={styles.bottom}>
        <iframe key="ifr" src={HYPERDAPP_UI} name="myframe" />
      </div>
    </div>
  );
};

export const SuccessMintedForm = ({
  onBack,
  hash,
  url,
  // openSeaUrl,
  imageSrc,
  prevData,
}) => {
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const [stampWidth, setStampWidth] = useState(0);
  const [stampHeight, setStampHeight] = useState(0);
  const [stampHorOffset, setStampHorOffset] = useState(0);
  const [stampVertOffset, setStampVertOffset] = useState(0);
  const [openSeaUrl, setOpenSeaUrl] = useState('Fetching OpenseaUrl...');
  const [renders, setRenders] = useState(0);

  console.log('prevData', prevData);

  const query = gql`
    {
      notarizedScreenshots {
        id
        owner
        metadataCID
        uri
      }
    }
  `;
  const { data } = useQuery(query);

  console.log('data', data);

  const { t } = useTranslation();
  const [isMiniting, setIsMinting] = useState(false);
  console.log('openSeaUrl.match(/Fetch/)', !!openSeaUrl.match(/Fetch/));

  useEffect(() => {
    const timeouts = [];
    if (data) {
      const filtered = data.notarizedScreenshots.filter((el) => {
        console.log(el.id);
        return el.id === hash;
        // return true;
      });
      // const filtered = [];

      // filtered.push({
      //   id: '0xc1ae9d3991e66ddab7e833018e47acc47ddbaf1347834999207b8094acc80d9d',
      // });
      // const t2 = setTimeout(
      //   () =>
      //     filtered.push({
      //       id: '0xc1ae9d3991e66ddab7e833018e47acc47ddbaf1347834999207b8094acc80d9d',
      //     }),
      //   500,
      // );

      // timeouts.push(t2);

      if (filtered.length > 0) {
        console.log('flirered has');
        const decimal = BigInt(filtered[0].id).toString(10);
        setOpenSeaUrl(
          `https://opensea.io/assets/matic/0xa567349bdd3d4f2c3e25f65745a020162c202ef2/${decimal}`,
        );
        return;
      }

      const check = () => {
        console.log('check');
        if (filtered.length > 0) {
          console.log('check > 0, reutrn ');
          const decimal = BigInt(filtered[0].id).toString(10);
          setOpenSeaUrl(
            `https://opensea.io/assets/matic/0xa567349bdd3d4f2c3e25f65745a020162c202ef2/${decimal}`,
          );
          return;
        }
        console.log('check settimeout');
        const t1 = setTimeout(() => {
          setRenders(renders + 1);
          check();
        }, 1000);
        timeouts.push(t1);
      };
      check();
    }
    return () => {
      console.log('timeouts', timeouts);
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [data, renders]);

  useEffect(() => {
    const stampRatio = 0.8177;
    const picWidthLimit = 500;
    const picWidthMin = 465;
    const pictHeightLimit = 710;
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      if (img.height > 0 && img.width > 0) {
        const isHorisontal = img.width > img.height;
        if (isHorisontal) {
          if (img.width > picWidthLimit) {
            setImgWidth(picWidthLimit);
            const ratio = img.width / img.height;
            const height = picWidthLimit / ratio;
            setImgHeight(height);
            setStampHeight(height);
            setStampWidth(stampRatio * height);
            setStampHorOffset((picWidthLimit - stampRatio * height) / 2);
            return;
          }
          if (img.width < picWidthMin) {
            setImgWidth(picWidthMin);
            const ratio = img.width / img.height;
            const height = picWidthMin / ratio;
            setImgHeight(height);
            setStampHeight(height);
            setStampWidth(stampRatio * height);
            setStampHorOffset((picWidthMin - stampRatio * height) / 2);
            return;
          }
          setImgWidth(img.width);
          setImgHeight(img.height);
          setStampHeight(img.height);
          setStampWidth(stampRatio * img.height);
          setStampHorOffset((img.width - stampRatio * img.height) / 2);
          return;
        }
        setImgHeight(pictHeightLimit);
        const ratio = img.height / img.width;

        const width = pictHeightLimit / ratio;
        setImgWidth(width);

        if (1 / ratio > stampRatio) {
          setStampHeight(pictHeightLimit);
          setStampWidth(pictHeightLimit * stampRatio);
          setStampHorOffset((width - pictHeightLimit * stampRatio) / 2);

          return;
        }
        setStampWidth(width);
        setStampHeight(width / stampRatio);
        setStampVertOffset((pictHeightLimit - width / stampRatio) / 2);

        return;
      }
    };
  }, []);

  return (
    <div className={styles.successMintFormGroup}>
      <div className={styles.backButton}>
        <button onClick={onBack}>Back</button>
      </div>
      <div className={styles.title}>
        {t('successMintForm.title.l1')}
        <br />
        {t('successMintForm.title.l2')}
      </div>
      <div className={styles.central}>
        <div className={styles.picture}>
          <div className={styles.imageContainer}>
            <img
              src={imageSrc}
              alt="image"
              width={`${imgWidth}px`}
              height={`${imgHeight}px`}
            />
            <img
              className={styles.stamp}
              src="public/images/stamp.png"
              height={`${stampHeight}px`}
              width={`${stampWidth}px`}
              style={{ right: `${stampHorOffset}px`, top: `${stampVertOffset}px` }}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.hashTitle}>{t('successMintForm.hashTitle')}</div>
          <div className={styles.hash}>{hash}</div>
          <div className={styles.urlTitle}>{t('successMintForm.imageUrlTitle')}</div>
          <div className={styles.url}>{url}</div>
          <div className={styles.urlTitle}>{t('successMintForm.openSeaUrlTitle')}</div>
          <div className={styles.openSeaUrl}>
            {!!openSeaUrl.match(/Fetch/) ? (
              openSeaUrl
            ) : (
              <a href={openSeaUrl} target="_blank">
                {openSeaUrl}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
