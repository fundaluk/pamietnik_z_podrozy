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

type RouteParams = {
  id: string;
};

interface Props extends RouteComponentProps<RouteParams>, React.Props<RouteParams> {}

const Edit: React.FunctionComponent<Props> = ({ match, history, location }) => {
  const { id } = match.params;
  const { key } = location;

  const [lat, setLat] = useState(50.06864775407978);
  const [lng, setLng] = useState(19.955816843574212);
  const [name, setName] = useState('');
  const [description, setDescritpion] = useState('');
  const [invalid, setInvalid] = useState(true);

  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  // Sprawdź czy miejsce istnieje / refetch na zmianie aby zaktualizowac
  useEffect(() => {
    const fetchPlace = async () => {
      const placeRef = await firebase.db
        .collection('places')
        .doc(id)
        .get();

      if (placeRef.exists) {
        const place = placeRef.data();
        setLat(place.location.latitude);
        setLng(place.location.longitude);
        setName(place.name);
        setDescritpion(place.description);
      } else {
        history.push('/places');
      }
    };
    fetchPlace();
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
  const editPlace = async (event: Event) => {
    event.preventDefault();
    try {
      const ref = await firebase.db
        .collection('places')
        .doc(id)
        .update({
          name,
          description,
          location: new firebase.GeoPoint(lat, lng),
        });
      history.push(`/places`);
    } catch (err) {}
  };

  const deletePlace = async (event: Event) => {
    event.preventDefault();
    try {
      const ref = await firebase.db
        .collection('places')
        .doc(id)
        .delete();
      history.push(`/places`);
    } catch (err) {}
  };

  const cancelAddingPlace = async (event: Event) => {
    event.preventDefault();
    history.push('/places');
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edytuj Miejsce</IonTitle>
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
              <MapInputField onClick={handleMapClick} lat={lat} lng={lng} center={{ lat, lng }}>
                <Marker position={{ lat, lng }} />
              </MapInputField>
            </IonCol>
          </IonRow>
          <IonRow align-items-center justify-content-center>
            <IonCol offset="1" size="10">
              <IonButton style={{ marginTop: '8px' }} expand="block" onClick={editPlace} disabled={invalid}>
                Zapisz zmiany
              </IonButton>
            </IonCol>
            <IonCol offset="1" size="10">
              <IonButton style={{ marginTop: '8px' }} color="danger" expand="block" onClick={deletePlace}>
                Usuń Miejsce
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

export default Edit;
