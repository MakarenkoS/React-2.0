
import App from './App';
import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './redux/redux-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';



// setInterval(() => {
//   store.dispatch({ type: 'FAKE' })
// }, 1000);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);





serviceWorker.unregister();
