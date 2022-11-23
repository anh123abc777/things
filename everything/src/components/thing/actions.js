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

export const loadThing = (payload) => ({
    type: LOAD_THINGS,
    payload,
});

export const loadLabels = (payload) => ({
    type: LOAD_LABELS,
    payload,
});

export const filterThingsToLabel = (payload) => ({
    type: FILTER_THINGS_TO_LABEL,
    payload,
});

export const refreshThings = () => ({
    type: REFRESH_THINGS,
});

export const showThing = (thing) => ({
    type: SHOW_THING,
    thing,
});

export const closeThing = () => ({
    type: CLOSE_THING,
});

export const inputTitle = (payload) => ({
    type: INPUT_TITLE,
    payload,
});

export const inputBody = (payload) => ({
    type: INPUT_BODY,
    payload,
});

export const updateThing = (payload) => ({
    type: UPDATE_THING,
    payload,
});

export const createThing = (payload) => ({
    type: CREATE_THING,
    payload,
});

export const deleteThing = (payload) => ({
    type: DELETE_THING,
    payload,
});

export const beforeDeleteThing = (payload) => ({
    type: BEFORE_DETELE_THING,
    payload,
});

export const undoDeleteThing = () => ({
    type: UNDO_DELETE_THING,
});

export const updateThingOfLabel = (payload) => ({
    type: UPDATE_THING_OF_LABEL,
    payload,
});

export const loadArchivedThings = (payload) => ({
    type: LOAD_ARCHIVED_THINGS,
    payload,
});

export const editThing = () => ({
    type: EDIT_THING,
});

export const addLabel = (payload) => ({
    type: ADD_LABEL,
    payload,
});

export const deleteLabel = (payload) => ({
    type: DELETE_LABEL,
    payload,
});

export const updateLabel = (payload) => ({
    type: UPDATE_LABEL,
    payload,
});

export const archiveThing = (payload) => ({
    type: ARCHIVE_THING,
    payload,
});

export const searchThings = (payload) => ({
    type: SEARCH_THINGS,
    payload,
});

export const updateThings = (payload) => ({
    type: UPDATE_THINGS,
    payload,
});

export const showSidebar = () => ({
    type: SHOW_SIDEBAR,
});
