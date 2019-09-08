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
  IonCardContent,
  IonButton,
  IonText,
  IonCardSubtitle,
  IonCardTitle,
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
  const [photoValid, setPhotoValid] = useState<boolean>(false);
  const [isEditingPhoto, setIsEditingPhoto] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        setIsLoading(true);
        const snapshot = await profilePhotoRef.put(file);
        const photoURL = await snapshot.ref.getDownloadURL();

        await firebase.db
          .collection('places')
          .doc(id)
          .update({
            photoURL,
          });

        setPhotoPreview('');
        setIsEditingPhoto(false);
        setIsLoading(false);
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
      {photoPreview ? (
        <img src={photoPreview} style={{ height: '240px', width: '100%', objectFit: 'cover' }} alt="preview" />
      ) : (
        <img
          src={place.photoURL || noPhoto}
          style={{ height: '240px', width: '100%', objectFit: 'cover' }}
          alt={id}
        ></img>
      )}
      <IonCardHeader>
        <IonCardSubtitle>NAZWA MIEJSCA</IonCardSubtitle>
        <IonCardTitle>{place.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonCardSubtitle>OPIS MIEJSCA</IonCardSubtitle>
        <IonText>
          <p style={{ marginTop: '6px' }}>{place.description}</p>
        </IonText>
      </IonCardContent>
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
        <IonButton style={{ margin: '0 0 8px' }} expand="full" onClick={handlePhotoChange} disabled={!photoValid}>
          {isLoading ? 'PROSZĘ CZEKAĆ' : 'Akceptuj'}
        </IonButton>
      ) : (
        <IonButton style={{ margin: '0 0 8px' }} expand="full" onClick={choosePhoto}>
          Dodaj zdjęcie
        </IonButton>
      )}
      <IonButton style={{ margin: '0px' }} expand="full" color="primary" onClick={editPlace}>
        Edytuj
      </IonButton>
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
                <IonCol size="12" style={{ padding: '0px' }} key={doc.id}>
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
