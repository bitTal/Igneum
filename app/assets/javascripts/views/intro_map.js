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
    const month = this.getYearMonth().month + 1;
    const year = this.getYearMonth().year;

    return Object.assign( Map.prototype.defaults(), {
      markerCartocss: `#frs {
        marker-fill: red;
      }`,
      markerSql: `SELECT * from frs where EXTRACT(year FROM date) = ${year} 
        AND EXTRACT(month FROM date) = ${month}`
    });
  }

  customizeMap(map) {
    cartodb.createLayer(map, {
      user_name: 'albafjez',
      type: 'cartodb',
      sublayers: [{
        sql: this.options.markerSql || this.defaults().markerSql,
        cartocss: this.options.markerCartocss || this.defaults().markerCartocss
      }]
    })
    .addTo(map);
  }

  getYearMonth() {
    const date = new Date();

    return {
      year: date.getFullYear(),
      month: date.getMonth()
    };
  }

}

window.App = App;