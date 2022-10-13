import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { actions, useThing } from "../thing";

const NewLabel = (props) => {

    const [isActiveAddNewLabel, setActiveAddNewLabel] = useState(false)
    const inputRef = useRef();
    const [state, dispatch] = useThing()

    useEffect(() => {
        if (isActiveAddNewLabel) {
            inputRef.current.focus();
        }
    },
    [isActiveAddNewLabel])

    const handleClickAddNewLabel = () => {
        setActiveAddNewLabel(true);
    }

    const handleInactiveAddNewLabel = e => {
        setActiveAddNewLabel(false);
        let newLabel = {
            name: e.target.value
        };
        if(newLabel.name.trim() != ""){
            axios.post("http://localhost:3000/api/v1/labels",newLabel).then((response) => {
            
            dispatch(actions.addLabel(response.data));
            return response.json;
        });
            props.onAddNewLabel(true);
        }
    }

    const stateCheck = (isActiveAddNewLabel) ? "bg-light" : "";

    return (
        <div className={`list-group-item list-group-item-action ${stateCheck}`}>
            {isActiveAddNewLabel 
                ? 
                    <input className="no-border bg-light" ref={inputRef}  placeholder="text something" onBlur={e => handleInactiveAddNewLabel(e)}></input>
                : 
                <div>
                    <FontAwesomeIcon className="me-3" icon={faPlus}/>
                    <a  id="additional-label" className="stretched-link text-decoration-none text-dark" onClick={() => handleClickAddNewLabel()}>
                        <span> New label</span>
                    </a>

                </div>
            }
        </div>
    )
}

export default NewLabel;