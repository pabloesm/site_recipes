// Entry point for admin (add and edit content)

'use strict';

import Backbone from 'backbone';
import $ from 'jquery';

Backbone.$ = $;

import AdminMainView from '../views/admin/main';

$(function() {
	new AdminMainView();
});
