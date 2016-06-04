//= require ./map

'use strict';

/**
 * Intro_Map View contains the Leaflet map
 * @param  {Object} App Global object
 */

class Intro_Map extends Map{

  defaults() {
    const month = this.options.month || this.getYearMonth().month + 1;
    const year = this.options.year || this.getYearMonth().year;

    return Object.assign( Map.prototype.defaults(), {
      markerCartocss: `#frs {
        marker-fill: red;
      }`,
      markerSql: `SELECT * from frs where EXTRACT(year FROM date) = ${year} 
        AND EXTRACT(month FROM date) = ${month}`
    });
  }

  customizeMap(map) {
    const self = this;

    cartodb.createLayer(map, {
      user_name: 'albafjez',
      type: 'cartodb',
      sublayers: [{
        sql: this.options.markerSql || this.defaults().markerSql,
        cartocss: this.options.markerCartocss || this.defaults().markerCartocss,
        interactivity: 'town, cod_prov'
      }]
    })
    .addTo(map)
    .on('done', function(layer) {
      layer.setInteraction(true);
      layer.on('featureClick', function(e, latlng, pos, data) {
        self.popUp(latlng, data, map);
      });
    });
  }

  popUp(latlng, data, map){
    const latlng1 = L.latLng(latlng[0], latlng[1]);
    const sql = new cartodb.SQL({ user: 'albafjez' });
    const query = `SELECT nom_prov FROM spanish_adm2_provinces WHERE cod_prov='${data.cod_prov}'`;

    sql.execute(query, { id: 3 })
      .done(function(dataRows) {
        const nom_prov = dataRows.rows[0].nom_prov;
        const message = `<h1 class="title">${data.town}</h1>
          <h2 class="claim">${nom_prov}</h2>`;

        L.popup()
          .setLatLng(latlng1)
          .setContent(message)
          .openOn(map);
    });
  }

  getYearMonth() {
    const date = new Date();

    return {
      year: date.getFullYear(),
      month: date.getMonth()
    };
  }
}

