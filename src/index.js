import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

import './css/styles.css';

Notiflix.Notify.init({
    width: '450px',
    position: 'center-top',
    distance: '20px',
    opacity: 1,
    borderRadius: '10px',
    timeout: 2000,

    info: {
        background: '#26c0d3',
        textColor: '#fff',
        childClassName: 'notiflix-notify-info',
        notiflixIconColor: 'rgba(0,0,0,0.2)',
        fontAwesomeClassName: 'fas fa-info-circle',
        fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
        backOverlayColor: 'rgba(38,192,211,0.2)',
        fontAwesomeIconSize: '60px',
    },
});

// Nagłówek z kluczem API pobranym z https://thecatapi.com/
axios.defaults.headers.common['x-api-key'] = 'live_HW6ofgOXa1PHtoKKnRiH5QkMbqGs1Q4XiOBGyYr7i9wc25Sb6dIhoeXcLEhFmO7A';

// Przy stylowaniu interfejsu można użyć:
// https://github.com/notiflix/Notiflix#readme
// https://cssloaders.github.io/
// https://slimselectjs.com/

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

// Dodanie nasłuchiwania na zdarzenie zmiany dla select
breedSelect.addEventListener('change', selectCat);

error.style.display = 'none';

// Funkcja obsługująca zmianę rasy kota
function selectCat(e) {
    const breedId = e.target.value;
    if (breedId) {
        loader.style.display = 'block';
        fetchCat(breedId);
    } else {
        loader.style.display = 'none';
    }
}

// Funkcja wykonująca żądanie informacji o kocie
function fetchCat(breedId) {
    fetchCatByBreed(breedId)
        .then(response => {
            const catItemInfo = response;
            showCat(catItemInfo);
        })
        .catch(error => {
            Notiflix.Notify.failure(
                'Upps! Coś poszło nie tak. Odśwież stronę...'
            );
            return error;
        })
        .finally(() => {
            loader.style.display = 'none';
        });
}

// Funkcja wyświetlająca informacje o kocie
function showCat(catItemInfo) {
    const { name, description, temperament } = catItemInfo[0].breeds[0];
    const { url } = catItemInfo[0];
    const catInfoHTML = `
        <img class="postImage" src="${url}" alt="">
        <div class="postWrapper">
            <h2 class="postTitle">${name}</h2>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Temperament:</strong> ${temperament}</p>
        </div>
        `;
    catInfo.innerHTML = catInfoHTML;
    catInfo.style.display = 'block';
}

// Inicjalizacja aplikacji - pobranie listy ras kota
function initCatApp() {
    loader.style.display = 'block';
    fetchBreeds()
        .then(breeds => {
            fillCatList(breeds);
            const select = new SlimSelect({
                select: '.breed-select',
            });
            Notiflix.Notify.info('Wybierz rasę z listy, żeby wyświetlić więcej informacji o kocie.');
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            loader.style.display = 'none';
        });
}

// Funkcja wypełniająca select opcjami ras kotów
function fillCatList(breeds) {
    breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
    });
}

// Inicjalizacja aplikacji po załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    initCatApp();
});