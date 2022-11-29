import { ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import { actions, useThing } from '~/hooks';
import * as thingServices from '~/services/thingServices';

const ArchivedLabel = (props) => {
    const [state, dispatch] = useThing();
    const { selectedLabel } = state;

    const handleShowArchivedThings = () => {
        loadArchivedThings();
    };

    const loadArchivedThings = async () => {
        const res = await thingServices.getArchivedThings();
        dispatch(actions.filterThingsToLabel({ label: 'archivedLabel', things: res }));
    };

    return (
        <ListItem key="archivedLabel" disablePadding>
            <ListItemButton
                selected={selectedLabel === 'archivedLabel'}
                onClick={() => {
                    handleShowArchivedThings();
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
