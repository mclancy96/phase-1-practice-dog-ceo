document.addEventListener('DOMContentLoaded', () => {
  addDogs();
  addBreeds();
  buildOutFilter();
  addOptionListener();
})

const addDogs = () => {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
      const images = data.message
      images.forEach(addDogImage)
    })
    .catch(error => console.error('Error fetching dog images:', error));
}

const addDogImage = (image) => {
  const dogContainer = document.querySelector('#dog-image-container')
  const imageEl = document.createElement('img')
  imageEl.src = image
  dogContainer.appendChild(imageEl)
}

const addBreeds = () => {
  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  fetch(breedUrl)
    .then(resp => resp.json())
    .then(data => {
      const breeds = data.message;
      Object.entries(breeds).forEach(parseBreedElements)
    })
}

const parseBreedElements = (breed) => {
  if (breed[1].length > 0) {
    breed[1].forEach(subname => addBreedElement(`${breed[0]} - ${subname}`))
  } else {
    addBreedElement(breed[0])
  }
}

const addBreedElement = (breedName) => {
  const breedList = document.querySelector('#dog-breeds')
  const breedEl = document.createElement('li');
  breedEl.textContent = breedName;
  breedEl.addEventListener('click', () => breedEl.style.color = 'red')
  breedList.appendChild(breedEl)
}

const buildOutFilter = () => {
  const filter = document.querySelector('#breed-dropdown');
  const lowerCaseLetters = ['e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  lowerCaseLetters.forEach(letter => {
    const letterEl = document.createElement('option')
    letterEl.value = letter
    letterEl.textContent = letter
    filter.appendChild(letterEl)
  })
  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = 'All';
  allOption.selected = true
  filter.insertBefore(allOption, filter.firstChild);
}

const addOptionListener = () => {
  const filter = document.querySelector('#breed-dropdown');
  const options = filter.querySelectorAll('option')
  options.forEach(option => {
    option.addEventListener('click', filterOptions)
  })
}

function filterOptions() {
  const breeds = document.querySelector('#dog-breeds').querySelectorAll('li')
  const filteredLetter = this.value
  breeds.forEach(breed => {
    if (filteredLetter === 'all') {
      breed.removeAttribute('hidden')
    } else {
      if (breed.textContent[0] !== filteredLetter) {
        breed.setAttribute('hidden', true)
      } else {
        breed.removeAttribute('hidden')
      }
    }
  })
}
