import { renderBlock } from './lib.js'

interface searchFormData {
  checkIn: string
  checkOut: string
  price: number
  city: string
}

export function renderSearchFormBlock(
  startLimitationDate: string,
  endLimitationDate: string
) {
  renderBlock(
    'search-form-block',
    `
    <form onsubmit='return false'>
      <fieldset class='search-filedset' id='search-filedset'>
        <div class='row'>
          <div>
            <label for='city'>Город</label>
            <input name='city' id='city' type='text' disabled value='Санкт-Петербург' />
            <input name='coordinates' type='hidden' disabled value='59.9386,30.3141' />
          </div>
          <div class='providers'>
            <label><input type='checkbox' name='provider' value='homy' checked /> Homy</label>
            <label><input type='checkbox' name='provider' value='flat-rent' checked /> FlatRent</label>
          </div>
        </div>
        <div class='row'>
          <div>
            <label for='check-in-date'>Дата заезда</label>
            <input id='check-in-date' type='date' value='${
              new Date(new Date().setDate(new Date().getDate() + 1))
                .toISOString()
                .split('T')[0]
            }' min='${startLimitationDate}' max='${endLimitationDate}' name='checkin' />
          </div>
          <div>
            <label for='check-out-date'>Дата выезда</label>
            <input id='check-out-date' type='date' value='${
              new Date(new Date().setDate(new Date().getDate() + 3))
                .toISOString()
                .split('T')[0]
            }' min='${startLimitationDate}' max='${endLimitationDate}' name='checkout' />
          </div>
          <div>
            <label for='max-price'>Макс. цена суток</label>
            <input id='max-price' type='text' value='' name='price' class='max-price' />
          </div>
          <div>
            <button type='submit' id='search-button'>Найти</button> 
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
  document.getElementById('search-button').onclick = function () {
    const fieldset = document.getElementById('search-filedset')
    const elements = fieldset.querySelectorAll('input')
    const searchData: searchFormData = {
      checkIn: '',
      checkOut: '',
      price: 0,
      city: '',
    }
    elements.forEach(function (element) {
      switch (element.name) {
        case 'checkin':
          searchData.checkIn = element.value
          break
        case 'checkout':
          searchData.checkOut = element.value
          break
        case 'city':
          searchData.city = element.value
          break
        case 'price':
          searchData.price = parseInt(element.value)
          break
      }
    })
    console.log('searchData: ', searchData)
  }
}
