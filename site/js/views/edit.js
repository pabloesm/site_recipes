'use strict';

var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore'),
	slug = require('slug'); // String processing

require('../lib/backbone-model-file-upload.js');

var PostModel = require('../models/post'),
	PostCollection = require('../collections/postCollection');

Backbone.$ = $;

module.exports = Backbone.View.extend({
	el: '#newPost',

	events:{
		'click #add': 'addPost'
	},

	initialize: function(){
		console.log('edit view initialized.');

		this.collection = new PostCollection();
	},

	addPost: function(e){
		e.preventDefault;

		var data = new FormData();

		$('#addPost > div').children('textarea, input, select').each(function(i, el) {
			if ( $(el).val() != '' ) {
				if ( el.id === 'photoMain' || el.id === 'photoOthers') {
					$.each($(el)[0].files, function(file){
						data.append(el.id, this);
					});
				} else if (el.name === 'postType') {
					data.append(el.name, $(el).val());
				} else {
					console.log(el.id);
					data.append(el.id, $(el).val());
					if (el.id == 'title') {
						data.append('idReadable', slug($(el).val().toLowerCase()));
					}
				}
			}

			//Clear input field values
			//$(el).val('');

		});

		$('#addPost > div > fieldset').children('textarea, input').each(function(i, el) {
			if ( $(el).val() != '') {
				console.log(el.id);
				data.append(el.id, $(el).val());
			}
		});


		$.ajax({
			url: '../posts',
			type: 'POST',
			data: data,
			cache: false,
			contentType: false,
			processData: false,
			success: function() {
				console.log('Post info send to server.')
			}
		});

	return false;
	}

});

