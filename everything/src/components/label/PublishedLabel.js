import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actions, useThing } from '../thing';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { ListItem, ListItemButton, ListItemIcon } from '@mui/material';

const PublishedLabel = (props) => {
    const [state, dispatch] = useThing();

    return (
        <ListItem key="publishedLabel" disablePadding>
            <ListItemButton
                selected={props.selectedIndex === 'publishedLabel'}
                onClick={(e) => {
                    dispatch(actions.refreshThings());
                    props.onListItemClick('publishedLabel');
                }}
            >
                <ListItemIcon>
                    <LightbulbIcon fontSize="large" color="primary" />
                </ListItemIcon>
                <p style={{ margin: 0 }}>Things</p>
            </ListItemButton>
        </ListItem>
    );
};

export default PublishedLabel;
