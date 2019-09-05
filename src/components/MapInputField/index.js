import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const MapInputField = ({ google, zoom, lat, lng, ...other }) => {
  const mapStyles = {
    width: '100%',
    height: '100%',
  };

  return <Map google={google} zoom={zoom} style={mapStyles} initialCenter={{ lat, lng }} {...other} />;
};

MapInputField.defaultProps = {
  zoom: 18,
  lat: 50.06821902409837,
  lng: 19.955816843574212,
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(MapInputField);
