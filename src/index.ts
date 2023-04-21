import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import { FlatRentSdk } from './flat-rent-sdk.js'

const rent = new FlatRentSdk().get('vnd331')
console.log(rent)
import {
  renderSearchResultsBlock,
  renderSearchStubBlock,
} from './search-results.js'
import { getUserData, renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import { getFavoritesAmount, initLocalStorage } from './helpers.js'

// Заполняем локальное хранилище
initLocalStorage()

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
  renderUserBlock(
    getUserData().username,
    getUserData().avatarUrl,
    getFavoritesAmount()
  )
  renderSearchFormBlock(
    limitDates.startLimitationDate,
    limitDates.endLimitationDate
  )
  renderSearchStubBlock()
  renderSearchResultsBlock()
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
