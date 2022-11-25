import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { actions, useThing } from '~/hooks';
import { Box, ListItem, ListItemButton, ListItemIcon, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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

    const handleInactiveAddNewLabel = (e) => {
        setActiveAddNewLabel(false);
        let newLabel = {
            name: e.target.value,
        };
        if (newLabel.name.trim() != '') {
            axios.post('http://localhost:3000/api/v1/labels', newLabel).then((response) => {
                dispatch(actions.addLabel(response.data));
                return response.json;
            });
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
