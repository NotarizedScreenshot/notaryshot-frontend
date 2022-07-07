import React from "react";
import InputPart from "./InputPart";

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            val: '',
            error: null
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
            this.setState({validAddress: true})
        }
    }

    render() {
        let params = {};
        params.onKeyDown = this.onKeyDown;
        params.onChange = this.setVal;

        let address = this.state.val === "" ? "https://" : this.state.val;

        let _input = '', _error = '', _procedure = '';

        if (!this.state.validAddress) {
            _input =
                <InputPart onChange={this.setVal} save={this.save} onKeyDown={this.onKeyDown} value={this.state.val}/>
        }else{
            _procedure = "Начинаем что-то делать с этим адресом";
        }

        if (this.state.error) {
            _error = <div className="error">{this.state.error}</div>
        }

        return <div>
            {_error}
            {_input}

            <div>Адрес для проверки</div>
            <div>{address}</div>
            <div>{_procedure}</div>
        </div>;
    }
}
