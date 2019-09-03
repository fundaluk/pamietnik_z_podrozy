import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonText, IonButton } from '@ionic/react';

import FirebaseContext from '../components/FirebaseContext';
import UserContext from '../components/UserContext';

import avatar from '../images/avatar.svg';

const Profile: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const { displayName, email, photoURL } = user;

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
                <IonText>
                  <h1>{displayName}</h1>
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
                <IonButton expand="block">Zmień nazwę</IonButton>
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
