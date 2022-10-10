import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { actions, useThing } from "../thing";
import NewLabel from "./newlabel";

const Labels = (props) => {

    const [state, dispatch] = useThing();
  

    const [selectedLabel, selectLabel] = useState();


    const handleSelectLabel = label => {
        selectLabel(label? label.name : null);
        props.onShowThingsOfLabel(label);
    }

    const handelAddNewLabel = isAddNew => {
        props.setIsUpdateLabel(isAddNew);
    }

    const handelRemoveLabel = (labelNeedRemove) => {
        axios.delete(`http://localhost:3000/api/v1/labels/${labelNeedRemove.id}`).then((response) => response.data);
        props.setLabels(current =>
            current.filter(label => {
              return label.id !== labelNeedRemove.id;
            })
        );
    }

    const defaultState = (selectedLabel == null) ? "bg-light" : ""

    return (
        <div className="list-group list-group-flush">
            <NewLabel  onAddNewLabel={handelAddNewLabel}></NewLabel>
            <a className={`list-group-item list-group-item-action ${defaultState} `} onClick={() => dispatch(actions.refreshThings())}>
                    Things
                    </a>
            {props.labels.map((label) => {
                const stateCheck = (selectedLabel == label.name) ? "bg-light" : ""
                return(
                    <div key={label.id} >
                        <div  className={`list-group-item list-group-item-action justify-content-between d-flex  ${stateCheck} `} >
                            <a className="text-decoration-none text-dark " onClick={() => dispatch(actions.filterThingsToLabel(label.things))}>
                                {label.name}
                            </a>
                            <button className="btn" onClick={() => handelRemoveLabel(label)}><FontAwesomeIcon icon={faRemove}/></button>

                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Labels;