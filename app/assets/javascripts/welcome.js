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

    /**
     * Function to start the application
     */
    _start: function() {
      const path = window.location.pathname;

      if(path === '/') {
        new Intro_Map({el: 'map'});
      }
      else if (path === '/month') {
        new Intro_Map({el: 'map'});
      }
      else if (path === '/compare') {
        new Map({el: 'map1', query: this._compare_query('05', '2016', '05', '2015'), 
          cartocss: this._compare_cartocss(), defaultZoom : 3});
        new Map({el: 'map2', query: this._compare_query('5', '2015', '5', '2016'), 
          cartocss: this._compare_cartocss(), defaultZoom : 3});
      }
    }

  });

  function onReady() {
    new WelcomeView();
  }

  //document.addEventListener('DOMContentLoaded', onReady);
  $(document).ready(onReady);
  $(document).on('page:load', onReady);

})(window);
