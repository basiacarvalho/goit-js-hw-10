import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

inputCountry.addEventListener(
  'input',
  debounce(() => {
    console.log('Hello');
    fetchCountries(inputCountry.value)
      .then(countries => renderCountries(countries))
      .catch(error => console.log(error));
  }, DEBOUNCE_DELAY)
);

function renderCountries(countries) {
  console.log(countries);
  const markup = countries
    .map(country => {
      return `
        <li class="country-list__item">
        <div class="flag-box">
        <img class="flag-box__image" src="${
          country.flags.svg
        }" alt="country flag" width="90" height="60">
          <p class="flag-box__country-name">${country.name.official}</p>
        </div>
        
          <p><b>capital</b>: ${country.capital}</p>
          <p><b>population</b>: ${country.population}</p>
          <p><b>languages</b>: ${Object.values(country.languages).map(
            language => ' ' + language
          )}</p>
        </li>
      `;
    })
    .join('');
  countryList.innerHTML = markup;
}
