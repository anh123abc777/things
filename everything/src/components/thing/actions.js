import { SHOW_THING, FILTER_THINGS_TO_LABEL, LOAD_THINGS, REFRESH_THINGS, UPDATE_THING, CLOSE_THING, INPUT_TITLE, INPUT_BODY, CREATE_THING, DELETE_THING, LOAD_LABELS } from "./constants";

export const loadThing = payload => ({
    type: LOAD_THINGS,
    payload
})

export const loadLabels = payload => ({
    type: LOAD_LABELS,
    payload
})

export const filterThingsToLabel = payload => ({
    type: FILTER_THINGS_TO_LABEL,
    payload
})

export const refreshThings = () => ({
    type: REFRESH_THINGS
})

export const showThing = thing => ({
    type: SHOW_THING,
    thing
})

export const closeThing = () => ({
    type: CLOSE_THING
})

export const inputTitle = payload => ({
    type: INPUT_TITLE,
    payload
})

export const inputBody = payload => ({
    type: INPUT_BODY,
    payload
})

export const updateThing = payload => ({
    type: UPDATE_THING,
    payload
})

export const createThing = payload => ({
    type: CREATE_THING,
    payload
})

export const deleteThing = payload => ({
    type: DELETE_THING,
    payload
})
