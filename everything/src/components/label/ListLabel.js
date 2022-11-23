import { faLadderWater, faRemove, faTShirt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { memo, useEffect, useState } from 'react';
import { actions, useThing } from '../thing';
import ArchivedLabel from './ArchivedLabel';
import NewLabel from './NewLabel';
import PublishedLabel from './PublishedLabel';
import LabelIcon from '@mui/icons-material/Label';
import Link from '@mui/joy/Link';
import {
    Card,
    CardActionArea,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { pink } from '@mui/material/colors';

const ListLabel = (props) => {
    const [state, dispatch] = useThing();
    const { labels, selectedLabel } = state;

    const handelAddNewLabel = (isAddNew) => {
        props.setIsUpdateLabel(isAddNew);
    };

    const handelRemoveLabel = (labelNeedRemove) => {
        axios.delete(`http://localhost:3000/api/v1/labels/${labelNeedRemove.id}`).then((response) => response.data);
        dispatch(actions.deleteLabel(labelNeedRemove));
    };

    return (
        <div className="list-group list-group-flush">
            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <NewLabel onAddNewLabel={handelAddNewLabel}></NewLabel>
                <PublishedLabel></PublishedLabel>
                {labels.map((label) => {
                    const labelId = `checkbox-list-secondary-label-${label.id}`;
                    return (
                        <ListItem
                            key={label.id}
                            secondaryAction={
                                <IconButton edge="end" aria-label="comments" onClick={() => handelRemoveLabel(label)}>
                                    <RemoveCircleOutlineIcon fontSize="large" sx={{ color: pink[500] }} />
                                </IconButton>
                            }
                            selected={selectedLabel === label.id}
                            disablePadding
                        >
                            <ListItemButton
                                onClick={() => {
                                    dispatch(actions.filterThingsToLabel({ label: label.id, things: label.things }));
                                }}
                            >
                                <ListItemIcon>
                                    <LabelIcon fontSize="large" color="primary" />
                                </ListItemIcon>
                                <p style={{ margin: 0 }}>{label.name}</p>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
                <ArchivedLabel></ArchivedLabel>
            </List>
        </div>
    );
};

export default ListLabel;
