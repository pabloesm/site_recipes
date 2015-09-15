'use strict';

var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore'),
	slug = require('slug');

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

		$('#addPost div').children(['textarea']['input']).each(function(i, el) {
			if ( $(el).val() != '' ) {
				if ( el.id === 'photoMain' || el.id === 'photoOthers') {
					$.each($(el)[0].files, function(file){
						data.append(el.id, this);
					});
				} else {
					data.append(el.id, $(el).val());
					if (el.id == 'title') {
						data.append('idReadable', slug($(el).val()));
					}
				}
			}

			//Clear input field values
			$(el).val('');
		});

		$.ajax({
			url: 'posts',
			type: 'POST',
			data: data,
			cache: false,
			contentType: false,
			processData: false,
			success: function() {
				console.log('fuck yeah!')
			}
		});


	}


});

