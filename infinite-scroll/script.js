//API
let count = 5;
const apiKey = 'ICVREL0_Mmhloon4eyzepKXO9_zPfQLCNK0CTN3sbOg';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//DOM
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

//Photo Array
let photosArray = [];

//Loader Variables
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//Check Image Loaded or Not
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

//Get Photo
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch Error Here
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Display Photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run Loop for Array
    photosArray.forEach((photo) => {
        //Binding to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        //Image Element
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //Event Listener for Loader
        img.addEventListener('load', imageLoaded);

        //Linking Image With a href
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


//Checker Scroll Element
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

//On Load
getPhotos();

