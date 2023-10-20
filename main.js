const apiKey = 'a502393cf614401c9e0165300231910';

// http://api.weatherapi.com/v1/current.json?key=a502393cf614401c9e0165300231910&q=London






// Элементы на странице
const header = document.querySelector('.header');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');


//  слушаем отправку формы

form.onsubmit = function (e) {
  // отменяем отпраку формы
  e.preventDefault();

  // берем значение из инпута, обрезаем пробелы
   let city = input.value.trim();
	// делаем запрос на сервер
	// адрес запроса
	const url = 'http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}';
	
	// выполняем запрос
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
		console.log(data);
		console.log(data.location.name);
		console.log(data.location.country);
		console.log(data.current.temp_c);
		console.log(data.current.condition.text);

		// отоброжаем данные в карточке
		// разметка для карточки
		const html = `
		<div class="card">
	<h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>
	<div class="card-weather">
		<div class="card-value">
			${data.current.temp_c}<sup>°c</sup>
		</div>
		<img class="card-img" src="./image/weather.png" alt="weather">
	</div>
	<div class="card-description">${data.current.condition.text}</div>
</div>`
		
		// отображаем карточку на странице
		header.insertAdjancentHTML('afterend', html);
    });
}