//API
let count = 10;
const apiKey = 'API_KEY';
let apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

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
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhoto();
    } catch (error) {
        //Catch Error Here
    }
}

function setAttribute(element, attribute) {
    for(const key in attribute){
        element.setAttribute(key, attribute[key]);
    }
}

//Display Photos
function displayPhoto() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run Loop for Array
    photosArray.forEach((photo)=>{
        //Binding to Unsplash
        const item = document.createElement('a');
        setAttribute(item,{
            href: photo.links.html,
            target: '_blank',
        });

        //Image Element
        const img = document.createElement('img');
        setAttribute(item,{
            src: photo.url.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //Event Listener for Loader
        img.addEventListener('load', imageLoaded);

        //Linking Image With a href
        item.append(img);
        imageContainer.append(item);
    });
}


//Checker Scroll Element
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

//On Load
getPhotos();

