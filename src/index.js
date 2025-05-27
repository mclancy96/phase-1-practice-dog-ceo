const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
document.addEventListener('DOMContentLoaded', () => {
  addDogs()
})

const addDogs = () => {
  const dogContainer = document.querySelector('#dog-image-container')
  fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
      const images = data.message
      images.forEach((image) => {
        const imageEl = document.createElement('img')
        imageEl.src = image
        dogContainer.appendChild(imageEl)
      })
    })
    .catch(error => console.error('Error fetching dog images:', error));

}
