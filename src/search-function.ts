import { Places, searchFormData } from './helpers.js'

function searchRequest(searchData: searchFormData) {
  return fetch(
    `http://localhost:3030/places/?coordinates=${searchData.coordinates}&checkInDate=${searchData.checkInDate}&checkOutDate=${searchData.checkOutDate}`
  )
    .then((response) => {
      return response.text()
    })
    .then<Places>((response) => {
      return JSON.parse(response)
    })
    .then((data) => {
      return data
    })
}

export function search(
  searchData: searchFormData,
  callback: (error?: Error, response?: Places) => void
): void {
  searchRequest(searchData)
    .then((response) => {
      callback(null, response)
    })
    .catch((error) => {
      callback(error)
    })
}
