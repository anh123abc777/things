import { memo, useState } from "react"

function NewThing(props){

    return (
        <div className=" d-flex align-items-center justify-content-center" id="additional-thing">
            <div className="p-1 card w-25 text-secondary">
                <span>take a note..</span>
                <a className="stretched-link" onClick={(e) => props.onShowThing("create", "http://localhost:3000/api/v1/things")}></a>
            </div>
        </div>
        
    )
}

export default memo(NewThing)