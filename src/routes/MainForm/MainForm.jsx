import React from 'react';
import InputPart from './Input/InputPart';
import sha256 from 'crypto-js/sha256';
import encHex from 'crypto-js/enc-hex';
import CryptoJS from 'crypto-js';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

const HYPERDAPP_UI =
  'https://quantumoracle.app/flow/QmcDWNZHWQdruYmKLjG8io5AdH4pm2gAtnBrqkVGu8wJ19';

import styles from './MainForm.module.scss';
import { useState } from 'react';

export const MainForm = () => {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src="public/images/spot_logo.png" alt="logo" />
      {/* <div className={styles.formContainer}> */}
      <App />
      {/* </div> */}
    </div>
  );
};

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 'https://pedlib.ru/download/Ej/Ej1.jpg', //https://totum.ewr1.vultrobjects.com/365_262_file.png
      error: null,
      procedure: 0,
      showImage: false,
      isIFrameLoaded: false,
      isShowInput: true,
      isShowSuccessForm: false,
      isShowMintSuccessForm: false,
    };

    this.setVal = this.setVal.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.save = this.save.bind(this);
    this.copy = this.copy.bind(this);
  }

  copy(str) {
    let tmp = document.createElement('textarea');
    tmp.value = str;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
  }

  setVal(event) {
    let val = event.target.value;
    let state = {
      val: val,
      error: null,
    };
    this.setState(state);
  }

  onKeyDown(event) {
    switch (event.key) {
      case 'Enter':
        this.save();
        return false;
    }
  }

  save(isEnter) {
    if (!this.state.val.match(/^https:\/\//)) {
      this.setState({ error: 'Адрес должен начинаться с https://' });
    } else {
      this.setState({ procedure: 1 });
      setTimeout(() => {
        this.getFile();
      }, 500);
    }
  }

  getFile = (value) => {
    let proxy = window.location.host.match(/^localhost/)
      ? 'public/pic.jpeg'
      : '/proxy/?' + value;

    fetch(proxy)
      .then((response) => {
        if (!response.ok) {
          throw `HTTP error! Status: ${response.status}`;
        } else {
          let headers = {};

          response.headers.forEach(function (val, key) {
            headers[key] = val;
          });

          response.blob().then((myBlob) => {
            const objectURL = URL.createObjectURL(myBlob);
            myBlob.arrayBuffer().then((myBuffer) => {
              this.setState({
                file: {
                  ...this.state.file,
                  headers: headers,
                  imageHash:
                    '0x' + encHex.stringify(sha256(CryptoJS.lib.WordArray.create(myBuffer))),
                  image: objectURL,
                },
                procedure: 2,
                showImage: true,
                isShowSuccessForm: true,
                isShowInput: false,
              });
            });
          });
        }
      })
      .catch((err) => {
        this.setState({ file: { error: err } });
      });
  };

  showInput = () => {
    this.setState({ isShowInput: true });
  };

  showMintSuccessForm = () => {
    this.setState({ isShowMintSuccessForm: true, isShowSuccessForm: false });
  };

  resetAll = () => {
    this.setState({
      isShowInput: true,
      isShowMintSuccessForm: false,
      isShowSuccessForm: false,
    });
  };

  render() {
    let params = {};
    params.onKeyDown = this.onKeyDown;
    params.onChange = this.setVal;

    let address = this.state.val === '' ? 'https://' : this.state.val;

    let _input = '',
      _error = '',
      _procedure = [];

    switch (this.state.procedure) {
      case 0:
        _input = (
          <InputPart
            onChange={this.setVal}
            save={this.save}
            onKeyDown={this.onKeyDown}
            value={this.state.val}
          />
        );
        break;
      case 1:
        _procedure.push(
          <div key="fileLoading" id="fileLoading">
            <div key="p1">
              File getting{' '}
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>,
        );
        break;
      case 2:
        if (this.state.file) {
          if (this.state.file.error) {
            _procedure.push(
              <div key="p1_e" className="error">
                {this.state.file.error}
              </div>,
            );
          } else {
            let headers = [];
            if (this.state.file.headers) {
              Object.keys(this.state.file.headers).forEach((key, index) => {
                headers.push(
                  <div key={'h' + index}>
                    {key} -- {this.state.file.headers[key]}
                  </div>,
                );
              });
              headers = (
                <div key="headers" className="col-sm">
                  Proxy headers: {headers}
                </div>
              );
            }
          }

          let btnForSend;
          let value = this.state.val;
          let imageHash = this.state.file.imageHash;
          btnForSend = (
            <div id="data-for-form">
              <hr />
              Copy and past to contract form:
              <div>
                url:{' '}
                <button className="btn btn-primary btn-sm" onClick={() => this.copy(value)}>
                  copy
                </button>{' '}
                <span className="panel-body" id="copyUrl">
                  {this.state.val}
                </span>
              </div>
              <div>
                hash:{' '}
                <button
                  className="btn btn-primary  btn-sm"
                  onClick={() => this.copy(imageHash)}
                >
                  copy
                </button>
                <span className="panel-body" id="copyHash">
                  {this.state.file.imageHash}
                </span>
              </div>
            </div>
          );

          // _procedure.push(
          //   <div key="btnToIframe" id="btnToIframe">
          //     {btnForSend}
          //   </div>,
          // );

          // this.iframe = <iframe key="ifr" src={HYPERDAPP_UI} name="myframe" />;

          // _procedure.push(this.iframe);
        }
    }

    // if (this.state.error) {
    //   _error = (
    //     <div key="error" className="error">
    //       {this.state.error}
    //     </div>
    //   );
    // }

    const { isShowInput, isShowMintSuccessForm, isShowSuccessForm, file, val } = this.state;

    return (
      <div className={styles.hyperContainer}>
        {isShowSuccessForm && (
          <button className={styles.testButton} onClick={this.showMintSuccessForm}>
            TEST BUTTON TO SHOW ON_MINT_SUCCESS
          </button>
        )}
        {_error}
        {isShowInput && <UrlInputGroup onSubmit={this.getFile} />}
        {isShowSuccessForm && (
          <SuccessUploadedForm
            imageSrc={file.image}
            onBack={this.showInput}
            hash={file.imageHash}
            url={val}
          />
        )}
        {isShowMintSuccessForm && (
          <SuccessMintedForm
            onBack={this.resetAll}
            imageSrc={file.image}
            hash={file.imageHash}
            url={val}
            openSeaUrl={'url://opensea.com/sfasd'}
          />
        )}
        {isShowMintSuccessForm && (
          <div className={styles.successControl}>
            <button>Save</button>
            <button>Share</button>
          </div>
        )}
      </div>
    );
  }
}

