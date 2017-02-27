import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router,browserHistory } from 'react-router';
import routes from '../src/routes';
import store from '../src/store';
console.log(store.getState());
// import { createStore } from 'redux';
// import reducers from './reducers';
// import { Router, browserHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';

// const store = createStore(reducers);
// const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router routes={routes} history={browserHistory} />
    </Provider>,
    document.getElementById('app')
);
