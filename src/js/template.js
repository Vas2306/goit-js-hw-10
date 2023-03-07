export function showCountryList ({ flags, name }){
    return `
    <li class = country-list__item>
    <img class = 'country-list__flags' src="${flags.svg}" alt="${name.official}" width=50/>
    <h2 class = country-list__name>${name.official}</h2>
    </li>
    `
}

export function showCountryCard({ flags, name, capital, population, languages }) {
    return `
    <div class="country">
      <img class = "country-flag" src="${flags.svg}" alt="${name.official}" width = 100/>
      <h2 class = "country-title">Country: ${name.official}</h2>
      <p class = "country-text">Capital: ${capital}</p>
      <p class="country-text">Population: ${population}</p>
      <p class="country-text">Languages: ${Object.values(languages)}</p>
    </div>
    `
}