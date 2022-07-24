import React from 'react';
import InputPart from './Input/InputPart';
import styles from './MainForm.module.scss';
import { Link } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import encHex from 'crypto-js/enc-hex';
import CryptoJS, { EvpKDF } from 'crypto-js';
import { Glitch } from '../../components';
// import { withApollo } from 'react-apollo';

import { UrlInputGroup, SuccessMintedForm, SuccessUploadedForm } from './MainForm';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
      error: null,
      procedure: 0,
      showImage: false,
      isIFrameLoaded: false,
      isShowInput: true,
      isShowSuccessForm: false,
      isShowMintSuccessForm: false,
      isShowGlitch: false,
      prevData: null,
      isMinted: false,
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
    console.log('set val');
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
    console.log('getFile', value);
    let proxy = window.location.host.match(/^localhost/)
      ? 'public/1.webp'
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
                val: value,
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
    this.setState({ isShowInput: true, val: '' });
  };

  setPrevData = (data) => {
    this.setState({ prevData: data });
  };

  showMintSuccessForm = () => {
    // this.props.openGlitch(true);
    this.setState({
      isShowMintSuccessForm: true,
      isShowSuccessForm: false,
      isShowGlitch: true,
    });

    setTimeout(() => {
      this.setState({
        isShowMintSuccessForm: true,
        isShowSuccessForm: false,
        isShowGlitch: false,
      });

      // test();
    }, 10000);
  };

  resetAll = () => {
    this.setState({
      isShowInput: true,
      isShowMintSuccessForm: false,
      isShowSuccessForm: false,
      val: '',
    });
  };

  setMintComplete = () => {
    this.setState({ isMinted: true });
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
        }
    }

    const {
      isShowInput,
      isShowMintSuccessForm,
      isShowSuccessForm,
      file,
      val,
      isShowGlitch,
      prevData,
    } = this.state;
    const { openGlitch } = this.props;

    return (
      <div className={styles.hyperContainer}>
        {isShowGlitch ? (
          <Glitch />
        ) : (
          <>
            <Link to="/">
              <img className={styles.logo} src="public/images/spot_logo.png" alt="logo" />
            </Link>
            {_error}
            {isShowInput && <UrlInputGroup onSubmit={this.getFile} defaultUrl={val} />}

            {isShowSuccessForm && (
              <SuccessUploadedForm
                imageSrc={file.image}
                // onBack={this.showInput}
                onBack={this.resetAll}
                hash={file.imageHash}
                url={val}
                setPrevData={this.setPrevData}
              />
            )}
            {isShowMintSuccessForm && (
              <SuccessMintedForm
                onBack={this.resetAll}
                imageSrc={file.image}
                hash={file.imageHash}
                // hash={'0xb06c058ebbb7ef02896c517073200b43588617f441c1374d739765f826363cfe'}
                url={val}
                // openSeaUrl={'url://opensea.com/sfasd'}
                prevData={prevData}
                setMintComplete={this.setMintComplete}
              />
            )}
            {isShowSuccessForm && (
              <button className={styles.testButton} onClick={this.showMintSuccessForm}>
                PRESS BUTTON TO SHOW MINTED RESULTS
              </button>
            )}
            {isShowMintSuccessForm && (
              <div className={styles.successControl}>
                <button>Save</button>
                <button>Share</button>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}
