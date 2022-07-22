import React from 'react';
import InputPart from './Input/InputPart';
import sha256 from 'crypto-js/sha256';
import encHex from 'crypto-js/enc-hex';
import CryptoJS from 'crypto-js';

const HYPERDAPP_UI =
  'https://quantumoracle.app/flow/QmcDWNZHWQdruYmKLjG8io5AdH4pm2gAtnBrqkVGu8wJ19';

import styles from './MainForm.module.scss';

export const MainForm = () => {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src="public/images/logo1000.png" alt="logo" />
      <div className={styles.formContainer}>
        <App />
      </div>
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

  getFile() {
    let proxy = window.location.host.match(/^localhost/)
      ? 'public/pic.jpeg'
      : '/proxy/?' + this.state.val;

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
              });
            });
          });
        }
      })
      .catch((err) => {
        this.setState({ file: { error: err } });
      });
  }

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

          _procedure.push(
            <div key="btnToIframe" id="btnToIframe">
              {btnForSend}
            </div>,
          );

          this.iframe = (
            <iframe
              key="ifr"
              src={HYPERDAPP_UI}
              name="myframe"
              // onMouseOver={() => {
              //   const myFrameEls = myframe.document.getElementsByClassName('p-inputtext');
              //   console.log('onover', myFrameEls);
              //   if (!!myFrameEls) {
              //     const arr = Array.from(myFrameEls);
              //     arr[0].value = this.state.val;
              //     arr[1].value = this.state.file.imageHash;
              //     console.log('myFrameEl mouseover', myFrameEls, arr);
              //   }
              // }}
              // onMouseOut={() => {
              //   const myFrameEls = myframe.document.getElementsByClassName('p-inputtext');
              //   console.log('onout', myFrameEls);
              //   if (!!myFrameEls) {
              //     const arr = Array.from(myFrameEls);
              //     arr[0].value = this.state.val;
              //     arr[1].value = this.state.file.imageHash;
              //     console.log('myFrameEl mouseover', myFrameEls, arr);
              //   }
              // }}
            />
          );

          _procedure.push(this.iframe);
        }
    }

    if (this.state.error) {
      _error = (
        <div key="error" className="error">
          {this.state.error}
        </div>
      );
    }

    return (
      <div
        className={styles.hyperContainer}
        onMouseMove={() => {
          const myFrameEls = myframe.document.getElementsByClassName('p-inputtext');
          console.log('onMouseMove', myFrameEls);
          try {
            if (!!myFrameEls && myFrameEls.length > 0) {
              const arr = Array.from(myFrameEls);
              arr[0].value = this.state.val;
              arr[1].value = this.state.file.imageHash;
              console.log('myFrameEl mouseover', myFrameEls, arr);
            }
          } catch (error) {
            console.warn('url/hash copy error: ', error);
          }
        }}
      >
        {_error}
        {_input}

        {!!this.state.procedure && (
          <div key="address" id="address">
            <div>Address: {address}</div>
          </div>
        )}
        {this.state.showImage && (
          <div className={styles.responseData}>
            <div key="image" className={styles.imageContainer}>
              <div key="image">
                <img src={this.state.file.image} alt="image" style={{ width: '100%' }} />
              </div>
            </div>
            <div className={styles.headersContainer}>
              Proxy headers:{' '}
              {Object.entries(this.state.file?.headers).map(([key, val]) => {
                return (
                  <div key={key}>
                    {key}: {val}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {_procedure}
      </div>
    );
  }
}
