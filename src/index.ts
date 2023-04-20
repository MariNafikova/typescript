import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'

localStorage.setItem(
  'user',
  '{"username": "Wade Warren", "avatarUrl": "/img/avatar.png"}'
)
localStorage.setItem('favoritesAmount', String(0))

const getUserData = () => {
  function serializeUserData(value: unknown) {
    return JSON.parse(<string>value)
  }
  return serializeUserData(localStorage.getItem('user'))
}
const getFavoritesAmount = () => {
  function serializeFavoritesAmount(value: unknown) {
    return parseInt(<string>value)
  }
  return serializeFavoritesAmount(localStorage.getItem('favoritesAmount'))
}

const user = getUserData()

class limitationDates {
  startLimitationDate: string
  endLimitationDate: string
  constructor() {
    this.startLimitationDate = new Date().toISOString().split('T')[0]
    this.endLimitationDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 2,
      1
    )
      .toISOString()
      .split('T')[0]
  }
}
const limitDates = new limitationDates()

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock(user.username, user.avatarUrl, getFavoritesAmount())
  renderSearchFormBlock(
    limitDates.startLimitationDate,
    limitDates.endLimitationDate
  )
  renderSearchStubBlock()
  renderToast(
    {
      text: 'Это пример уведомления. Используйте его при необходимости',
      type: 'success',
    },
    {
      name: 'Понял',
      handler: () => {
        console.log('Уведомление закрыто')
      },
    }
  )
})
