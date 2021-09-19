import React from "react";
import {Alert, Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select} from "@mui/material";
import axios from "axios";

class Form extends React.Component {

    state = {
        currency: 'eur',
        errorText: ''
    }

    constructor(props) {
        super(props);

        this.amountRef = React.createRef();
        this.cryptoRef = React.createRef();
    }

    submitForm(e) {
        e.preventDefault();

        if (this.amountRef.current.value.length === 0) {
            this.setState({errorText: 'Amount field is empty'})
            return;
        }

        if (this.cryptoRef.current.value.length === 0) {
            this.setState({errorText: 'Crypto field is empty'})
            return;
        }

        this.setState({errorText: ''})

        axios.post('/api/convert', {
            amount: this.amountRef.current.value,
            currency: this.state.currency,
            crypto: this.cryptoRef.current.value
        }).then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error);
        })
    }

    currencyChangeHandler(e) {
        this.setState({
            currency: e.target.value
        });
    }

    render() {
        return (
            <React.Fragment>
                {this.state.errorText.length > 0 ?
                    <Alert severity="error">{this.state.errorText}</Alert>
                    :
                    ''
                }
                <form method="post" onSubmit={(event) => this.submitForm(event)}>
                    <FormControl>
                        <InputLabel>Amount</InputLabel>
                        <Input type="number" inputRef={this.amountRef} />
                    </FormControl>
                    <FormControl>
                        <InputLabel>Currency</InputLabel>
                        <Select onChange={(event) => this.currencyChangeHandler(event)} labelId="currency-label" id="currency" value={this.state.currency}>
                            <MenuItem value="eur">EUR</MenuItem>
                            <MenuItem value="usd">USD</MenuItem>
                            <MenuItem value="pln">PLN</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Crypto</InputLabel>
                        <Input inputRef={this.cryptoRef} />
                        <FormHelperText>Such as BTC, CLP, COP or etc.</FormHelperText>
                    </FormControl>
                    <Button onClick={(event) => this.submitForm(event)}>Calculate</Button>
                </form>
            </React.Fragment>
        );
    }
}

export default Form;
