import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'

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
  renderUserBlock('Wade Warren', '/img/avatar.png', 0)
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
