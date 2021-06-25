import '../css/searchImageComponent.css';
import ContentComponent from '../contentComponent/contentComponent.js';
import yall from 'yall-js';
import preloading from '../img/preloading.gif';

class SearchImage extends ContentComponent {

  constructor() {
    super();
    // példányosításkor, megjelenítjük a keresőt automatikusan
    this.render();
  }

  // ez a metódus letölti az adatot az API-ról
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

  // 2. feladat alapján bővítettem egy másik input field-del
  // megjeleníti a keresőt:
  render() {
    const markup = `
    <form class="dog-search">
      <span class="search-icon"></span>
      <input type="text" id="dogSearchInput">
      <input type="text" id="imageNumberInput" placeholder="1">
        <button>Search</button>
    </form>
    `;
    document.querySelector('#header').insertAdjacentHTML('beforeend', markup);
    // az arrow functionnek nincs saját this kulcsszava, tehát az arrow function-ön belül a this ugyanazt fogja jelenteni, mint azon kvül (a class-t amiben vagyunk)
    // console.log(this);
    // const self = this;
    document.querySelector('.dog-search button').addEventListener('click', (event) => {
      event.preventDefault();
      // console.log(this);
      // console.log(event);
      // self.getImage();
      const searchTerm = document.querySelector('#dogSearchInput').value;
      // mivel a getImages egy async method, ezért ez is promise-al tér vissza
      // emiatt a promise object-en amit a getImages visszaad, elérhető a then() metódus
      // a then metódus bemeneti paramétere egy callback function, ami akkor fut le, amikor a promise beteljesül (akkor jön létre a data amit visszaad a getImages metódus)
      // ha az arrow function-ben csak egy bemeneti paraméter van, akkor a zárójel elhagyható
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
    });
  }
}

export default SearchImage;