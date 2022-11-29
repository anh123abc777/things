import { useEffect, useRef, useState } from 'react';
import { Box, ListItem, ListItemButton, ListItemIcon, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { actions, useThing } from '~/hooks';
import * as labelServices from '~/services/labelServices';

const NewLabel = (props) => {
    const [isActiveAddNewLabel, setActiveAddNewLabel] = useState(false);
    const inputRef = useRef();
    const [state, dispatch] = useThing();

    useEffect(() => {
        if (isActiveAddNewLabel) {
            inputRef.current.focus();
        }
    }, [isActiveAddNewLabel]);

    const handleClickAddNewLabel = () => {
        setActiveAddNewLabel(true);
    };

    const handleInactiveAddNewLabel = async (e) => {
        setActiveAddNewLabel(false);
        let newLabel = {
            name: e.target.value,
        };
        if (newLabel.name) {
            const res = await labelServices.createLabel(newLabel);
            dispatch(actions.addLabel(res));
            props.onAddNewLabel(true);
        }
    };

    const stateCheck = isActiveAddNewLabel ? 'bg-light' : '';

    return (
        <div className={` ${stateCheck}`}>
            {isActiveAddNewLabel ? (
                <ListItem>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                        <AddIcon fontSize="large" color="primary" sx={{ mr: 1, my: 0.5 }} />
                        <TextField
                            inputRef={inputRef}
                            variant="standard"
                            placeholder="text something"
                            sx={{ width: '100%' }}
                            onBlur={(e) => handleInactiveAddNewLabel(e)}
                            inputProps={{ style: { fontSize: '1.6rem' } }}
                        />
                    </Box>
                </ListItem>
            ) : (
                <ListItem key="archivedLabel" disablePadding>
                    <ListItemButton onClick={() => handleClickAddNewLabel()}>
                        <ListItemIcon>
                            <AddIcon fontSize="large" color="primary" />
                        </ListItemIcon>
                        <p style={{ margin: 0 }}>New label</p>
                    </ListItemButton>
                </ListItem>
            )}
        </div>
    );
};

export default NewLabel;
