'use strict';

/**
 * Map View contains the Leaflet map
 * @param  {Object} App Global object
 */

//(function(App) {
  //var App = App || {};
  //App.View = App.View || {};

  class Map extends Backbone.View {

    defaults() {
      return {
        setCenter: [39.555, -9.72],
        defaultZoom: 6,
        tileLayer: 'https://stamen-tiles-d.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png',
        attributions: ``,
        setZoom: [6, 13],
        southWest: [34.6378936, -15.49],
        northEast: [43.9913218, 5.3277839],
        query: "SELECT * FROM spanish_adm2_provinces",
        cartocss: `#spanish_adm2_provinces {
              polygon-fill: #000000;
              polygon-opacity: 0.7;
              line-color: #FFF;
              line-width: 0.5;
              line-opacity: 1;
            }`
      };
    }

    commonOptions() {
      return {
        scrollWheelZoom: false,
        tileLayer: {
          continuousWorld: false,
          noWrap: true
        }
      };
    }

    initialize(options) {
      this.options = options;
      this.createMap();  
    }

    createMap() {
      const map = L.map(this.options.el, this.commonOptions()).
       setView(this.options.center || this.defaults().setCenter,
       this.options.defaultZoom || this.defaults().defaultZoom);

      this.setTileLayer().addTo(map);
      map.setMaxBounds(this.setBounds());
      L.control.scale().addTo(map);

      cartodb.createLayer(map, {
        user_name: 'albafjez',
        type: 'cartodb',
        sublayers: [{
          sql: this.options.query || this.defaults().query,
          cartocss: this.options.cartocss || this.defaults().cartocss,
        }]
      })
      .addTo(map);

      this.customizeMap(map);
    }

    setTileLayer() {
      return L.tileLayer(this.options.tileLayer || this.defaults().tileLayer, {
        attribution: this.options.attributions || this.defaults().attributions,
        subdomains: 'abcd',
        maxZoom: this.options.setZoom ? this.options.setZoom[1] : this.defaults().setZoom[1],
        minZoom: this.options.setZoom ? this.options.setZoom[0] : this.defaults().setZoom[0],
        maxBounds: this.setBounds(),
        scrollWheelZoom: false
      });
    }

    setBounds() {
      const southWest = this.options.bounds ? this.options.bounds.southWest : this.defaults().southWest;
      const northEast = this.options.bounds ? this.options.bounds.northEast : this.defaults().northEast;
      const bounds = L.latLngBounds(L.latLng(southWest[0], southWest[1]), L.latLng(northEast[0], northEast[1]));
      return bounds;
    }

    customizeMap(map) {}

  }

//window.App = App;

//})(window.App);

