import { SHOW_THING, FILTER_THINGS_TO_LABEL, LOAD_THINGS, REFRESH_THINGS, UPDATE_THING, CLOSE_THING, INPUT_TITLE, INPUT_BODY } from "./constants";

export const loadThing = payload => ({
    type: LOAD_THINGS,
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

export const updateThing = payload  => ({
    type: UPDATE_THING,
    payload
})
