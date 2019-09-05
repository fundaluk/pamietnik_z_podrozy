import * as React from 'react';
import { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const MapPlaces = ({ google, points, ...other }) => {
  const mapStyles = {
    width: '100%',
    height: '100%',
  };

  const [bounds, setBounds] = useState(null);

  // Updates bounds after load
  useEffect(() => {
    const newBounds = new google.maps.LatLngBounds();
    points.forEach(point => {
      newBounds.extend(point);
    });
    setBounds(newBounds);
  }, [points]);

  return (
    <Map
      google={google}
      style={mapStyles}
      initialCenter={{
        lat: 50.0647,
        lng: 19.945,
      }}
      bounds={bounds}
      {...other}
    />
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(MapPlaces);
