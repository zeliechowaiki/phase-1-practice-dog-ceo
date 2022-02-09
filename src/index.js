console.log('%c HI', 'color: firebrick')
const dogImageContainer = document.getElementById('dog_image_container');
const dogBreedList = document.getElementById('dog-breeds');
const letterDropdown = document.getElementById('breed-dropdown');

function fetchImages(){
    fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(resp => resp.json())
    .then((images) => {
        images.message.map(dogImage => renderDogImage(dogImage));
    })
}
fetchImages();

function renderDogImage(dog){
    const img = document.createElement('img')
    img.src=dog;
    dogImageContainer.appendChild(img);
}

function fetchBreeds(){
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp => resp.json())
    .then((breeds) => {
        dogBreedArray = Object.keys(breeds.message)
        renderDogBreeds(dogBreedArray);
    })
}
fetchBreeds();

function renderDogBreeds(dogs){
    dogs.map((dogBreed) => {
        const li = document.createElement('li');
        li.textContent = dogBreed;
    dogBreedList.appendChild(li);
    li.addEventListener('click', listClick);
    })
}

function listClick (e) {
    if (!e.target.classList.contains('clicked')) {
        e.target.classList.add('clicked');
    }
    else {
        e.target.classList.remove('clicked');
    }
}

letterDropdown.addEventListener('change', function(e) {
    const letter = e.target.value;
    const newDogList = filterDogs(letter);
    dogBreedList.innerHTML = '';
    renderDogBreeds(newDogList);
})

function filterDogs(letter) {
    return dogBreedArray.filter(breed => breed.startsWith(letter));
}