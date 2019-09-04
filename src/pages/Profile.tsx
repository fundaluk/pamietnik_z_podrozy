import * as React from 'react';

import { useContext, useEffect, useState, useRef } from 'react';

import { RouteComponentProps } from 'react-router-dom';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/react';

import FirebaseContext from '../components/FirebaseContext';
import UserContext from '../components/UserContext';

import avatar from '../images/avatar.svg';

const Profile: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const { displayName, email, photoURL } = user;


 // Zmiana nazwy użytkownika - logika

  const [username, setUsername] = useState<string>(displayName);
  const [usernameValid, setUsernameValid] = useState<boolean>(false);
  const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);

  // Sprawdź za każdym razem jak się zmieni username  czy formularz jest poprawny
  useEffect(() => {
    if (username !== '' && username.length > 3) {
      setUsernameValid(true);
    } else {
      setUsernameValid(false);
    }
  }, [username]);


  const changeUsername = async (event: Event) => {

    event.preventDefault();
    setIsEditingUsername(!isEditingUsername);
  };

  const handleUsernameChange = async (event: Event) => {
    event.preventDefault();
    if (usernameValid) {
      try {
        await firebase.auth.currentUser.updateProfile({ displayName: username });
        setIsEditingUsername(!isEditingUsername);
      } catch (err) {
        console.log(err);
      }
    }
  };


  // Zmiana obrazka użytkownika - logika
  const photoInputRef = useRef(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
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
  };

  const handlePhotoChange = async (event: Event) => {
    event.preventDefault();

    const { current } = photoInputRef;

    // Gdzie wrzucić plik i jak go nazwać
    const storageRef = firebase.storage.ref();
    const profilePhotoRef = storageRef.child(`${user.uid}/profilePhoto.jpg`);

    // Czy jest element input i plik
    if (current && current.files.length > 0) {
      // Wrzuć plik
      const file = current.files[0];

      try {
        const snapshot = await profilePhotoRef.put(file);
        const newURL = await snapshot.ref.getDownloadURL();

        await firebase.auth.currentUser.updateProfile({ photoURL: newURL });

        setPhotoPreview('');
        setPhotoValid(false);
        setIsEditingPhoto(false);
      } catch (err) {}
    }
  };

  // Wylgowowanie - logika
  const handleLogout = async (event: Event) => {
    event.preventDefault();
    try {
      firebase.auth.signOut().then(() => history.push('/'));
    } catch (err) {}

  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mój Profil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ display: 'flex', alignItems: 'center', height: '80vh', padding: '8px 0' }}>
          <IonGrid fixed>
            <IonRow align-items-center justify-content-center>
              <IonCol style={{ textAlign: 'center', marginBottom: '8px' }} size="12">
                {isEditingUsername ? (
                  <IonItem>
                    <IonLabel position="floating" color="primary">
                      Nazwa użytkownia
                    </IonLabel>
                    <IonInput
                      autofocus
                      required
                      placeholder="Nazwa użytkownika"
                      name="username"
                      value={username}
                      onIonChange={e => setUsername((e.currentTarget as HTMLInputElement).value)}
                    />
                  </IonItem>
                ) : (
                  <IonText>
                    <h1>{displayName}</h1>
                  </IonText>
                )}
                <IonText>
                  <p>{email}</p>
                </IonText>
              </IonCol>
            </IonRow>
            <IonRow align-items-center justify-content-center>
              <IonCol style={{ marginBottom: '32px' }}>

                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="preview"
                    style={{ display: 'block', margin: '0 auto', width: '146px', height: '146px', borderRadius: '50%' }}
                  />
                ) : (
                  <img
                    src={photoURL || avatar}
                    alt="profile"
                    style={{ display: 'block', margin: '0 auto', width: '146px', height: '146px', borderRadius: '50%' }}
                  ></img>
                )}

              </IonCol>
            </IonRow>
            <IonRow style={{ justifyContent: 'center' }}>
              <IonCol size="10">
                {isEditingUsername ? (
                  <IonButton expand="block" onClick={handleUsernameChange} disabled={!usernameValid}>
                    Akceptuj
                  </IonButton>
                ) : (

                  <IonButton expand="block" onClick={changeUsername} disabled={isEditingPhoto}>

                    Zmień nazwę
                  </IonButton>
                )}
              </IonCol>
              <IonCol size="10">

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
                  <IonButton expand="block" onClick={choosePhoto} disabled={isEditingUsername}>
                    Zmień avatar
                  </IonButton>
                )}
              </IonCol>
            </IonRow>
            <IonRow style={{ justifyContent: 'center' }}>

              <IonCol size="10">
                <IonButton expand="block" fill="clear" onClick={handleLogout}>
                  Wyloguj
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </>
  );
};

export default Profile;
