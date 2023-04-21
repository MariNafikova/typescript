import { renderBlock } from './lib.js'
import { search } from './search-function.js'
import { searchFormData } from './helpers.js'

export function renderSearchFormBlock(
  startLimitationDate: string,
  endLimitationDate: string
) {
  renderBlock(
    'search-form-block',
    `
    <form onsubmit='return false' name='searchForm' id='search-form'>
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
            <input name='checkInDate' id='check-in-date' type='date' value='${
              new Date(new Date().setDate(new Date().getDate() + 1))
                .toISOString()
                .split('T')[0]
            }' min='${startLimitationDate}' max='${endLimitationDate}' name='checkin' />
          </div>
          <div>
            <label for='check-out-date'>Дата выезда</label>
            <input name='checkOutDate' id='check-out-date' type='date' value='${
              new Date(new Date().setDate(new Date().getDate() + 3))
                .toISOString()
                .split('T')[0]
            }' min='${startLimitationDate}' max='${endLimitationDate}' name='checkout' />
          </div>
          <div>
            <label for='max-price'>Макс. цена суток</label>
            <input id='max-price' type='text' name='price' value='1000' class='max-price' />
          </div>
          <div>
            <button type='submit' id='search-button'>Найти</button> 
          </div>
        </div>
      </fieldset>
    </form>
    `
  )

  document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const searchData: searchFormData = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      checkInDate: new Date(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.forms.searchForm.elements.checkInDate.value
      ).valueOf(),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      checkOutDate: new Date(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.forms.searchForm.elements.checkOutDate.value
      ).valueOf(),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      price: parseInt(document.forms.searchForm.elements.price.value),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      city: document.forms.searchForm.elements.city.value,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      coordinates: document.forms.searchForm.elements.coordinates.value,
    }
    search(searchData, (error, response) => {
      console.log('response: ', response)
      response.forEach((el) => {
        document.getElementById('results-list').innerHTML(`<li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites active"></div>
            <img class="result-img" src="./img/result-1.png" alt="">
          </div>
          <div class="result-info">
            <div class="result-info--header">
              <p>YARD Residence Apart-hotel</p>
              <p class="price">13000&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> 2.5км от вас</div>
            <div class="result-info--descr">Комфортный апарт-отель в самом сердце Санкт-Петербрга. К услугам гостей номера с видом на город и бесплатный Wi-Fi.</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>`)
      })
    })
  })
}
