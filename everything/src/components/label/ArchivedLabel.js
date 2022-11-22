import { faArchive } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import axios from 'axios';
import { actions, useThing } from '../thing';
import { ARCHIVED_THINGS_URL } from '../thing/thingUrl';
import ArchiveIcon from '@mui/icons-material/Archive';

const ArchivedLabel = (props) => {
    const [state, dispatch] = useThing();

    const handleShowArchivedThings = () => {
        loadArchivedThings();
    };

    const loadArchivedThings = () => {
        axios.get(ARCHIVED_THINGS_URL).then((response) => {
            dispatch(actions.loadArchivedThings(response.data));
        });
    };

    return (
        <ListItem key="archivedLabel" disablePadding>
            <ListItemButton
                selected={props.selectedIndex === 'archivedLabel'}
                onClick={() => {
                    handleShowArchivedThings();
                    props.onListItemClick('archivedLabel');
                }}
            >
                <ListItemIcon>
                    <ArchiveIcon fontSize="large" color="primary" />
                </ListItemIcon>
                <p style={{ margin: 0 }}>Archive</p>
            </ListItemButton>
        </ListItem>
    );
};

export default ArchivedLabel;
