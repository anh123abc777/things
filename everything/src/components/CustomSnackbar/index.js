import { Button, IconButton } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { Fragment, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const CustomSnackbar = (props) => {
    return (
        <Snackbar
            autoHideDuration={6000}
            open={props.open}
            message={props.message}
            onClose={() => {
                props.onClose();
                props.onDelete();
            }}
            action={
                <Fragment>
                    <Button
                        size="large"
                        sx={{ color: 'white' }}
                        onClick={() => {
                            props.onUndo();
                            props.onClose();
                        }}
                    >
                        UNDO
                    </Button>
                    <IconButton size="small" aria-label="close" color="inherit">
                        <CloseIcon fontSize="large" />
                    </IconButton>
                </Fragment>
            }
        />
    );
};

export default CustomSnackbar;
