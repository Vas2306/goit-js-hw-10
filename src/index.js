import './css/styles.css';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchCountries } from './js/fetchCountries';
import { showCountryList, showCountryCard } from './js/template';
import { refs } from './js/refs-elements';

const DEBOUNCE_DELAY = 300;

refs.inputSearch.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();
  const search = e.target.value;
  console.log(e.target.value);
  if (search.trim() === '') {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(search.trim())
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return;
      }

      if (countries.length > 1 && countries.length <= 10) {
        const markup = countries.map(country => showCountryList(country));
        refs.countryList.innerHTML = markup.join('');
        refs.countryInfo.innerHTML = '';
      }

      if (countries.length === 1) {
        const cardMarcup = countries.map(country => showCountryCard(country));
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = cardMarcup.join('');
      }
    })

    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';
      return error;
    });
}
