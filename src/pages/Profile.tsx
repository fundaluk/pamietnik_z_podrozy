import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
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

  const changeUsername = (event: Event) => {
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

  const handleLogout = () => {
    console.log('LOGOUT');
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
                <img
                  src={photoURL || avatar}
                  alt="Logo"
                  style={{ display: 'block', margin: '0 auto', width: '146px', height: '146px', borderRadius: '50%' }}
                ></img>
              </IonCol>
            </IonRow>
            <IonRow style={{ justifyContent: 'center' }}>
              <IonCol size="10">
                {isEditingUsername ? (
                  <IonButton expand="block" onClick={handleUsernameChange} disabled={!usernameValid}>
                    Akceptuj
                  </IonButton>
                ) : (
                  <IonButton expand="block" onClick={changeUsername}>
                    Zmień nazwę
                  </IonButton>
                )}
              </IonCol>
              <IonCol size="10">
                <IonButton expand="block">Zmień avatar</IonButton>
              </IonCol>
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
