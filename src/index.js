document.addEventListener('DOMContentLoaded', () => {
  addDogs();
  addBreeds();
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
    console.log('im in the else')
    addBreedElement(breed[0])
  }
}

const addBreedElement = (breedName) => {
  const breedList = document.querySelector('#dog-breeds')
  const breedEl = document.createElement('li');
  breedEl.textContent = breedName;
  breedList.appendChild(breedEl)
}
