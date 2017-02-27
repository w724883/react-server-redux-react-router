import React,{Component} from 'react';
// import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
// import 'babel-polyfill';

class App extends Component{
	render(){
		let {state,dispatch} = this.props;
		// let boundActionCreators = bindActionCreators(Actions, dispatch);
		return (
			<div>
				{this.props.children}
			</div>
		);
	}

}

App = connect((state) => ({state}))(App);

export default App;
