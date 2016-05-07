//= require ./map

'use strict';

/**
 * Intro_Map View contains the Leaflet map
 * @param  {Object} App Global object
 */

var App = App || {};
App.View = App.View || {};

App.View.Map = class Intro_Map extends Map{

  defaults() {
    return Object.assign( Map.prototype.defaults(), {
      markerCartocss: `#frs {
        marker-fill: red;
      }`
    });
  }

  customizeMap(map) {
    cartodb.createLayer(map, {
      user_name: 'albafjez',
      type: 'cartodb',
      sublayers: [{
        sql: "SELECT * FROM frs",
        cartocss: this.options.markerCartocss || this.defaults().markerCartocss
      }]
    })
    .addTo(map);
  }

}

window.App = App;