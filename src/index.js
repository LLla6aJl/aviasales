import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/app/App';
import store from './services/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
function update() {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

store.subscribe(update);

update();
