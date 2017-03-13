import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router,browserHistory } from 'react-router';
import routes from '../src/routes';
import store from '../src/store';
import 'babel-polyfill';
// import { createStore } from 'redux';
// import reducers from './reducers';
// import { Router, browserHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';

// const store = createStore(reducers);
// const history = syncHistoryWithStore(browserHistory, store);
store.subscribe(() => {
	let _state = store.getState();
	console.log(_state)
});

render(
    <Provider store={store}>
        <Router routes={routes} history={browserHistory} />
    </Provider>,
    document.getElementById('app')
);
