import { PORT } from "@my-app/shared"

export function getUrlForApiCall(route:string):string{

const url =  `http://localhost:${PORT.server}`
const trimmedRoute= route.trim()
return url+trimmedRoute
}