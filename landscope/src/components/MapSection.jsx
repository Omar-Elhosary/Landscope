/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { updateZoom, updateCoords, updateCenter } from "../store/MapSlice";
import { useDispatch, useSelector } from "react-redux";
import { feature } from "@turf/turf";
import { setBbox } from "../store/SceneSlice";

function getSquareCorners(centerLat, centerLon) {
  const latOffset = 45 / 111320; // 1 degree latitude ~ 111 km
  const lonOffset = 45 / (111320 * Math.cos(centerLat)); // 1 degree longitude varies

  return [
    [centerLon - lonOffset, centerLat - latOffset],
    [centerLon + lonOffset, centerLat - latOffset],
    [centerLon + lonOffset, centerLat + latOffset],
    [centerLon - lonOffset, centerLat + latOffset],
    [centerLon - lonOffset, centerLat - latOffset],
  ];
}

const findSceneContainingPixel = (geojson, pixel) => {
  // Example implementation: Adjust the logic according to your SHP structure
  return geojson.features.find((feature) => {
    // Assuming feature.geometry is of type Polygon
    const coordinates = feature.geometry.coordinates[0];
    return coordinates.some(([lng, lat]) => {
      return lng === pixel[0] && lat === pixel[1]; // Check if pixel matches any coordinates
    });
  });
};

const createGrid = ([longitude, latitude]) => {
  const cellSizeMeters = 30; // Each cell is 30 meters x 30 meters
  const metersPerDegreeLat = 111320;
  const metersPerDegreeLon = 111320 * Math.cos((latitude * Math.PI) / 180);

  // Convert 30 meters to degrees
  const cellSizeLat = cellSizeMeters / metersPerDegreeLat;
  const cellSizeLon = cellSizeMeters / metersPerDegreeLon;

  const grid = [];

  // Create 3x3 grid centered on the user's location
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const cellCoords = [
        [longitude + i * cellSizeLon, latitude + j * cellSizeLat], // Bottom-left corner
        [longitude + (i + 1) * cellSizeLon, latitude + j * cellSizeLat], // Bottom-right corner
        [longitude + (i + 1) * cellSizeLon, latitude + (j + 1) * cellSizeLat], // Top-right corner
        [longitude + i * cellSizeLon, latitude + (j + 1) * cellSizeLat], // Top-left corner
        [longitude + i * cellSizeLon, latitude + j * cellSizeLat], // Closing the polygon
      ];
      grid.push(cellCoords);
    }
  }

  return grid;
};

