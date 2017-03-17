import fetch from 'isomorphic-fetch';
import config from '../config';
export const fetchHome = (params) => {
	params = params || "";
	return (dispatch,state) => {
		return fetch(config.api.home+"?"+params,{
			mode:"cors"
		}).then(res => {
			return res.json();
		}).then(json => {
			if(typeof __CLIENT__ != 'undefined'){
				const home = state().home;
				if(home.data){
					json.data = home.data.concat(json.data);
				}
			}
			return dispatch({
		    	type: 'SET_HOME',
		    	data: json
		  	});
		});
	}
}
export const setLoading = (data) => {
	return (dispatch) => {
		return dispatch({
	    	type: 'SET_LOADING',
	    	data: data
	  	});
	}
}