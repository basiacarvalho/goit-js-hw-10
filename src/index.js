import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputCountry.addEventListener(
  'input',
  debounce(() => {
    const country = inputCountry.value.trim();
    if (!country) {
      return;
    }
    fetchCountries(country)
      .then(countries => renderCountries(countries))
      .catch(error => console.log(error));
  }, DEBOUNCE_DELAY)
);

function renderCountries(countries) {
  const filteredCountries = countries.filter(country =>
    country.name.common
      .toLowerCase()
      .startsWith(inputCountry.value.trim().toLowerCase())
  );
  if (filteredCountries.length === 0) {
    Notify.failure('Oops, there is no country with that name.');
    clearCountryList();
    clearCountryInfo();
  } else if (filteredCountries.length === 1) {
    renderSingleCountry(filteredCountries);
  } else if (filteredCountries.length < 11) {
    renderMultipleCountries(filteredCountries);
  } else {
    Notify.info('Too many matches found.Please enter a more specific name.');
  }
}

function clearCountryList() {
  while (countryList.firstChild) {
    countryList.removeChild(countryList.lastChild);
  }
}

function clearCountryInfo() {
  while (countryInfo.firstChild) {
    countryInfo.removeChild(countryInfo.lastChild);
  }
}

function renderSingleCountry(countries) {
  clearCountryList();
  const markup = countries
    .map(country => {
      return `
        <div class="flag-box">
        <img class="flag-box__image" src="${
          country.flags.svg
        }" alt="country flag" width="90" height="70">
          <p class="flag-box__country-name">${country.name.common}</p>
        </div>
          <p><b>capital</b>: ${country.capital}</p>
          <p><b>population</b>: ${country.population}</p>
          <p><b>languages</b>: ${Object.values(country.languages).map(
            language => ' ' + language
          )}</p>
      `;
    })
    .join('');
  countryInfo.innerHTML = markup;
}

function renderMultipleCountries(countries) {
  clearCountryInfo();
  const markup = countries
    .map(country => {
      return `
      <li class="country-list__item">
        <div class="country-list__flag-box flag-box">
          <img class="country-list__image flag-box__image" src="${country.flags.svg}" alt="country flag" width="60" height="40">
            <p class="country-list__country-name">${country.name.common}</p>
        </div>
      </li>`;
    })
    .join(' ');
  countryList.innerHTML = markup;
}
