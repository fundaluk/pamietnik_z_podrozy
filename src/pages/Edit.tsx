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

type RouteParams = {
  id: string;
};

interface Props extends RouteComponentProps<RouteParams>, React.Props<RouteParams> {}

const Edit: React.FunctionComponent<Props> = ({ match, history, location }) => {
  const { id } = match.params;
  const { pathname } = location;

  const [lat, setLat] = useState(50.06864775407978);
  const [lng, setLng] = useState(19.955816843574212);
  const [name, setName] = useState('');
  const [description, setDescritpion] = useState('');
  const [invalid, setInvalid] = useState(true);

  const firebase = useContext(FirebaseContext);

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
      }
    };
    if (pathname !== '/places') {
      fetchPlace();
    }
  }, [pathname]);

  // Sprawdz czy formularz ok
  useEffect(() => {
    if (name !== '' && description !== '' && description.length <= 200) {
      setInvalid(false);
    } else {
      setInvalid(true);
    }
    console.log('checking form');
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
      await firebase.db
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
      await firebase.db
        .collection('places')
        .doc(id)
        .delete();

      // Gdzie wrzucić plik i jak go nazwać
      const storageRef = firebase.storage.ref();
      const profilePhotoRef = storageRef.child(`${id}/image.jpg`);
      await profilePhotoRef.delete();
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
            <IonCol size="12" style={{ height: '40vh', marginBottom: '8px', padding: '0px' }}>
              <MapInputField onClick={handleMapClick} lat={lat} lng={lng} center={{ lat, lng }}>
                <Marker position={{ lat, lng }} />
              </MapInputField>
            </IonCol>
          </IonRow>
          <IonRow align-items-center justify-content-center>
            <IonCol size="12" style={{ marginTop: '8px', padding: '0px' }}>
              <IonButton expand="block" onClick={editPlace} disabled={invalid}>
                Zapisz zmiany
              </IonButton>
            </IonCol>
            <IonCol size="12" style={{ marginTop: '8px', padding: '0px' }}>
              <IonButton color="danger" expand="block" onClick={deletePlace}>
                Usuń Miejsce
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

export default Edit;
