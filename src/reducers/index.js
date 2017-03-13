import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';


const home = (state = {}, action) => {
	switch (action.type) {
		case 'SET_HOME':
			return action.data;break;
		default:
      		return state;
	}
}
const list = (state = {}, action) => {
	switch (action.type) {
		case 'SET_LIST':
			return action.data;break;
		default:
      		return state;
	}
}
// const loading = (state = false, action) => {
// 	switch (action.type) {
// 		case 'SET_LOADING':
// 			return action.data;break;
// 		default:
//       		return state;
// 	}
// }
// export default (state = {}, action) => {
//   	return {
// 	    home: home(state, action),
// 	    list: list(state, action)
//   	};
// }
export default combineReducers({
	home,
	list,
	// loading,
	routing: routerReducer
});

