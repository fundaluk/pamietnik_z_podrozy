import * as React from 'react';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

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

const Add: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescritpion] = useState('');
  const [location, setLocation] = useState('');
  const [invalid, setInvalid] = useState(true);
  const [error, setError] = useState('');

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
                  Nazwa miejsca / Adres
                </IonLabel>
                <IonInput
                  autofocus
                  required
                  placeholder="Nazwa miejsca / adres"
                  name="place-name"
                  onIonChange={e => console.log(e.currentTarget)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow align-items-center justify-content-center>
            <IonCol size="12" style={{ marginBottom: '16px' }}>
              <IonItem>
                <IonLabel position="floating" color="primary">
                  Opis miejsca (100 / 200 )
                </IonLabel>
                <IonTextarea
                  required
                  placeholder="Opis miejsca"
                  name="place-description"
                  maxlength={200}
                  onIonChange={e => console.log(e.currentTarget)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow align-items-center justify-content-center>
            <IonCol
              offset="1"
              size="10"
              style={{ height: '40vh', backgroundColor: 'blue', marginBottom: '8px' }}
            ></IonCol>
          </IonRow>
          <IonRow align-items-center justify-content-center>
            <IonCol offset="1" size="10">
              <IonText>
                <p>ul.Floriańska 1</p>
                <p>Kraków</p>
                <p>lat: {lat}</p>
                <p>lng: {lng}</p>
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow align-items-center justify-content-center>
            <IonCol offset="1" size="10">
              <IonButton style={{ marginTop: '8px' }} expand="block" onClick={() => console.log('add')}>
                Dodaj miejsce
              </IonButton>
            </IonCol>
            <IonCol offset="1" size="10">
              <IonButton expand="block" fill="clear" color="danger" onClick={() => console.log('add')}>
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
