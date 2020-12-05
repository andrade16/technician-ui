import React, { useState, useEffect, Component } from "react";
import mapboxgl from "mapbox-gl";
import { getTechnicians } from "../../services/SolarFarmService";
import "./TechnicianMap.scss";

const access_token =
  "pk.eyJ1Ijoid2lsbGlhbWFuZHJhZGUiLCJhIjoiY2o2OG9xMHIyMGpyeTM3bnlndmt5dDU1dSJ9.7sggpTuzSDmC61AZ2QoLnQ";
mapboxgl.accessToken = access_token;

let techIndex = 0;
let map;

class TechnicianMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -105,
      lat: 33,
      zoom: 4,
      technicianData: {},
      currentMarkers: []
    };
    this.loadData = this.loadData.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentDidMount() {
    this.loadData();
    setInterval(this.loadData, 60000);

    map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
  }


  loadData() {
    getTechnicians(techIndex).then((data) => {
      data.features.forEach((feature) => {
        const marker = new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map);
        const el = document.createElement("div");
        el.className = "marker";

      });
      this.setState({ technicianData: data });
      techIndex++;
    });
  }

  render() {
    const { technicianData } = this.state;

    return (
      <div style={{ width: "100%" }}>
        <div className="sidebarStyle">
          <div>
            Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
            {this.state.zoom}
          </div>
        </div>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}

/*function TechnicianMap(props) {


  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  });

  return (
      <div>
        <div className="map"></div>
      </div>
  );
}*/

export default TechnicianMap;
