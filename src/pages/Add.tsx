import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Marker } from 'google-maps-react';

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

const Add: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [lat, setLat] = useState(50.06864775407978);
  const [lng, setLng] = useState(19.955816843574212);
  const [name, setName] = useState('');
  const [description, setDescritpion] = useState('');
  const [invalid, setInvalid] = useState(true);

  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

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
      const ref = await firebase.db.collection('places').add({
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


  // Znajdz miejsca w pobliżu
  const fetchPlaces = (mapProps: any, map: any) => {
    const { google } = mapProps;
    const service = new google.maps.places.PlacesService(map);
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
            <IonCol size="12" style={{ marginBottom: '16px' }}>
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
            <IonCol size="12" style={{ marginBottom: '16px' }}>
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

            <IonCol offset="1" size="10" style={{ height: '40vh', marginBottom: '8px', padding: '0px' }}>
              <MapInputField onClick={handleMapClick} lat={lat} lng={lng} center={{ lat, lng }} onReady={fetchPlaces}>

                <Marker position={{ lat, lng }} />
              </MapInputField>
            </IonCol>
          </IonRow>
          <IonRow align-items-center justify-content-center>
            <IonCol offset="1" size="10">
              <IonButton style={{ marginTop: '8px' }} expand="block" onClick={addPlace} disabled={invalid}>
                Dodaj miejsce
              </IonButton>
            </IonCol>
            <IonCol offset="1" size="10">
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
