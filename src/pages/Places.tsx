import * as React from 'react';
import { useContext, useState, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { useCollection } from 'react-firebase-hooks/firestore';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonLabel,
  IonCardContent,
  IonList,
  IonItem,
  IonButton,
} from '@ionic/react';

import FirebaseContext from '../components/FirebaseContext';
import UserContext from '../components/UserContext';

import noPhoto from '../images/no-photo-available.png';

type PlaceItemProps = {
  id: string;
  place: Record<string, any>;
  history: Record<string, any>;
};

const PlaceItem: React.FunctionComponent<PlaceItemProps> = props => {
  const { place, id, history } = props;

  const firebase = useContext(FirebaseContext);

  // Zmiana obrazka użytkownika - logika
  const photoInputRef = useRef(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [photoURL, setPhotoURL] = useState<string>('');
  const [photoValid, setPhotoValid] = useState<boolean>(false);
  const [isEditingPhoto, setIsEditingPhoto] = useState<boolean>(false);

  const choosePhoto = () => {
    const { current } = photoInputRef;
    // Edytuje zdjęcie
    setIsEditingPhoto(true);
    // Czy jest element input
    if (current) {
      current.click();
    }
  };

  const addPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { current } = photoInputRef;

    // Czy jest element input i plik
    if (current && current.files.length > 0) {
      const file = event.target.files[0];
      setPhotoValid(true);
      setPhotoPreview(URL.createObjectURL(file));
    }
    console.log('choosing photo');
  };

  const handlePhotoChange = async (event: Event) => {
    event.preventDefault();

    const { current } = photoInputRef;

    // Gdzie wrzucić plik i jak go nazwać
    const storageRef = firebase.storage.ref();
    const profilePhotoRef = storageRef.child(`${id}/image.jpg`);

    // Czy jest element input i plik
    if (current && current.files.length > 0) {
      // Wrzuć plik
      const file = current.files[0];

      try {
        const snapshot = await profilePhotoRef.put(file);
        const photoURL = await snapshot.ref.getDownloadURL();

        const ref = await firebase.db
          .collection('places')
          .doc(id)
          .update({
            photoURL,
          });

        setPhotoPreview('');
        setIsEditingPhoto(false);
      } catch (err) {}
    }
  };

  const editPlace = async (event: Event) => {
    if (!event.currentTarget) {
      return;
    }
    event.preventDefault();
    history.push(`/places/${id}/edit`);
  };

  return (
    <IonCard>
      <IonCardHeader color="primary">
        <IonLabel>{place.name}</IonLabel>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {photoPreview ? (
            <img src={photoPreview} alt="preview" style={{ display: 'block', margin: '0 auto' }} />
          ) : (
            <img src={place.photoURL || noPhoto} alt="profile" style={{ display: 'block', margin: '0 auto' }}></img>
          )}
          <IonItem>
            <IonLabel>{place.description}</IonLabel>
          </IonItem>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            placeholder="Dodaj zdjęcie"
            name="photo"
            onChange={addPhoto}
            style={{ display: 'none' }}
          />
          {isEditingPhoto ? (
            <IonButton expand="block" onClick={handlePhotoChange} disabled={!photoValid}>
              Akceptuj
            </IonButton>
          ) : (
            <IonButton expand="block" onClick={choosePhoto}>
              Dodaj zdjęcie
            </IonButton>
          )}
          <IonButton expand="block" color="primary" onClick={editPlace}>
            Edytuj
          </IonButton>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

const Places: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  // Pobierz wsztstkie mejsca dla jeednego usera
  const [places, loading, error] = useCollection(firebase.db.collection('places').where('user', '==', user.uid), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Moje Miejsca</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid style={{ padding: '0px' }}>
          <IonRow align-items-center justify-content-center>
            {places &&
              places.docs.map(doc => (
                <IonCol size="12" key={doc.id}>
                  <PlaceItem id={doc.id} place={doc.data()} history={history} />
                </IonCol>
              ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

export default Places;
