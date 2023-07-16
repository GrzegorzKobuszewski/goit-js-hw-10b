import './css/styles.css';
import axios from 'axios';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// Nagłówek z kluczem API pobranym z https://thecatapi.com/
axios.defaults.headers.common['x-api-key'] = 'live_HW6ofgOXa1PHtoKKnRiH5QkMbqGs1Q4XiOBGyYr7i9wc25Sb6dIhoeXcLEhFmO7A';

// Przy stylowaniu interfejsu można użyć:
// https://github.com/notiflix/Notiflix#readme
// https://cssloaders.github.io/
// https://slimselectjs.com/

