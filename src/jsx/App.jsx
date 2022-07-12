import React from "react";
import InputPart from "./InputPart";
import "../sass/main.scss";
import {StorageSender} from "./StorageSender";

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            val: 'https://pedlib.ru/download/Ej/Ej1.jpg',//https://totum.ewr1.vultrobjects.com/365_262_file.png
            error: null,
            procedure: 0
        };

        this.setVal = this.setVal.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
        this.save = this.save.bind(this)
    }

    setVal(event) {
        let val = event.target.value;
        let state = {
            val: val,
            error: null
        };
        this.setState(state)
    }

    onKeyDown(event) {
        switch (event.key) {
            case 'Enter':
                this.save()
                return false;
        }
    }

    save(isEnter) {
        if (!this.state.val.match(/^https:\/\//)) {
            this.setState({error: "Адрес должен начинаться с https://"})
        } else {
            this.setState({procedure: 1})
            setTimeout(() => {
                this.getFile()
            }, 2000);

        }
    }

    getFile() {

        fetch("static/pic.jpeg?path=" + encodeURIComponent(this.state.val))
            .then((response) => {
                if (!response.ok) {
                    throw `HTTP error! Status: ${response.status}`;
                } else {
                    let headers = {};

                    response.headers.forEach(function (val, key) {
                        headers[key] = val;
                    })
                    response.blob().then((myBlob) => {
                        const objectURL = URL.createObjectURL(myBlob);
                        this.setState({
                            file: {
                                headers: headers,
                                image: objectURL,
                            },
                            procedure: 2,
                        })
                    })
                }
            }).catch((err) => {
            this.setState({file: {error: err}});
        });
    }

    render() {
        let params = {};
        params.onKeyDown = this.onKeyDown;
        params.onChange = this.setVal;

        let address = this.state.val === "" ? "https://" : this.state.val;

        let _input = '', _error = '', _procedure = [];

        switch (this.state.procedure) {
            case 0:
                _input =
                    <InputPart onChange={this.setVal} save={this.save} onKeyDown={this.onKeyDown}
                               value={this.state.val}/>
                break;
            case 1:
                _procedure.push(<div key="fileLoading">
                    <div key="p1" className="h4">Получение файла</div>
                    <div key="p2">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>)
                break;
            case 2:
                if (this.state.file) {
                    if (this.state.file.error) {
                        _procedure.push(<div key="p1_e" className="error">{this.state.file.error}</div>)
                    } else {
                        if (this.state.file.image) {
                            _procedure.push(<div key="image">
                                <div key="p1_i" className="h4">Картинка:</div>
                                <div key="image"><img src={this.state.file.image} alt="image"/></div>
                            </div>)
                        }
                        if (this.state.file.headers) {
                            let headers = [];
                            Object.keys(this.state.file.headers).forEach((key, index) => {
                                headers.push(<div key={"h" + index}>{key} -- {this.state.file.headers[key]}</div>)
                            })
                            _procedure.push(<div key="headers">Заголовки: {headers}</div>)
                        }
                    }
                    _procedure.push(<StorageSender key="sender" file={this.state.file.image}/>)
                }


        }


        if (this.state.error) {
            _error = <div key="error" className="error">{this.state.error}</div>
        }

        return <div>
            {_error}
            {_input}

            <div className="h4" key="header">Адрес для проверки</div>
            <div className="h4" key="address">{address}</div>
            {_procedure}
        </div>;
    }
}
