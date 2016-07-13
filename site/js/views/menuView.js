'use strict';

import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

Backbone.$ = $;


export default Backbone.View.extend({
	events: {
		'click a': 'toggleActive'
	},

	initialize: function() {
		$('#item-home > a').addClass('active');
	},

	toggleActive: function(e) {
		$('.active').toggleClass('active');
		$(e.target).toggleClass('active');
	}

});
