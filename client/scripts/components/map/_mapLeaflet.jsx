/*
 * Leaflet raw map component used by ./map.jsx (use that if you want a map)
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');


// L.map -> (bounds -> ()) -> (event -> ())
function getSimpleBounds(map, boundsChangeHandler) {
  return function(/* leafletEvent */) {  // don't need anything from the event
    var Lbounds = map.getBounds(),
        simpleBounds = [
          [Lbounds.getNorth(), Lbounds.getEast()],
          [Lbounds.getSouth(), Lbounds.getWest()]
        ];
    boundsChangeHandler(simpleBounds);
  };
}

var currentBaseMap;
var currentLabels;

module.exports = React.createClass({

  componentDidMount: function() {
    var containerNode = this.getDOMNode();
    var mapOptions = {zoomControl: false};


    this.map = L.map(containerNode, mapOptions);
    this.map.addControl( L.control.zoom({position: 'topright'}) )
    containerNode.style.position = 'absolute';

    // send map events back to handlers in ./map.jsx
    if (this.props.onMapMove) {
      // `moveend` seems to cover all types of moves including zooms 
      this.map.on('moveend', getSimpleBounds(this.map, this.props.onMapMove));
    }

    // leaflet requires a view of the map to show
    if (this.props.bounds) {
       this.map.fitBounds(this.props.bounds);
    } else {
        this.map.fitWorld();
    }

    if (this.props.baseMap) {
       this.setBaseMap(this.props.baseMap);
    }

  },

  componentWillReceiveProps: function(nextProps) {
    debugger;
    if (nextProps.baseMap){
      console.log('MapView: Change Map '+nextProps.baseMap);
      this.setBaseMap(nextProps.baseMap);
    }
  },

  componentWillUnmount: function() {
    this.map.off();  // remove all event listeners
    this.map.remove();  // clean up the rest of the map stuff
    delete this.map;  // clear our ref so the map can be garbage collected
  },

  // () -> `L.map` instance or `undefined` if the component has not mounted yet
  getLeafletMap: function() {
    return this.map;
  },

   setBaseMap:function(basemap) {
    debugger;
    
    if (currentBaseMap) {
      this.map.removeLayer(currentBaseMap);
    }

    if (currentLabels) {
      //this.map.removeLayer(currentLabels);
    }

    
    currentBaseMap = L.esri.basemapLayer(basemap);
      this.map.addLayer(currentBaseMap);

    if (basemap === 'ShadedRelief' || basemap === 'Oceans' || basemap === 'Gray' || basemap === 'DarkGray' || basemap === 'Imagery' || basemap === 'Terrain') {
      //currentLabels = L.esri.basemapLayer(basemap + 'Labels');
      //this.map.addLayer(currentLabels);
    }

  },

  render: function() {
    return <div className="map react-leaflet-map"></div>
  }
});
