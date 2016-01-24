'use strict';

var Backbone = require('backbone');
var	$ = require('jquery');
var	_ = require('underscore');
var	slug = require('slug'); // String processing
var Handlebars = require('handlebars');

require('../../lib/backbone-model-file-upload.js');

// var PostModel = require('../../models/post');
var PostCollection = require('../../collections/postCollection');

Backbone.$ = $;

module.exports = Backbone.View.extend({
	el: '#content',

	events:{
		'click #add': 'addForm',
	},

	initialize: function() {
		console.log('Add view initialized.');

		this.collection = new PostCollection();
		this.render();
	},

	render: function() {
		var source = $('#addPostTemplate').html();
		var	template = Handlebars.compile(source);

		this.$el.html(template());
	},

	addForm: function(e) {
		e.preventDefault;

		var data = new FormData();

		$('#addForm > div').children('textarea, input, select').each(function(i, el) {
			if ($(el).val() != '') {
				if (el.id === 'photoMain' || el.id === 'photoOthers') {
					$.each($(el)[0].files, function(file) {
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

		$('#addForm > div > fieldset').children('textarea, input').each(function(i, el) {
			if ($(el).val() != '') {
				console.log(el.id);
				data.append(el.id, $(el).val());
			}
		});

		$.ajax({
			url: '../api/posts',
			type: 'POST',
			data: data,
			cache: false,
			contentType: false,
			processData: false,
			success: function() {
				console.log('Post info send to server.');
			},
		});

		return false;
	},

});

