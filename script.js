const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let readyToFetchPhotos = false;
let imagesLoaded = 0;
let totalImages = 0;
let fetchedPhotos = [];
let initialLoad = true;
//unsplash API
let countOfPhotos = 5;
const apiKey = config.apiKey;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${countOfPhotos}`;

//checking for loading  of all images
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    readyToFetchPhotos = true;
    loader.hidden = true;
    initialLoad = false;
    countOfPhotos = 30;
  }
}

//function to set attributes on DOM
function setAttributes(element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
//create DOM Elements for each photo
function createDOMElement(el, arguments) {
  const newDOMELement = document.createElement(el);
  setAttributes(newDOMELement, arguments);
  return newDOMELement;
}

//create elements for Elements

function displayFetchedPhotos() {
  imagesLoaded = 0;
  totalImages = fetchedPhotos.length;
  fetchedPhotos.forEach((photo) => {
    //create <a></a> to link unsplash
    const anchorItem = createDOMElement("a", {
      href: photo.links.html,
      target: "_blank",
    });

    //create <img> for photos

    const image = createDOMElement("img", {
      src: photo.urls.regular,
      alt: photo.alt_decription,
      title: photo.alt_decription,
    });

    //checking for loading images
    image.addEventListener("load", imageLoaded);
    anchorItem.appendChild(image);
    imageContainer.appendChild(anchorItem);
  });
}
//get photos from Unsplash API

async function getPhotosFromUnsplash() {
  try {
    const response = await fetch(apiUrl);
    fetchedPhotos = await response.json();
    displayFetchedPhotos();
  } catch (error) {
    console.log(error);
    document.write(error);
  }
}

window.addEventListener("scroll", () => {
  //condition that should be met to get photos fetched.
  let conditionMet =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    readyToFetchPhotos;

  if (conditionMet) {
    readyToFetchPhotos = false;
    getPhotosFromUnsplash();
  }
});
getPhotosFromUnsplash();
