import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { mapConfig, LAYER_ID } from "./mapConfig";
import { getTimeFromEpoch } from "../../utils/utils";
import "./TechnicianMap.scss";

mapboxgl.accessToken = mapConfig.access_token;

function TechnicianMap(props) {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    const { data } = props;
    let geoJson = { type: "FeatureCollection", features: [] };

    // set data features
    if (data.features) {
      geoJson.features = data.features;
    }

    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapConfig.mapStyle,
        logoPosition: "top-left",
        attributionControl: false,
      });

      // set map bounds
      if (geoJson.features.length) {
        const bounds = new mapboxgl.LngLatBounds();
        geoJson.features.forEach((feature) => {
          bounds.extend(feature.geometry.coordinates);
        });
        map.fitBounds(bounds, { maxZoom: 14, duration: 2000 });
      }

      map.addControl(
        new mapboxgl.NavigationControl({ position: "bottom-right" })
      );
      map.addControl(
        new mapboxgl.ScaleControl({ maxWidth: 100, unit: "metric" })
      );
      map.addControl(new mapboxgl.AttributionControl({ compact: true }));

      map.on("load", () => {
        map.addSource(LAYER_ID, { type: "geojson", data: geoJson });
        map.addLayer(mapConfig.layer);
        map.getSource(LAYER_ID).setData(geoJson);
        map.resize();
        setMap(map);
      });

      map.on("click", LAYER_ID, (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;
        const popup = new mapboxgl.Popup({ offset: 15 })
          .setLngLat(coordinates)
          .setHTML(
            "<h3>" +
              properties.name +
              "</h3>" +
              "<h4>" +
              getTimeFromEpoch(properties.tsecs) +
              "</h4>"
          )
          .addTo(map);
      });


      // fly to functionality from drawer
      const listElements = document.getElementsByClassName('tech-list-item');
      if (listElements) {
        for (let i=0; i<listElements.length; i++) {
          listElements[i].addEventListener('click', () => {
            const index = parseInt(listElements[i].dataset.index);
            map.flyTo({center: data.features[index].geometry.coordinates})
          })
        }
      }
    };

    const updateMap = ({ setMap }) => {
      // remove the marker layer to update map with new marker locations
      map.removeLayer(LAYER_ID);

      // remove any open popups
      const popups = document.getElementsByClassName("mapboxgl-popup");
      if (popups[0]) popups[0].remove();

      map.addLayer(mapConfig.layer);
      map.getSource(LAYER_ID).setData(geoJson);
      setMap(map);
    };

    if (!map) {
      initializeMap({ setMap, mapContainer });
    } else {
      updateMap({ setMap });
    }

  }, [props.data]);

  return (
    <div style={{ width: "100%" }}>
      <div
        ref={(el) => (mapContainer.current = el)}
        className="map-container"
      />
    </div>
  );
}

export default TechnicianMap;
