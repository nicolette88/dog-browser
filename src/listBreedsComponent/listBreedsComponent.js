import '../css/listBreedsComponent.css';
import ContentComponent from '../contentComponent/contentComponent.js';

class ListBreeds extends ContentComponent {
  constructor() {
    super();
    this.render();
    // Ha volt valami tartalom az előző programfuttatásból, akkor azt itt kitörlöm. A tesztelés miatt is fontos volt betennem, így benne hagyom.
    localStorage.removeItem('dogs');
  }

  // 3. feladat

  getResults(results) {
    let dogs = [];
    for (let breed in results.message) {
      if (results.message[breed].length !== 0) {
        for (const subBreed of results.message[breed]) {
          dogs.push(subBreed + ' ' + breed);
        }
      } else {
        dogs.push(breed);
      }
    }
    localStorage.setItem('dogs', JSON.stringify(dogs));
  }

  async getFullList() {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    if (response.status === 404) {
      this.displayError('Page not found!');
      return;
    }
    const data = await response.json();
    return data;
  }

  createListItem(title) {
    const item = document.createElement('div');
    item.classList.add('breed-list-item');
    item.innerHTML = title;
    item.addEventListener('click', () => {
      this.handleContentDisplay(title);
      this.setSearchTerm(title);
    });
    document.querySelector('#content').appendChild(item);
  }

  displayList(results) {
    if (results === null) {
      const storedDogs = JSON.parse(localStorage.getItem('dogs'));
      for (let i = 0; i <= storedDogs.length; i++) {
        this.createListItem(storedDogs[i]);
      }
    }
    else {
      this.getResults(results);
      // a result.message egy object, amin végig megyünk key:value páronként
      for (let breed in results.message) {
        // ha a value (ami egy tömb) hossza nem nulla
        if (results.message[breed].length !== 0) {
          // akkor végigmegyünk a tömbön, és kiírjuk a fajtákat, alfajjal együtt
          for (const subBreed of results.message[breed]) {
            this.createListItem(subBreed + ' ' + breed);
            // minden alfaj mögé odaírjuk a főfaj nevét pl. afghan hound
          }
        } else {
          // ha nincs alfaj (a tömb hossza nulla), akkor csak a főfajt jelenítjük meg
          this.createListItem(breed);
        }
      }
    }
  }

  render() {
    const button = document.createElement('button');
    button.classList.add('list-button');
    button.innerHTML = 'List Breeds';
    // a button html elemnek van onclick attribútuma
    button.onclick = () => {
      this.clearContent();
      // short circuit evaluation
      if (localStorage.getItem('dogs') === null) {
        this.getFullList().then(results => {
          results && this.displayList(results);
        });
        console.log('localStorage üres');
      }
      else {
        this.displayList(null);

        console.log('a dogs benne van a localStorage-ban');
      }
    };
    document.querySelector('#header').appendChild(button);
  }
}

export default ListBreeds;