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
  IonText,
} from '@ionic/react';

import MapInputField from '../components/MapInputField';

import FirebaseContext from '../components/FirebaseContext';
import UserContext from '../components/UserContext';

const Add: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [lat, setLat] = useState(50.06864775407978);
  const [lng, setLng] = useState(19.955816843574212);
  const [name, setName] = useState('');
  const [description, setDescritpion] = useState('');
  const [place, setPlace] = useState('');
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

    // Sprawdź lokacje - Places API
  };

  // Dodaj miesce do bazy danych
  const addPlace = async (event: Event) => {
    event.preventDefault();

    try {
      const ref = await firebase.db.collection('places').add({
        name,
        description,
        place,
        location: new firebase.GeoPoint(lat, lng),
        user: user.uid,
        createdAt: firebase.timestamp,
      });
      // Przekieruje do tego miejsca - widok
      history.push(`/places/place/${ref.id}`);
    } catch (err) {}
  };

  const cancelAddingPlace = async (event: Event) => {
    event.preventDefault();
    setName('');
    setDescritpion('');
    setPlace('');
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
            <IonCol offset="1" size="10" style={{ height: '40vh', marginBottom: '8px' }}>
              <MapInputField onClick={handleMapClick} lat={lat} lng={lng} center={{ lat, lng }}>
                <Marker position={{ lat, lng }} />
              </MapInputField>
            </IonCol>
          </IonRow>
          <IonRow align-items-center justify-content-center>
            <IonCol offset="1" size="10">
              <IonText>
                <p>lat: {lat}</p>
                <p>lng: {lng}</p>
              </IonText>
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
