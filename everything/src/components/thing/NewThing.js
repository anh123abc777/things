import { memo, useState } from "react"
import { actions } from ".";
import { useThing } from "./hooks"

function NewThing(props) {

    const [state, dispatch] = useThing();

    return (
        <div className=" d-flex align-items-center justify-content-center" id="additional-thing">
            <div className="p-1 card w-25 text-secondary">
                <span>take a note..</span>
                <a className="stretched-link" onClick={() => dispatch(actions.showThing({ title: "", body: "" }))}></a>
            </div>
        </div>

    )
}

export default memo(NewThing)