// eslint-disable-next-line react/prop-types
function MapSection({ isInteractive }) {
  const coords = useSelector((state) => state.map.coords);
  const zoom = useSelector((state) => state.map.zoom);
  const dispatch = useDispatch();

  let grid = createGrid(coords);
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const markerRef = useRef(null);

  const loadShapefile = async (map, targetPixel) => {
    try {
      const response = await fetch("path/to/your/file.shp");
      const arrayBuffer = await response.arrayBuffer();
      const geojson = await shp(arrayBuffer);

      // Process the GeoJSON to find the scene containing the target pixel
      const scene = findSceneContainingPixel(geojson, targetPixel);

      if (scene) {
        map.on("load", () => {
          map.addSource("scene-source", {
            type: "geojson",
            data: scene,
          });

          map.addLayer({
            id: "scene-layer",
            type: "fill",
            source: "scene-source",
            layout: {},
            paint: {
              "fill-color": "#888888",
              "fill-opacity": 0.5,
            },
          });

          // Optionally, fit the map to the bounds of the scene
          const bounds = new mapboxgl.LngLatBounds();
          scene.features.forEach((feature) => {
            bounds.extend(feature.geometry.coordinates);
          });
          map.fitBounds(bounds);
        });
      }
    } catch (error) {
      console.error("Error loading shapefile:", error);
    }
  };
  const setGrid = (mapRef, grid) => {
    // const loadKMLData = async () => {
    //   const response = await fetch("/src/assets/WRS2_descending_0/WRS2_descending.shp");
    //   const kmlText = await response.text();
    //   const geoJson = kml(new DOMParser().parseFromString(kmlText, "text/xml"));

    //   // Extract scene polygons from GeoJSON features
    //   const scenePolygons = geoJson.features;

    //   // Add scenes to the map
    //   scenePolygons.forEach((scene) => {
    //     mapRef.current.addSource(scene.id, {
    //       type: "geojson",
    //       data: scene,
    //     });

    //     mapRef.current.addLayer({
    //       id: scene.id + "-layer",
    //       type: "fill",
    //       source: scene.id,
    //       paint: {
    //         "fill-color": "#FF0000", // Example color
    //         "fill-opacity": 0.5,
    //       },
    //     });
    //   });
    // };
    let bbox = [];
    let minLng = Infinity;
    let minLat = Infinity;
    let maxLng = -Infinity;
    let maxLat = -Infinity;

    if (mapRef.current.getSource("grid")) {
      mapRef.current.getSource("grid").setData({
        type: "FeatureCollection",
        features: grid.map((grid_coords) => ({
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [grid_coords],
          },
        })),
      });
    } else {
      mapRef.current.addSource("grid", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: grid.map((grid_coords) => ({
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [grid_coords],
            },
          })),
        },
      });

      mapRef.current.addLayer({
        id: "grid-layer",
        type: "fill",
        source: "grid",
        layout: {},
        paint: {
          "fill-color": "#088",
          "fill-opacity": 0.3,
        },
      });
    }

    grid.forEach((cell) => {
      cell.forEach(([lng, lat]) => {
        if (lng < minLng) minLng = lng;
        if (lat < minLat) minLat = lat;
        if (lng > maxLng) maxLng = lng;
        if (lat > maxLat) maxLat = lat;
      });
    });

    bbox = [minLng, minLat, maxLng, maxLat];
    dispatch(setBbox(bbox));
  };

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYXN0cm92ZXgiLCJhIjoiY20xcnIwajVmMDZ1OTJpcjF5YmRwaXl3cyJ9.FTxUYn9WMsDCPyix8mPjFw";

    // Init Map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: coords,
      zoom: zoom,
    });

    const loadXMLData = async () => {
      const response = await fetch(
        "/src/assets/WRS2_descending_0/WRS2_descending.xml"
      );
      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
      console.log(xmlText);

      // Extract coordinates from the XML (this depends on your XML structure)
      const coordinates = Array.from(
        xmlDoc.getElementsByTagName("coordinate")
      ).map((coord) => {
        const lon = parseFloat(
          coord.getElementsByTagName("lon")[0].textContent
        );
        const lat = parseFloat(
          coord.getElementsByTagName("lat")[0].textContent
        );
        return [lon, lat];
      });

      // Add coordinates to the map
      coordinates.forEach((coord) => {
        console.log(coord);

        // new mapRef.current.Marker().setLngLat(coord).addTo(mapRef);
      });
    };

    mapRef.current.on("load", () => {
      setGrid(mapRef, grid);
    });

    if (isInteractive) {
      // Search Box
      const coordinatesGeocoder = (query) => {
        // Match anything which looks like
        // decimal degrees coordinate pair.
        const matches = query.match(
          /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
        );
        if (!matches) {
          return null;
        }

        function coordinateFeature(lng, lat) {
          return {
            center: [lng, lat],
            geometry: {
              type: "Point",
              coordinates: [lng, lat],
            },
            place_name: "Lat: " + lat + " Lng: " + lng,
            place_type: ["coordinate"],
            properties: {},
            type: "Feature",
          };
        }

        const coord1 = Number(matches[1]);
        const coord2 = Number(matches[2]);
        const geocodes = [];

        if (coord1 < -90 || coord1 > 90) {
          // must be lng, lat
          geocodes.push(coordinateFeature(coord1, coord2));
        }

        if (coord2 < -90 || coord2 > 90) {
          // must be lat, lng
          geocodes.push(coordinateFeature(coord2, coord1));
        }

        if (geocodes.length === 0) {
          // else could be either lng, lat or lat, lng
          geocodes.push(coordinateFeature(coord1, coord2));
          geocodes.push(coordinateFeature(coord2, coord1));
        }

        return geocodes;
      };

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        localGeocoder: coordinatesGeocoder,
        zoom: 4,
        placeholder: "Try: -40, 170",
        mapboxgl: mapboxgl,
        reverseGeocode: true,
        marker: false,
      });
      mapRef.current.addControl(geocoder);
      geocoder.on("result", (e) => {
        const coordinates = e.result.geometry.coordinates;

        if (markerRef.current) {
          markerRef.current.setLngLat(coordinates); // Update existing marker position
        } else {
          // Create a new marker if not already created
          markerRef.current = new mapboxgl.Marker()
            .setLngLat(coordinates)
            .addTo(mapRef.current);
        }

        // Fly to the selected location
        mapRef.current.flyTo({
          center: coordinates,
          zoom: 12,
        });
      });

      // Locate Me
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserLocation: false, // Disable default blue marker
      });
      mapRef.current.addControl(geolocate);
      geolocate.on("geolocate", (e) => {
        const userCoordinates = [e.coords.longitude, e.coords.latitude];

        if (markerRef.current) {
          markerRef.current.setLngLat(userCoordinates); // Update marker position
        } else {
          markerRef.current = new mapboxgl.Marker()
            .setLngLat(userCoordinates)
            .addTo(mapRef.current); // Add a new marker
        }

        mapRef.current.flyTo({
          center: userCoordinates,
          zoom: 12,
        });
      });

      // Update Coords
      mapRef.current.on("move", () => {
        // get the current center coordinates and zoom level from the map
        const mapCenter = mapRef.current.getCenter();
        const mapZoom = mapRef.current.getZoom();

        // update state
        dispatch(updateCenter([mapCenter.lng, mapCenter.lat]));
        dispatch(updateZoom(mapZoom));
      });

      // Set & Update Marker
      mapRef.current.on("click", (e) => {
        const { lng, lat } = e.lngLat;

        // Remove the previous marker if it exists
        if (markerRef.current) {
          markerRef.current.remove();
        }

        // Create and add the new marker
        markerRef.current = new mapboxgl.Marker(
          new mapboxgl.Marker({ draggable: true })
        )
          .setLngLat([lng, lat])
          .addTo(mapRef.current);

        dispatch(updateCoords([lng, lat]));
        setGrid(mapRef, createGrid([lng, lat]));
        // dispatch(setBbox([minLng, minLat, maxLng, maxLat]));
      });

      // Add Zoom in, out and Nav
      mapRef.current.addControl(new mapboxgl.NavigationControl());
    }

    return () => {
      mapRef.current.remove();
    };
  }, []);

  console.log("mounted");

  return (
    <>
      <div
        id="map-container"
        className="h-full rounded-xl"
        ref={mapContainerRef}
      />
    </>
  );
}

export default MapSection;
