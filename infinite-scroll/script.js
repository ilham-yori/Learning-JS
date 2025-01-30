//API
const count = 10;
const apiKey = ``;
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//DOM
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

//Photo Array
let photosArray = [];

//Get Photo
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhoto();
        console.log(photosArray);
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

        //Linking Image With a href
        item.append(img);
        imageContainer.append(item);
    });
}

//On Load
getPhotos();

