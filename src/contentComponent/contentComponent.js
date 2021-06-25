import '../css/contentComponent.css';
import yall from 'yall-js';
import preloading from '../img/preloading.gif';

// az export default ide is beírható, akkor a file végére már nem kell
export default class contentComponent {
  // ha van már kép megjelenítve, akkor azt töröljük
  clearContent() {
    const content = document.querySelector('#content');
    content.innerHTML = '';
  }

  clearErrors() {
    const errors = document.querySelector('.errors');
    errors.innerHTML = '';
  }

  // megjelenít egy hibaüzenetet a felhasználónak
  displayError(message) {
    this.clearErrors();
    const popupMessage = document.createElement('h2');
    popupMessage.classList.add('error-message');
    popupMessage.innerHTML = message;
    // <h2 class= "erroer-message">message</>
    document.querySelector('.errors').appendChild(popupMessage);
  }
  async getImages(dogbreed) {

    if (!dogbreed) {
      this.displayError('Nem lett beírva semmi a keresőbe, nem tudunk keresni!');
      // megállítjuk a getImages fügvény futását
      return;
    }

    let urlString = '';
    dogbreed = dogbreed.toLowerCase();
    dogbreed = dogbreed.split(' ');
    // a dogbreed változó most már egy tömb!
    if (dogbreed.length === 1) {
      urlString = `https://dog.ceo/api/breed/${dogbreed[0]}/images`;
    } else if (dogbreed.length === 2) {
      urlString = `https://dog.ceo/api/breed/${dogbreed[1]}/${dogbreed[0]}/images`;
    }
    const response = await fetch(urlString);
    const data = await response.json();
    // a data változó objecteket tartalmazó tömb
    return data;
  }

  // Ez a metódus megjelenít egy képet (véletlenszerűen)
  displayImage(data) {
    this.clearErrors();
    // this.clearContent();
    const image = document.createElement('img');
    let classes = image.classList.add('lazy');
    image.src = '../img/preloading.gif';
    // a data.message tömbből 1 véletlenszerű elemet kiválasztunk
    image.dataset.src = data.message[Math.floor(Math.random() * data.message.length)];
    document.querySelector('#content').appendChild(image);
    yall({
      events: {
        load: event => {
          if (event.target.nodeName === 'IMG' && !event.target.classList.contains('lazy')) {
            event.target.classList.add('yall-loaded');
          }
        }
      }
    });
    // console.log(data);
  }

  handleContentDisplay(searchTerm) {
    this.getImages(searchTerm).then(result => {
      // ha csak egy dolgot kell csinálni az if block-ban, akkor a  kódblokk {} elhagyható
      if (result) {
        const count = document.querySelector('#imageNumberInput').value;
        // console.log(parseInt(count));
        let parseCount = parseInt(count);
        // console.log(parseCount);
        // console.log(typeof (parseCount));

        // Kerekítés esetén így néz ki:
        // const mathFloorCount = Math.round(count);
        // console.log(mathFloorCount);

        if (isNaN(parseCount)) {
          parseCount = 1;
          // console.log('igaz a feltétel ' + parseCount);
        }
        // else {
        //   console.log('hamis a feltétel ' + parseCount);
        // }

        this.clearContent();

        // console.log('itt indul a ciklus');
        for (let i = 1; i <= parseCount; i++) {
          // console.log(i);
          this.displayImage(result);
        }
      }
    });
  }

  setSearchTerm(term) {
    document.querySelector('#dogSearchInput').value = term;
  }

}

