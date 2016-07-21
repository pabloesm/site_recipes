'use strict';

import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Handlebars from 'handlebars';
var toMarkdown = require('to-markdown');
import slug from 'slug'; // String processing

Backbone.$ = $;

// var PostModel = require('../../models/post');
//var PostCollection = require('../../collections/postCollection');

export default Backbone.View.extend({
	el: '#content',

	events: {
		'change .postSelector': 'newPostSelected',
		'click #update': 'updateForm',
	},

	initialize: function() {
		console.log('Edit view initialized.');
		this.collection.fetch({reset: true});

		this.listenTo(this.collection, 'reset', this.render);
	},

	render: function() {
		var source = $('#selectPost').html();
		var	template = Handlebars.compile(source);
		var data = {};
		data.arr = this.collection.map(function(model) {
			var obj = {title: model.get('title'),
									idReadable: model.get('idReadable'),
								};
			return obj;
		});

		this.$el.html(template(data));
	},

	newPostSelected: function(event) {
		var className = event.currentTarget.className;
		var value = $('.' + className).val();
		this.loadPostInfo(value);
	},

	loadPostInfo: function(idReadable) {
		if ($('.postInfo').length === 0) {
			var element = '<div class="postInfo"></div>';
			this.$el.append(element);
		}

		var post = this.collection.where({idReadable: idReadable})[0];
		this.renderPostInfo(post);
		this.model = post;
	},

	renderPostInfo: function(post) {
		var source = $('#updatePostTemplate').html();
		var	template = Handlebars.compile(source);

		var keywordsArr = post.get('keywords').map(function(val) {
			return val.keyword;
		});

		var keywords = keywordsArr.join(', ');

		var coordinatesArr = post.get('coordinates').map(function(val) {
			return val.coordinate;
		});

		var coordinates = coordinatesArr.join(', ');

		$('.postInfo').html(template());

		$('#title').val(post.get('title'));
		$('#body').val(toMarkdown(post.get('body')));
		$('#keywords').val(keywords);
		$('#postType').val(post.get('postType'));
		$('#address').val(post.get('address'));
		$('#phone').val(post.get('phone'));
		$('#url').val(post.get('url'));
		$('#coordinates').val(coordinates);
	},

	updateForm: function(e) {
		e.preventDefault;
		var data = {};

		$('#updateForm > div').children('textarea, input, select').each(function(i, el) {
			if ($(el).val() != '') {
				if (el.name === 'postType') {
					data[el.name] = $(el).val();
				} else {
					console.log(el.id);
					data[el.id] = $(el).val();
					if (el.id == 'title') {
						data.idReadable = slug($(el).val().toLowerCase());
					}
				}
			}

			//Clear input field values
			//$(el).val('');

		});

		$('#updateForm > div > fieldset').children('textarea, input').each(function(i, el) {
			if ($(el).val() != '') {
				data[el.id] = $(el).val();
			}
		});

		this.model.save(data);

	},

	collectionHere: function() {
		console.log('Yeah!');
	},
});

