import express from 'express';
import path from 'path';
// var express = require('express');
// var path = require('path');
// var React = require('react');
// var reactRouter = require('react-router');
// var reactRedux = require('react-redux');
// var reactDomServer = require('react-dom/server');
// var routes = require('../src/routes');
// var setStore = require('../src/store');
// var RoutingContext = reactRouter.RoutingContext;
// var match = reactRouter.match;
// var Provider = reactRedux.Provider;
// var renderToString = reactDomServer.renderToString;
import React from 'react';
import {RouterContext,match} from 'react-router';
import { Provider } from 'react-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import routes from '../src/routes';
import store from '../src/store';
import * as actions from '../src/actions';
var app = express();
// var page = require("../output/server/components/home.js");
// var ejs = require('ejs');
app.use(express.static(path.join(__dirname, "..", "static")));
//指定模板引擎
app.set('view engine', 'ejs');
//指定模板位置
app.set('views', path.join(__dirname,'../src','templates'));
// app.get("/", function(req, res) {
// 	res.render('home.ejs', {
//         html:page
//     });
// });

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});

app.use((req, res) => {

  	match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    	if (err) {
      		res.status(500).end(`Internal Server Error ${err}`);
    	} else if (redirectLocation) {
      		res.redirect(redirectLocation.pathname + redirectLocation.search);
    	} else if (renderProps) {
      		Promise.all([
        		store.dispatch(actions.fetchHome())
	  		])
      		.then(() => {
        		var html = renderToString(
          			<Provider store={store}>
            			<RouterContext {...renderProps} />
          			</Provider>
        		);
        		console.log(html);
    			res.render('home.ejs', {
    		        html:html,
    		        store:JSON.stringify(store.getState())
    		    });
      		});
    	} else {
      		res.status(404).end('Not found');
    	}
  	});
});