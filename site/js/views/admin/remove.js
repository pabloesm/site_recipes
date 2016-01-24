'use strict';

var Backbone = require('backbone');
var	$ = require('jquery');
var	_ = require('underscore');
var Handlebars = require('handlebars');

Backbone.$ = $;

module.exports = Backbone.View.extend({
	el: '#content',

	events: {
		'change .postSelector': 'newPostSelected',
		'click #delete': 'deletePost',
	},

	initialize: function() {
		console.log('Remove view initialized.');
		this.collection.fetch({reset: true});

		this.listenTo(this.collection, 'reset', this.render);
	},

	render: function() {
		this.$el.html('Remove view!');

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
		this.deletePost();
	},

	loadPostInfo: function(idReadable) {
		if ($('.postInfo').length === 0) {
			var element = '<div class="postInfo"></div>';
			this.$el.append(element);
		}

		var post = this.collection.where({idReadable: idReadable})[0];
		this.model = post;
	},

	deletePost: function() {
		console.log('Post almost deleted...');

		this.model.destroy();

		// $.ajax({
		// 	url:'/api/posts/' + this.model.id,
		// 	type: 'DELETE',
		// 	contentType: 'application/json',
		// 	success:function(data, textStatus, jqXHR) {
		// 		console.log('Post deleted.');
		// 	},
		// });
	},

});

