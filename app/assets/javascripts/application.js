// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require underscore
//= require backbone
// require igneum
// require views/map
// require_tree ../templates
// require_tree ./models
// require_tree ./collections
// require_tree ./routers
//= require welcome

//= require jquery2
//= require_self


'use strict';

(function(root) {
  var App = root.App;

  var ApplicationView = Backbone.View.extend({

    /**
     * This function will be executed when the instance is created
     */
    initialize: function() {
      this._start();
    },

    /**
     * Function to start the application
     */
    _start: function() {
      //new App.View.Map({el: 'map'});
    }
  });

  function onReady() {
    //new ApplicationView({ el: document.body });
  }

  document.addEventListener('DOMContentLoaded', onReady);

})(window);