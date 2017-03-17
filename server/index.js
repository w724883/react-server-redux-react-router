import express from 'express';
import path from 'path';
import React from 'react';
import {RouterContext,match} from 'react-router';
import { Provider } from 'react-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import routes from '../src/routes';
import store from '../src/store';
import * as actions from '../src/actions';
import url from 'url';
var app = express();
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

app.get('/',(req, res) => {
  	match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    	if (err) {
      		res.status(500).end(`Internal Server Error ${err}`);
    	} else if (redirectLocation) {
      		res.redirect(redirectLocation.pathname + redirectLocation.search);
    	} else if (renderProps) {
      		Promise.all([
        	  store.dispatch(actions.fetchHome("page=1"))
	  		  ])
      		.then(() => {
        		var html = renderToString(
          			<Provider store={store}>
            			<RouterContext {...renderProps} />
          			</Provider>
        		);
      			res.render('home.ejs', {
      		        html:html,
      		        store:JSON.stringify(store.getState())
      		    },(error,tpl) => {
                res.send(tpl);
              });
        		});
    	} else {
      		res.status(404).end('Not found');
    	}
  	});
    // next();
});

app.get('/list', (req, res) => {
  const page = url.parse(req.url,true).query.page*1;
  res.render('test.ejs',{
    page
  },(error,html) => {
    res.send(html);
  });
});

