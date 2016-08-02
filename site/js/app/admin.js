// Entry point for admin (add and edit content)

'use strict';

import Backbone from 'backbone';
import $ from 'jquery';

import Auth0Lock from 'auth0-lock';

Backbone.$ = $;

import AdminMainView from '../views/admin/main';

var lock = null;

$(function() {
	new AdminMainView();

	lock = new Auth0Lock('Fe5Sdsvbkgjgg66v17vhNWQRpXPtgqQV', 'pabloesm.eu.auth0.com', {
		auth: {
			params: { scope: 'openid email' }, //Details: https://auth0.com/docs/scopes
		},
	});

	$('.btn-login').click(function(e) {
		e.preventDefault();
		lock.show();
	});

	lock.on('authenticated', function(authResult) {
		lock.getProfile(authResult.idToken, function(error, profile) {
			if (error) {
				// Handle error
				console.log('Authentication error on admin.js.');
				return;
			}

			console.log('Authentication performed right on admin.js.');
			localStorage.setItem('token', authResult.idToken);
			console.log(localStorage.getItem('token'));
		});
	});

	// Add token to each request, if the token exist
	$(document).ajaxSend(function(event, request) {
	  var token = localStorage.getItem('token');
	  if (token) {
	    request.setRequestHeader('token', token);
	  }
	});


});
