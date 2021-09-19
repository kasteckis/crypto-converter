import React from "react";
import {Alert, Button, FormControl, FormHelperText, Grid, Input, InputLabel, MenuItem, Select} from "@mui/material";
import axios from "axios";
import AvailableCryptoDialog from "./AvailableCryptoDialog/AvailableCryptoDialog";

class Form extends React.Component {

    state = {
        currency: 'eur',
        errorText: '',
        resultText: '',
        showAvailableCryptosText: false,
        calculateBtnDisable: false
    }

    constructor(props) {
        super(props);

        this.amountRef = React.createRef();
        this.cryptoRef = React.createRef();
    }

    submitForm(e) {
        e.preventDefault();

        this.setState({errorText: '', resultText: '', showAvailableCryptosText: false, calculateBtnDisable: true});

        if (this.amountRef.current.value.length === 0) {
            this.setState({errorText: 'Amount field is empty', calculateBtnDisable: false});
            return;
        }

        if (this.cryptoRef.current.value.length === 0) {
            this.setState({errorText: 'Crypto field is empty', calculateBtnDisable: false});
            return;
        }

        axios.post('/api/convert', {
            amount: this.amountRef.current.value,
            currency: this.state.currency,
            crypto: this.cryptoRef.current.value
        }).then(response => {
            if (response.data.success) {
                this.setState({resultText: response.data.converted, calculateBtnDisable: false});
            } else {
                if (response.data.showAvailableCryptosText) {
                    this.setState({errorText: response.data.text, showAvailableCryptosText: true, calculateBtnDisable: false});
                } else {
                    this.setState({errorText: response.data.text, calculateBtnDisable: false});
                }
            }
        }).catch(error => {
            console.log(error);
        })
    }

    currencyChangeHandler(e) {
        this.setState({
            currency: e.target.value
        });
    }

    showAvailableCryptosHandler(e) {
        e.preventDefault();
        console.log('show dialog');
    }

    render() {
        return (
            <React.Fragment>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    <h1>Crypto Converter</h1>
                    {this.state.errorText.length > 0 ?
                        <Alert severity="error">{this.state.errorText}</Alert>
                        :
                        ''
                    }
                    {this.state.showAvailableCryptosText ?
                        <Alert severity="error">
                            <AvailableCryptoDialog />
                        </Alert>
                        :
                        ''
                    }
                    {this.state.resultText.length > 0 ?
                        <Alert severity="success">{this.state.resultText}</Alert>
                        :
                        ''
                    }
                    <form method="post" onSubmit={(event) => this.submitForm(event)}>
                        <FormControl style={{marginTop: 10}}>
                            <InputLabel>Amount</InputLabel>
                            <Input
                                inputProps={{ min: 0 }}
                                type="number" inputRef={this.amountRef} />
                        </FormControl><br />
                        <FormControl style={{marginTop: 10}}>
                            <InputLabel id="currency-label">Currency</InputLabel>
                            <Select
                                onChange={(event) => this.currencyChangeHandler(event)}
                                autoWidth labelId="currency-label"
                                id="currency" value={this.state.currency}
                                label="Currency"
                            >
                                <MenuItem value={'eur'}>EUR</MenuItem>
                                <MenuItem value={'usd'}>USD</MenuItem>
                                <MenuItem value={'pln'}>PLN</MenuItem>
                            </Select>
                        </FormControl><br />
                        <FormControl style={{marginTop: 10}}>
                            <InputLabel>Crypto</InputLabel>
                            <Input inputRef={this.cryptoRef} />
                            <FormHelperText>Such as BTC, CLP, COP or etc.</FormHelperText>
                        </FormControl><br />
                        <Button disabled={this.state.calculateBtnDisable} variant="contained"
                                color="primary" style={{marginTop: 10}}
                                onClick={(event) => this.submitForm(event)}
                        >
                            Calculate
                        </Button>
                    </form>
                </Grid>
            </React.Fragment>
        );
    }
}

export default Form;
