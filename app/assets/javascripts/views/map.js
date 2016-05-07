'use strict';

/**
 * Map View contains the Leaflet map
 * @param  {Object} App Global object
 */

//(function(App) {
  var App = App || {};
  App.View = App.View || {};

  App.View.Map = Backbone.View.extend({

    initialize(options) {
      this.options = options;
      this.createMap();
    },

    createMap() {
      const map = L.map(this.options.el).
       setView(this.setCenter,
       6);

      this.setTileLayer().addTo(map);
      map.setMaxBounds(this.setBounds());
      L.control.scale().addTo(map);

      cartodb.createLayer(map, {
        user_name: 'albafjez',
        type: 'cartodb',
        sublayers: [{
          sql: this.query,
          cartocss: this.cartocss
        }]
      })
      .addTo(map);
    },

    setCenter: [39.555, -9.72],

    setTileLayer() {
      return L.tileLayer(this.tileLayer, {
        attribution: this.attributions,
        subdomains: 'abcd',
        maxZoom: this.setZoom[1],
        minZoom: this.setZoom[0],
        maxBounds: this.setBounds()
      });
    },

    tileLayer: 'https://stamen-tiles-d.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png',

    attributions: '&copy; "Map tiles by " <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',

    setZoom: [6, 13],

    setBounds() {
      const southWest = L.latLng(34.6378936, -15.49),
        northEast = L.latLng(43.9913218, 5.3277839),
        bounds = L.latLngBounds(southWest, northEast);
      return bounds;
    },

    query: "SELECT * FROM spanish_adm2_provinces",

    cartocss: `#spanish_adm2_provinces {
            polygon-fill: #000000;
            polygon-opacity: 0.7;
            line-color: #FFF;
            line-width: 0.5;
            line-opacity: 1;
          }`,

    layer: 'https://albafjez.cartodb.com/api/v2/viz/13197416-0f02-11e6-8e58-0e5db1731f59/viz.json',

    https: true
    
  });

window.App = App;

//})(window.App);

