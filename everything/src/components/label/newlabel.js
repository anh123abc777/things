import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";

const NewLabel = (props) => {

    const [isActiveAddNewLabel, setActiveAddNewLabel] = useState(false)

    const handleClickAddNewLabel = () => {
        setActiveAddNewLabel(true);
    }

    const handleInactiveAddNewLabel = e => {
        setActiveAddNewLabel(false);
        let newLabel = {
            name: e.target.value
        };
        if(newLabel.name.trim() != ""){
            axios.post("http://localhost:3000/api/v1/labels",newLabel).then((response) => response.data);
            props.onAddNewLabel(true);
        }
    }

    const stateCheck = (isActiveAddNewLabel) ? "bg-light" : "";

    return (
        <div className={`list-group-item list-group-item-action ${stateCheck}`}>
            {isActiveAddNewLabel 
                ? 
                    <input className="no-border bg-light" placeholder="text something" onBlur={e => handleInactiveAddNewLabel(e)}></input>
                : 
                    <a  id="additional-label" className="stretched-link text-decoration-none text-dark" onClick={() => handleClickAddNewLabel()}>
                        <FontAwesomeIcon icon={faPlus}/>
                        <span> New label</span>
                    </a>
            }
        </div>
    )
}

export default NewLabel;