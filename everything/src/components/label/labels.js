import { faLadderWater, faRemove, faTShirt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { actions, useThing } from "../thing";
import ArchivedLabel from "./ArchivedLabel";
import NewLabel from "./NewLabel";
import PublishedLabel from "./PublishedLabel";

const Labels = (props) => {

    const [state, dispatch] = useThing();
    const {labels} = state
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
        dispatch(actions.deleteLabel(labelNeedRemove));
    }

    const defaultState = (selectedLabel == null) ? "bg-light" : ""

    return (
        <div className="list-group list-group-flush">
            <NewLabel onAddNewLabel={handelAddNewLabel}></NewLabel>
            <PublishedLabel defaultState={defaultState} ></PublishedLabel>
            {labels.map((label) => {
                const stateCheck = (selectedLabel == label.name) ? "bg-light" : ""
                return(
                        <div key={label.id} className={`list-group-item list-group-item-action justify-content-between d-flex  ${stateCheck} `} >
                            <div>
                                <FontAwesomeIcon className="me-3" icon={faTShirt}/>
                                <a className="text-decoration-none text-dark " onClick={() => dispatch(actions.filterThingsToLabel(label.things))}>
                                    {label.name}
                                </a>
                            </div>
                            <button className="btn" onClick={() => handelRemoveLabel(label)}><FontAwesomeIcon icon={faRemove}/></button>
                        </div>
                );
            })}
            <ArchivedLabel></ArchivedLabel>
        </div>
    )
}

export default Labels;