import { faTable } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { actions } from '.';
import { useThing } from './hooks';
import { getApiArchiveThingURL } from './thingUrl';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const DropdownFeature = () => {
    const [state, dispatch] = useThing();
    const { selectedThing } = state;

    const handleArchiveThing = () => {
        axios.put(getApiArchiveThingURL(selectedThing.id)).then((response) => {
            dispatch(actions.archiveThing(selectedThing));
            dispatch(actions.closeThing());
        });
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="" aria-expanded="true" id="dropdown-feature" className="caret-off">
                <MoreVertIcon fontSize="large" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="p-3">
                <a className="cursor-pointer text-decoration-none text-dark" onClick={() => handleArchiveThing()}>
                    Archive
                </a>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropdownFeature;
