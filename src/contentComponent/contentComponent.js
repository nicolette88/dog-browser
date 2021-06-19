import '../css/contentComponent.css';

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
}