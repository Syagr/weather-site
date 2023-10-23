const apiKey = 'a502393cf614401c9e0165300231910';

// http://api.weatherapi.com/v1/current.json?key=a502393cf614401c9e0165300231910&q=London--------

// Элементы на странице
const header = document.querySelector('.header');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');

function removeCard() {
  // Удаляем предыдущую карточку
  const prevCard = document.querySelector('card');
  if (prevCard) prevCard.remove();
}

//  слушаем отправку формы

function showError(errorMessage) {
  // отображаем карточку с ошибкой
  const html = `<div class="card">${errorMessage}</div>`;
  // отображаем карточку на странице
  header.insertAdjacentHTML('afterend', html);
}

function showCardError({ name, country, temp, condition }) {
  const html = `<di class="card">
	<h2 class="card-city">${name},<span>${country}</span></h2>

	<div class="card-weather" >
	<div class="card-value">${temp}<sup>°c</sup></div>
	<img class ="card-img" src="./image/weather.png" alt="weather">
	</div>

	<div class="card-description">${condition}</div>
	</div>`;

  header.insertAdjancentHTML('afterend', html);
}

async function getWeather(city) {
  // адрес запроса
  const url =
    'http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}';
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

form.onsubmit = async function (e) {
  // отменяем отпраку формы
  e.preventDefault();

  // берем значение из инпута, обрезаем пробелы
  let city = input.value.trim();

  // получаем данные с сервера
  const data = await getWeather(city);

  if (data.error) {
    removeCard();

    showError(data.error.message);
  } else {
    removeCard();

    const weatherData = {
      name: data.location.name,
      country: data.location.country,
      temp_c: data.current.temp_c,
      condition: data.current.condition.text,
    };
    showCard(weatherData);
  }

 
};
