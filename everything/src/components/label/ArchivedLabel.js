import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { actions, useThing } from "../thing";
import { ARCHIVED_THINGS_URL } from "../thing/thingUrl";

const ArchivedLabel = () => {
    const [state, dispatch] = useThing();

    const handleShowArchivedThings = () => {
        loadArchivedThings();
    }

    const loadArchivedThings = () => {
        axios.get(ARCHIVED_THINGS_URL).then((response) =>{
         dispatch(actions.loadArchivedThings(response.data));
        })
    }

    return (
        <div className="list-group-item list-group-item-action">
            <FontAwesomeIcon className="me-3" icon={faArchive}/>
            <a className="stretched-link text-decoration-none text-dark" onClick={() => handleShowArchivedThings()}>
                <span> Archive</span>
            </a>

        </div>
    )
}

export default ArchivedLabel;