const UrlInputGroup = ({ onSubmit }) => {
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
  const [inputValue, setInputValue] = useState('https://pedlib.ru/download/Ej/Ej1.jpg'); // TODO: clean on prod
  const [errorMessage, setErrorMessage] = useState(null);
  const onChangeHandler = async (event) => {
    const { value } = event.target;

    setInputValue(value);
    validate({ value })
      .then((data) => {
        console.log('valid', data);
        setIsInvalid(false);
        setErrorMessage(null);
      })
      .catch((error) => {
        console.log(error.errors[0]);
        setErrorMessage(error.errors[0]);
        setIsInvalid(true);
      });
  };
  const pasteButtonHandler = async () => {
    const clipboardData = await navigator.clipboard.readText();
    setInputValue(clipboardData);
    validate({ value: clipboardData })
      .then((data) => {
        console.log('valid', data);
        setIsInvalid(false);
        setErrorMessage(null);
      })
      .catch((error) => {
        console.log(error.errors[0]);
        setErrorMessage(error.errors[0]);
        setIsInvalid(true);
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log('submit');
    onSubmit(inputValue);
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

const SuccessUploadedForm = ({ imageSrc, onBack, hash, url }) => {
  const { t } = useTranslation();

  const copyToClipboardHandler = (value) => () => {
    navigator.clipboard.writeText(value);
  };

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
          <div className={styles.hashTitle}>
            {t('successForm.hashTitle')}{' '}
            <button onClick={copyToClipboardHandler(hash)}>{t('copyButtons.copyHash')}</button>
          </div>
          <div className={styles.hash}>{hash}</div>
          <div className={styles.urlTitle}>
            {t('successForm.imageUrlTitle')}{' '}
            <button onClick={copyToClipboardHandler(url)}>{t('copyButtons.copyURL')}</button>
          </div>
          <div className={styles.url}>{url}</div>
        </div>
      </div>
      <div className={styles.bottom}>
        <iframe key="ifr" src={HYPERDAPP_UI} name="myframe" />
      </div>
    </div>
  );
};

const SuccessMintedForm = ({ onBack, hash, url, openSeaUrl, imageSrc }) => {
  const { t } = useTranslation();

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
            {/* <img src="https://africageographic.com/wp-content/uploads/2014/09/Fascinating-Pangolin-Facts-gallery-1.jpg" /> */}
            <img src={imageSrc} alt="image" />
            <img className={styles.stamp} src="public/images/stamp.png" />
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.hashTitle}>
            {t('successMintForm.hashTitle')}
            {/* <button>{t('copyButtons.copyHash')}</button> */}
          </div>
          <div className={styles.hash}>{hash}</div>
          <div className={styles.urlTitle}>
            {t('successMintForm.imageUrlTitle')}{' '}
            {/* <button>{t('copyButtons.copySourceUrl')}</button> */}
          </div>
          <div className={styles.url}>{url}</div>
          <div className={styles.urlTitle}>
            {t('successMintForm.imageUrlTitle')}{' '}
            {/* <button>{t('copyButtons.copyOpenSeaUrl')}</button> */}
          </div>
          <div className={styles.url}>{openSeaUrl}</div>
        </div>
      </div>
    </div>
  );
};
