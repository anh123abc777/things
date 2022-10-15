import { SHOW_THING, FILTER_THINGS_TO_LABEL, LOAD_THINGS, REFRESH_THINGS, UPDATE_THING, CLOSE_THING, INPUT_TITLE, INPUT_BODY, CREATE_THING, DELETE_THING, LOAD_LABELS, UPDATE_THING_OF_LABEL, LOAD_ARCHIVED_THINGS, EDIT_THING, ADD_LABEL, DELETE_LABEL, UPDATE_LABEL, ARCHIVE_THING } from "./constants"

const initState = {
    things: [],
    labels: [],
    selectedThing: {},
    defaultThings: [],
    showThingDetails: false,
    hasUpdate: false,
    isUpdateLabel: false
}

function reducer(state, action) {
    switch (action.type) {
        case LOAD_THINGS:
            return {
                ...state,
                things: action.payload,
                defaultThings: action.payload
            }

        case LOAD_LABELS:
            return {
                ...state,
                labels: action.payload
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
                showThingDetails: false,
                selectedThing: {}
            }

        case INPUT_TITLE:
            return {
                ...state,
                hasUpdate: true,
                selectedThing: { ...state.selectedThing, title: action.payload }
            }

        case INPUT_BODY:
            return {
                ...state,
                hasUpdate: true,
                selectedThing: { ...state.selectedThing, body: action.payload }
            }

        case UPDATE_THING: {
            let updatedThings = state.defaultThings.map(thing => {
                return thing.id == action.payload.id ? action.payload : thing

            })
            return {
                ...state,
                things: updatedThings,
                defaultThings: updatedThings,
                selectedThing: action.payload
            }
        }

        case CREATE_THING: {
            return {
                ...state,
                things:  [...state.things, action.payload],
                defaultThings:  [...state.defaultThings, action.payload]
            }
        }

        case DELETE_THING: {
            let updatedThings = state.things.filter(thing => {
                return thing.id != action.payload.id
            })
            return {
                ...state,
                things: updatedThings,
                defaultThings: updatedThings,
                labels: state.labels.map(label => {
                    label.things.filter(thing => thing.id != action.payload.id)
                    return label
                })
            }
        }

        case UPDATE_THING_OF_LABEL: {
            let c = state.count;
            return {
                ...state,
                isUpdateLabel: true
            }
        }

        case LOAD_ARCHIVED_THINGS: {
            return {
                ...state,
                things: action.payload
            }
        }

        case EDIT_THING: {
            return {
                ...state,
                hasUpdate: true
            }
        }

        case ADD_LABEL: {
            return {
                ...state,
                labels: [action.payload, ...state.labels]
            }
        }

        case DELETE_LABEL: {
            return {
                ...state,
                labels: state.labels.filter(label => label.id != action.payload.id)
            }
        }

        case UPDATE_LABEL: {
            return {

            }
        }

        case ARCHIVE_THING: {
            console.log(action.payload.id);
            return {
                ...state,
                defaultThings:  state.defaultThings.filter(thing => {
                    return thing.id != action.payload.id
                }),
                things:  state.things.filter(thing => {
                    return thing.id != action.payload.id
                }),
                labels: state.labels.map(label => {
                    label.things.filter(thing => thing.id != action.payload.id)
                    return label
                })
            }
        }

        default:
            throw new Error(`Invalid action ${action.type}`)
    }
}

export { initState }
export default reducer