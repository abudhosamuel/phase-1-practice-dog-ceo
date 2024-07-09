console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const dogImageContainer = document.getElementById('dog-image-container');
    const breedList = document.getElementById('dog-breeds');
    const breedDropdown = document.getElementById('breed-dropdown');

    // Function to fetch and display dog breeds
    function fetchDogBreeds() {
        fetch(breedUrl)
            .then(response => response.json())
            .then(data => {
                const breeds = Object.keys(data.message);
                breeds.forEach(breed => {
                    const li = document.createElement('li');
                    li.textContent = breed;
                    breedList.appendChild(li);
                    // Add click event listener to change font color
                    li.addEventListener('click', function() {
                        li.style.color = 'blue'; // Change color to your preferred choice
                    });
                });
            })
            .catch(error => console.error('Error fetching dog breeds:', error));
    }

    // Function to fetch and display dog images
    function fetchDogImages() {
        fetch(imgUrl)
            .then(response => response.json())
            .then(data => {
                data.message.forEach(imageUrl => {
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.alt = 'Dog Image';
                    dogImageContainer.appendChild(img);
                });
            })
            .catch(error => console.error('Error fetching dog images:', error));
    }

    // Function to filter breeds based on selected letter
    function filterBreeds(letter) {
        const lis = breedList.getElementsByTagName('li');
        Array.from(lis).forEach(li => {
            const breedName = li.textContent.toLowerCase();
            if (breedName.startsWith(letter)) {
                li.style.display = 'block'; // Show breed if it matches filter
            } else {
                li.style.display = 'none'; // Hide breed if it doesn't match filter
            }
        });
    }

    // Event listener for breed dropdown change
    breedDropdown.addEventListener('change', function() {
        const selectedLetter = this.value.toLowerCase();
        filterBreeds(selectedLetter);
    });

    // Load dog images and breeds on page load
    fetchDogImages();
    fetchDogBreeds();
});
