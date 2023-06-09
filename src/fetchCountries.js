import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function fetchCountries(name) {
  const url = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;

  return fetch(url).then(res => {
    if (res.status === 404) {
      Notify.failure('Oops, there is no country with that name');
    }

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  });
}
