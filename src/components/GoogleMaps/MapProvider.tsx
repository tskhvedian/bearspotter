import React, { useCallback, useState } from "react";

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

interface MarkerType {
  lat: number | undefined;
  lng: number | undefined;
  time: Date;
}

const MapProvider = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDer0zwa6AKvY9ocR8EHG_glVhNb9BBORE",
    libraries,
  });

  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const onMapClick = useCallback((event: any) => {
    setMarkers((current: MarkerType[]) => [
      ...current,
      {
        lat: event.latLng?.lat(),
        lng: event.latLng?.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading maps...";

  console.log(markers);

  return (
    <div>
      <h1 className="absolute top-5 left-5 z-10 text-lg font-bold">
        WOLFS <span> ⛺</span>
      </h1>
      <GoogleMap
        zoom={8}
        center={center}
        mapContainerStyle={mapContainerStyle}
        options={options}
        onClick={onMapClick}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat || 0, lng: marker.lng || 0 }}
            icon={{
              url: "/wolf1.png",
              scaledSize: new window.google.maps.Size(50, 50),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(25, 25),
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapProvider;
