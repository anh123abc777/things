import { SHOW_THING, FILTER_THINGS_TO_LABEL, LOAD_THINGS, REFRESH_THINGS, UPDATE_THING, CLOSE_THING, INPUT_TITLE, INPUT_BODY } from "./constants"

const initState = {
    things: [],
    selectedThing: {},
    defaultThings: [],
    showThingDetails: false,
    hasUpdate: false
}

function reducer(state, action){
    switch(action.type){
        case LOAD_THINGS: 
            return {
                ...state,
                things: action.payload,
                defaultThings: action.payload
            }

        case FILTER_THINGS_TO_LABEL:
            return {
                ...state,
                things: action.payload
            }

        case REFRESH_THINGS: 
            return {
                ...state,
                things: state.defaultThings
            }

        case SHOW_THING: 
            return {
                ...state,
                selectedThing: action.thing,
                showThingDetails: true
            }

        case CLOSE_THING:
            return {
                ...state,
                showThingDetails: false
            }

        case INPUT_TITLE:
            return {
                ...state,
                hasUpdate: true,
                selectedThing: {...state.selectedThing, title: action.payload}
            }
            
        case INPUT_BODY:
            return {
                ...state,
                hasUpdate: true,
                selectedThing: {...state.selectedThing, body: action.payload}
            }

        case UPDATE_THING:
            return {
                ...state,
                things: state.things.map(thing => {
                    return thing.id == action.payload.id ? action.payload : thing
                    
                })
            }

        default: 
            throw new Error(`Invalid action ${action.type}`)
    }
}

export {initState}
export default reducer