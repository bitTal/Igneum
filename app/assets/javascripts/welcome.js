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
// require_tree ../templates
// require_tree ./models
// require_tree ./collections
// require_tree ./views
// require_tree ./routers
// require_tree .
//= require ./views/intro_map
//= require ./views/map


'use strict';

(function(root) {
  var App = root.App;

  var WelcomeView = Backbone.View.extend({

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
      const path = window.location.pathname;
      const canariasBounds = {
        bounds: {
          southWest: [27.577712,-18.974939], 
          northEast: [29.479091,-13.06742]
        },
        center: [28.09973, -15.41343]
      };

      if(path === '/') {
        this.setRootMaps(canariasBounds, {
          tileLayer: 'http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg',
          subdomains: '1234'
        });
      }
      else if (path === '/month') {
        this.setMonthMaps(canariasBounds, {
          tileLayer: 'http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg',
          subdomains: '1234'
        });
      }
      else if (path === '/compare') {
        this.setCompareMaps(canariasBounds);
      }
    },

    setRootMaps(canariasBounds) {
      const paramsMap = arguments.length > 1 ? Object.assign({el: 'map'}, arguments[1]) : {el: 'map'};
      const paramsMiniMap = arguments.length > 1 ? Object.assign({el: 'mini-map'}, canariasBounds, arguments[1]) : Object.assign({el: 'mini-map'}, canariasBounds);

      const introPeninsula = new Intro_Map(paramsMap);
      const introCanarias = new Intro_Map(paramsMiniMap);
    },

    setMonthMaps(canariasBounds) {
      const date1 = this._getMonthDate('month1', 'year1');
      const date1Object = { month: date1.month, year: date1.year };
      const paramsMap = arguments.length > 1 ? Object.assign({el: 'map'}, date1Object, arguments[1]) : Object.assign({el: 'map'}, date1Object);
      const paramsMiniMap = arguments.length > 1 ? Object.assign({el: 'mini-map'}, date1Object, canariasBounds, arguments[1]) : Object.assign({el: 'mini-map'}, date1Object, canariasBounds);

      const monthPeninsula = new Intro_Map(paramsMap);
      const introCanarias = new Intro_Map(paramsMiniMap);
    },

    setCompareMaps(canariasBounds) {
      const dates = this._getCompareDates();
      const generalSettings = {
        cartocss: this._compare_cartocss(),
        popup: true
      };
      const settings1 = {
        query: this._compare_query(dates.month1, dates.year1, dates.month2, dates.year2), 
      };
      const settings2 = {
        query: this._compare_query(dates.month2, dates.year2, dates.month1, dates.year1), 
      };
        
      const compareMap1 = new Map(Object.assign({el: 'map1', defaultZoom : 3}, settings1, generalSettings));
      const compareCanarias1 = new Map(Object.assign({el: 'mini-map1', defaultZoom : 7}, settings1, canariasBounds, generalSettings));
      const compareMap2 = new Map(Object.assign({el: 'map2', defaultZoom : 3}, settings2, generalSettings));
      const compareCanarias2 = new Map(Object.assign({el: 'mini-map2', defaultZoom : 7}, settings2, canariasBounds, generalSettings));
    },

     _compare_query(month1, year1, month2, year2) {
      return `with q as (SELECT p.the_geom, p.the_geom_webmercator, p.nom_prov, p.cod_prov,  
        (SELECT COUNT(z.cod_prov) FROM frs z
        WHERE EXTRACT(month FROM date) = '${month1}' AND
        EXTRACT(year FROM date) = '${year1}' and p.cod_prov=z.cod_prov) as a, 
        (SELECT COUNT(y.cod_prov) FROM frs y
        WHERE EXTRACT(month FROM date) = '${month2}' AND
        EXTRACT(year FROM date) = '${year2}' and p.cod_prov=y.cod_prov) as b
         FROM spanish_adm2_provinces p left join frs f on p.cod_prov=f.cod_prov
        group by p.nom_prov, p.cod_prov, p.the_geom, p.the_geom_webmercator)

        select case when a > b then 2
              when a = 0 and b = 0 then -1
              when a = 0 and b != 0 then -1
              when a = b then 1
              when a < b then 0
              else -1 end as e, the_geom, the_geom_webmercator, nom_prov, a, b from q`;
    },

    _compare_cartocss() {
      return `#spanish_adm2_provinces{
          polygon-fill: #229A00;
          polygon-opacity: 1;
          line-color: #000000;
          line-width: 0.5;
          line-opacity: 1;
        }

        var-r: 2;

        #spanish_adm2_provinces [ e = 2 ] {
           polygon-fill: #850200;
        }

        #spanish_adm2_provinces [ e = 0 ] {
           polygon-fill: #FFCC00;
        }

        #spanish_adm2_provinces [ e = 1 ] {
           polygon-fill: #FF6600;
        }

        #spanish_adm2_provinces [ e = -1 ] {
           polygon-fill: #888;
        }`;
    },

    _getMonthDate(key1, key2) {
      let clearParams = {},
        month = new Date().getMonth() + 1,
        year = new Date().getFullYear(),
        exist = false;

      let params = window.location.search.substr(1).split('&').map(param => {
        const aux = param.split('=');
        clearParams[aux[0]] = aux[1];
      });

      if (Object.keys(clearParams).indexOf(key1) !== -1 &&
        Object.keys(clearParams).indexOf(key2) !== -1){
        month = clearParams[key1];
        year = clearParams[key2];
        exist = true;
      }
      return {month, year, exist};
    },

    _getCompareDates() {
      const date1 = this._getMonthDate('month1', 'year1');
      const date2 = this._getMonthDate('month2', 'year2');
      let dates = {month1: date1.month, year1: date1.year,
        month2: date2.month, year2: date2.year};

      if (date1.exist && date2.exist) {
        return Object.assign(dates, {error: false});
      }
      else return Object.assign(dates, {error: true});
    }

  });

  function onReady() {
    new WelcomeView();
  }

  //document.addEventListener('DOMContentLoaded', onReady);
  $(document).ready(onReady);
  $(document).on('page:load', onReady);

})(window);
