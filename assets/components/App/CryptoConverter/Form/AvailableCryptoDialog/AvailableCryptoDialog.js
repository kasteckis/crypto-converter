import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AvailableCryptoDialog() {
    const [open, setOpen] = React.useState(false);
    const [cryptos, setCryptos] = React.useState(null);

    const handleClickOpen = (event) => {
        event.preventDefault();
        axios.get('/api/crypto')
            .then(response => {
                setCryptos(response.data.cryptos);
            })
            .catch(error => {
                console.log(error);
            })

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <a href="#" onClick={handleClickOpen}>
                Click here to see the list of all supported currencies on this site
            </a>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"List of all supported currencies on this application"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {cryptos}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
