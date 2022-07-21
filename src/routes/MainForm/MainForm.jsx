import React from 'react';
import InputPart from './Input/InputPart';
import sha256 from 'crypto-js/sha256';
import encHex from 'crypto-js/enc-hex';
import CryptoJS from 'crypto-js';

const HYPERDAPP_UI =
  'https://code.hyperdapp.dev/flow/QmVs2wB5rDrqsuyXcV6Qprbm79khcf52n3WkRygipkukTj';

import styles from './MainForm.module.scss';

export const MainForm = () => {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src="../../../public/images/logo1000.png" alt="logo" />
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
          response.arrayBuffer().then((myBlob) => {
            this.setState({
              file: {
                headers: headers,
                imageHash: encHex.stringify(sha256(CryptoJS.lib.WordArray.create(myBlob))),
              },
              procedure: 2,
            });
          });
          response.blob().then((myBlob) => {
            const objectURL = URL.createObjectURL(myBlob);
            this.setState({
              file: {
                image: objectURL,
              },
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

    if (this.state.procedure) {
      _procedure.push(
        <div key="address" id="address">
          <div>Address: {address}</div>
        </div>,
      );
    }

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
            let image = '';
            if (this.state.file.image) {
              image = (
                <div key="image" className="col-sm">
                  <div key="image">
                    <img src={this.state.file.image} alt="image" style={{ width: '100%' }} />
                  </div>
                </div>
              );
            }
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

            // _procedure.push(<div key="hr"><hr/></div>)
            // _procedure.push(<div key="file-data" className="row">{image}{headers}</div>)
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

          this.iframe = <iframe key="ifr" src={HYPERDAPP_UI} />;

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

    console.log('input: ', _input);

    return (
      <div className={styles.hyperContainer}>
        {_error}
        {_input}
        {_procedure}
      </div>
    );
  }
}
