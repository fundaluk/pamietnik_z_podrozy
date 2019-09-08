import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Marker } from 'google-maps-react';

import { Plugins } from '@capacitor/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
} from '@ionic/react';

import MapInputField from '../components/MapInputField';

import FirebaseContext from '../components/FirebaseContext';
import UserContext from '../components/UserContext';

const Add: React.FunctionComponent<RouteComponentProps> = ({ history, location }) => {
  const [lat, setLat] = useState(50.06864775407978);
  const [lng, setLng] = useState(19.955816843574212);
  const [name, setName] = useState('');
  const [description, setDescritpion] = useState('');
  const [invalid, setInvalid] = useState(true);

  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const { key } = location;

  const { Geolocation } = Plugins;

  // Pobierz lokalizace jeżeli dostępna
  useEffect(() => {
    const getCurrentPosition = async () => {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
        setLat(coordinates.coords.latitude);
        setLng(coordinates.coords.longitude);
      } catch (err) {}
    };
    getCurrentPosition();
  }, [key]);

  // Sprawdz czy formularz ok
  useEffect(() => {
    if (name !== '' && description !== '' && description.length <= 200) {
      setInvalid(false);
    } else {
      setInvalid(true);
    }
  }, [name, description]);

  const handleMapClick = (ref: any, map: any, event: any) => {
    const location = event.latLng;
    map.panTo(location);
    setLat(location.lat());
    setLng(location.lng());
  };

  // Dodaj miesce do bazy danych
  const addPlace = async (event: Event) => {
    event.preventDefault();

    try {
      await firebase.db.collection('places').add({
        name,
        description,
        location: new firebase.GeoPoint(lat, lng),
        user: user.uid,
        createdAt: firebase.timestamp,
      });
      setName('');
      setDescritpion('');
      // Przekieruje do tego miejsca - widok
      history.push(`/maps`);
    } catch (err) {}
  };

  const cancelAddingPlace = async (event: Event) => {
    event.preventDefault();
    setName('');
    setDescritpion('');
    history.push('/places');
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dodaj Miejsce</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow align-items-center justify-content-center>
            <IonCol size="12" style={{ marginBottom: '16px', padding: '0px' }}>
              <IonItem>
                <IonLabel position="floating" color="primary">
                  Nazwa miejsca
                </IonLabel>
                <IonInput
                  autofocus
                  required
                  value={name}
                  placeholder="Nazwa miejsca"
                  name="place-name"
                  onIonChange={e => setName((e.currentTarget as HTMLInputElement).value)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow align-items-center justify-content-center>
            <IonCol size="12" style={{ marginBottom: '16px', padding: '0px' }}>
              <IonItem>
                <IonLabel position="floating" color="primary">
                  Opis miejsca ({`${description.length}/200`})
                </IonLabel>
                <IonTextarea
                  required
                  value={description}
                  placeholder="Opis miejsca"
                  name="place-description"
                  maxlength={200}
                  onIonChange={e => setDescritpion((e.currentTarget as HTMLInputElement).value)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow align-items-center justify-content-center>
            <IonCol size="12" style={{ height: '40vh', minHeight: '320px', marginBottom: '8px', padding: '0px' }}>
              <MapInputField onClick={handleMapClick} lat={lat} lng={lng} center={{ lat, lng }}>
                <Marker position={{ lat, lng }} />
              </MapInputField>
            </IonCol>
          </IonRow>
          <IonRow align-items-center justify-content-center>
            <IonCol size="12" style={{ marginTop: '8px', padding: '0px' }}>
              <IonButton expand="block" onClick={addPlace} disabled={invalid}>
                Dodaj miejsce
              </IonButton>
            </IonCol>
            <IonCol size="12" style={{ marginTop: '8px', padding: '0px' }}>
              <IonButton expand="block" fill="clear" color="danger" onClick={cancelAddingPlace}>
                ANULUJ
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

export default Add;
