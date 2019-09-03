import React from 'react';
import ReactDOM from 'react-dom';

import Firebase from './shared/Firebase';
import FirebaseContext from './components/FirebaseContext';

import App from './App';

// Udostępnienie obiektu Firebase całej aplikacji, dostęp do zalogowanego użytkownika, do bazy danych i różnych pomocniczych funkcji
ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);
