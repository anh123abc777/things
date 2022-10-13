import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { actions, useThing } from "../thing";

const PublishedLabel = (props) => {

    const [state, dispatch] = useThing()

    return (
        <div className={`list-group-item list-group-item-action  ${props.defaultState}`}>
            <FontAwesomeIcon className="me-3" icon={faLightbulb}/>
            <a className="stretched-link text-decoration-none text-dark" onClick={() => dispatch(actions.refreshThings())}>
                <span>Things</span>
            </a>
        </div>
    )
}

export default PublishedLabel;  