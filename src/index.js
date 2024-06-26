import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getRefs from './get-refs';
import CountriesListMarkup from './templates/countries-list-markup.hbs';
import countryCardMarkup from './templates/country-card-markup.hbs';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(evt) {
  const inputValue = evt.target.value.trim();

  resetMarkup();

  if (!inputValue) return;

  fetchCountries(inputValue)
    .then(filteredCountriesByArrayLength)
    .catch(console.log);
}

function filteredCountriesByArrayLength(arrayCountries) {
  if (arrayCountries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  if (arrayCountries.length === 1) {
    renderCountryCard(arrayCountries);
    return;
  }

  renderCountriesList(arrayCountries);
}

function renderCountryCard(country) {
  const markup = country.map(countryCardMarkup).join('');

  refs.countryContainerEl.innerHTML = markup;
}

function renderCountriesList(country) {
  const markup = country.map(CountriesListMarkup).join('');

  refs.countriesList.innerHTML = markup;
}

function resetMarkup() {
  refs.countriesList.innerHTML = '';
  refs.countryContainerEl.innerHTML = '';
}
