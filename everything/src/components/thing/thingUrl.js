export const THING_URL = (id) => { return `http://localhost:3000/api/v1/things/${id}` }
export const THINGS_URL = 'http://localhost:3000/api/v1/things/' 
export const ARCHIVED_THINGS_URL = 'http://localhost:3000/api/v1/archived/things'
export const getApiArchiveThingURL = (id) => { return `http://localhost:3000/api/v1/things/${id}/archive` }