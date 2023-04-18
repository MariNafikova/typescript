declare module 'flat-rent-sdk' {
  export interface Rent {
    id: string
    title: string
    details: string
    photos: string[]
    coordinates: number[]
    bookedDates: string[]
    price: number
  }
  export interface Callback<R> {
    (error?: Error, result?: R)
  }
  export function search(query: string, callback: Callback<Rent[]>): void
  export function get(id: string, callback: Callback<Rent>): void
}
