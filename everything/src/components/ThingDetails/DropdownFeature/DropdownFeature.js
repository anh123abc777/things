import Dropdown from 'react-bootstrap/Dropdown';
import { useThing, actions } from '~/hooks';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as thingServices from '~/services/thingServices';

const DropdownFeature = () => {
    const [state, dispatch] = useThing();
    const { selectedThing } = state;

    const handleArchiveThing = async () => {
        const formData = { ...selectedThing };
        formData.status = 'archived';
        const res = await thingServices.update(selectedThing.id, formData);
        dispatch(actions.archiveThing(res));
        dispatch(actions.closeThing());
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
