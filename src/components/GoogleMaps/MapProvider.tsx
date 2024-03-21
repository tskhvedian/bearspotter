import React from "react";

import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  Libraries,
} from "@react-google-maps/api";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";

const libraries = ["places"];
const center = {
  lat: 41.7151,
  lng: 44.8271,
};

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  clickableIcons: false,
  zoomControl: true,
};

const MapProvider = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDer0zwa6AKvY9ocR8EHG_glVhNb9BBORE",
    libraries,
  });
  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading maps...";

  return (
    <div>
      <h1 className="absolute top-5 left-5 z-10 text-lg font-bold">
        BEARS <span> ⛺</span>
      </h1>
      <GoogleMap
        zoom={8}
        center={center}
        mapContainerStyle={mapContainerStyle}
        options={options}
      ></GoogleMap>
    </div>
  );
};

export default MapProvider;
