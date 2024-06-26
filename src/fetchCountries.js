import { Notify } from 'notiflix/build/notiflix-notify-aio';
const BASE_URL = 'https://restcountries.com/v2/name/';

export const fetchCountries = name =>
  fetch(
    `${BASE_URL}${name}?fields=name,capital,population,flags,languages`
  ).then(res => {
    if (res.status === 404)
      Notify.failure('Oops, there is no country with that name');

    if (!res.ok) throw new Error(res.statusText);

    return res.json();
  });
