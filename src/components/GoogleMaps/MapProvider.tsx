import React, { useCallback, useRef, useState } from "react";

import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";
import { add, formatRelative } from "date-fns";
import { Combobox, ComboboxInput, ComboboxPopover } from "@reach/combobox";

const libraries = ["places"];
const center: google.maps.LatLngLiteral = {
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
  lat: number;
  lng: number;
  time: Date;
}

const MapProvider = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDer0zwa6AKvY9ocR8EHG_glVhNb9BBORE",
    libraries,
  });

  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [selected, setSelected] = useState<MarkerType | null>(null);

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

  const mapRef = useRef();
  const onMapLoad = useCallback(() => {}, []);

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading maps...";

  console.log(markers);

  return (
    <div>
      <h1 className="absolute top-5 left-5 z-10 text-lg font-bold">
        WOLFS <span> ⛺</span>
      </h1>
      <Search />
      <GoogleMap
        zoom={12}
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
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div className="space-y-2">
              <h2 className="text-lg">Wolf Spotted!</h2>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default MapProvider;

function Search() {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  console.log(value, "Status: ", status, "Suggestions Data: ", data);

  return (
    <div className="absolute w-full py-10 flex justify-center z-50 ">
      <Combobox>
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an Address"
          className="border border-lime-600 rounded px-6 py-2"
        />
        <ComboboxPopover>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <Combobox key={place_id}>{description}</Combobox>
            ))}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
