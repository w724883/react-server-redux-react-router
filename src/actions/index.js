import fetch from 'isomorphic-fetch';

export const fetchHome = (data) => {
	return (dispatch) => {
		return fetch('http://localhost:1024/home').then(res => res.json()).then(json => dispatch({
		    	type: 'SET_HOME',
		    	data: json
		  	})
		);
	}
}
