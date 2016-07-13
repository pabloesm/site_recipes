'use strict';

import Backbone from 'backbone';
import $ from 'jquery';

Backbone.$ = $;

export default Backbone.Model.extend({
	idAttribute: '_id',

	// urlRoot : 'api/posts/expressjs',

	defaults: {
		title: 'Default title',
		body: 'Default body',
		keywords: 'Default keyword'
	}

});

