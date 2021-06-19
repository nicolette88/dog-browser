import './css/style.css';
import './index.html';
import ListBreeds from './listBreedsComponent/listBreedsComponent';
import SearchImage from './searchImageComponent/searchImageComponent.js';


// separation of concerns

// const mySearchImage = new SearchImage();

new SearchImage();

// mySearchImage.getImage();
// mySearchImage.render();

new ListBreeds();