import {
    SHOW_THING,
    FILTER_THINGS_TO_LABEL,
    LOAD_THINGS,
    REFRESH_THINGS,
    UPDATE_THING,
    CLOSE_THING,
    INPUT_TITLE,
    INPUT_BODY,
    CREATE_THING,
    DELETE_THING,
    LOAD_LABELS,
    UPDATE_THING_OF_LABEL,
    LOAD_ARCHIVED_THINGS,
    EDIT_THING,
    ADD_LABEL,
    DELETE_LABEL,
    UPDATE_LABEL,
    ARCHIVE_THING,
    SEARCH_THINGS,
    BEFORE_DETELE_THING,
    UNDO_DELETE_THING,
    UPDATE_THINGS,
    SHOW_SIDEBAR,
} from './constants';

const initState = {
    things: [],
    labels: [],
    selectedThing: {},
    selectedLabel: 'publishedLabel',
    defaultThings: [],
    backupThings: [],
    showThingDetails: false,
    hasUpdate: false,
    isUpdateLabel: false,
    isShowSidebar: true,
};

function reducer(state, action) {
    switch (action.type) {
        case LOAD_THINGS:
            return {
                ...state,
                things: action.payload,
                defaultThings: action.payload,
                backupThings: action.payload,
            };

        case LOAD_LABELS:
            return {
                ...state,
                labels: action.payload,
            };

        case FILTER_THINGS_TO_LABEL:
            return {
                ...state,
                things: action.payload?.things,
                selectedLabel: action.payload.label,
                backupThings: action.payload?.things,
            };

        case REFRESH_THINGS:
            return {
                ...state,
                things: state.defaultThings,
                backupThings: state.defaultThings,
            };

        case SHOW_THING:
            return {
                ...state,
                selectedThing: action.thing,
                showThingDetails: true,
            };

        case CLOSE_THING:
            return {
                ...state,
                showThingDetails: false,
                selectedThing: {},
            };

        case INPUT_TITLE:
            return {
                ...state,
                hasUpdate: true,
                selectedThing: { ...state.selectedThing, title: action.payload },
            };

        case INPUT_BODY:
            return {
                ...state,
                hasUpdate: true,
                selectedThing: { ...state.selectedThing, body: action.payload },
            };

        case UPDATE_THING: {
            let labelIds = action.payload.labels.map((label) => label.id);
            let updatedLabels = state.labels.map((label) => {
                if (labelIds.includes(label.id)) {
                    label.things = [...label.things, action.payload];
                    label.things = [...new Set(label.things)];
                } else {
                    label.things = label.things.filter((thing) => thing.id !== action.payload.id);
                }
                return label;
            });

            let updatedThings = state.defaultThings.map((thing) => {
                return thing.id == action.payload.id ? action.payload : thing;
            });

            console.log(updatedLabels);
            return {
                ...state,
                things: updatedThings,
                backupThings: updatedThings,
                labels: updatedLabels,
                defaultThings: updatedThings,
                selectedThing: action.payload,
            };
        }

        case CREATE_THING: {
            return {
                ...state,
                backupThings: [...state.backupThings, action.payload],
                things: [...state.things, action.payload],
                defaultThings: [...state.defaultThings, action.payload],
            };
        }

        case DELETE_THING: {
            let updatedDefaultThings = state.defaultThings.filter((thing) => {
                return thing.id != action.payload.id;
            });
            return {
                ...state,
                backupThings: state.things,
                defaultThings: updatedDefaultThings,
                labels: state.labels.map((label) => {
                    label.things.filter((thing) => thing.id != action.payload.id);
                    return label;
                }),
            };
        }

        case BEFORE_DETELE_THING: {
            let updatedThings = state.things.filter((thing) => {
                return thing.id != action.payload.id;
            });
            return {
                ...state,
                things: updatedThings,
            };
        }

        case UNDO_DELETE_THING: {
            return {
                ...state,
                things: state.backupThings,
            };
        }

        case UPDATE_THING_OF_LABEL: {
            return {
                ...state,
                isUpdateLabel: true,
            };
        }

        case LOAD_ARCHIVED_THINGS: {
            return {
                ...state,
                things: action.payload,
            };
        }

        case EDIT_THING: {
            return {
                ...state,
                hasUpdate: true,
            };
        }

        case ADD_LABEL: {
            return {
                ...state,
                labels: [action.payload, ...state.labels],
            };
        }

        case DELETE_LABEL: {
            return {
                ...state,
                labels: state.labels.filter((label) => label.id != action.payload.id),
            };
        }

        case UPDATE_LABEL: {
            return {};
        }

        case ARCHIVE_THING: {
            return {
                ...state,
                defaultThings: state.defaultThings.filter((thing) => {
                    return thing.id != action.payload.id;
                }),
                things: state.things.filter((thing) => {
                    return thing.id != action.payload.id;
                }),
                backupThings: state.backupThings.filter((thing) => {
                    return thing.id != action.payload.id;
                }),
                labels: state.labels.map((label) => {
                    label.things.filter((thing) => thing.id != action.payload.id);
                    return label;
                }),
            };
        }

        case SEARCH_THINGS: {
            return {
                ...state,
                things: state.backupThings.filter((thing) => {
                    return (
                        !action.payload || thing.title.includes(action.payload) || thing.body.includes(action.payload)
                    );
                }),
            };
        }

        case UPDATE_THINGS: {
            return {
                ...state,
                things: action.payload.things,
                backupThings: action.payload.things,
                defaultThings: action.payload.defaultThings,
            };
        }

        case SHOW_SIDEBAR: {
            return {
                ...state,
                isShowSidebar: !state.isShowSidebar,
            };
        }

        default:
            throw new Error(`Invalid action ${action.type}`);
    }
}

export { initState };
export default reducer;
