export function initLocalStorage() {
  localStorage.setItem(
    'user',
    '{"username": "Wade Warren", "avatarUrl": "/img/avatar.png"}'
  )
  localStorage.setItem('favoritesAmount', String(0))
  console.log('Init localStorage success')
}

// Получаем данные об избранном
export const getFavoritesAmount = () => {
  function serializeFavoritesAmount(value: unknown) {
    return parseInt(<string>value)
  }
  return serializeFavoritesAmount(localStorage.getItem('favoritesAmount'))
}

export interface searchFormData {
  checkInDate: string
  checkOutDate: string
  price: number
  city: string
  coordinates: string
}

interface Place {
  image: string
  name: string
  description: string
  remoteness: number
  bookedDates: number[]
}

export type Places = Array<Place>
