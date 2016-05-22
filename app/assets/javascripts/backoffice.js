//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require underscore
//= require backbone
// require_tree ../templates
// require_tree ./models
// require_tree ./collections
// require_tree ./routers

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