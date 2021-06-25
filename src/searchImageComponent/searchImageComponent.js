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
      this.handleContentDisplay(document.querySelector('#dogSearchInput').value);
      // mivel a getImages egy async method, ezért ez is promise-al tér vissza
      // emiatt a promise object-en amit a getImages visszaad, elérhető a then() metódus
      // a then metódus bemeneti paramétere egy callback function, ami akkor fut le, amikor a promise beteljesül (akkor jön létre a data amit visszaad a getImages metódus)
      // ha az arrow function-ben csak egy bemeneti paraméter van, akkor a zárójel elhagyható

    });
  }

}

export default SearchImage;