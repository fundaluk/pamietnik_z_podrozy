import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { IonContent, IonGrid, IonCol, IonRow, IonText, IonIcon, IonButton } from '@ionic/react';
import { map } from 'ionicons/icons';

const Landing: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  return (
    <IonContent>
      <div style={{ display: 'flex', alignItems: 'center', height: '100vh', padding: '8px 0' }}>
        <IonGrid fixed>
          <IonRow align-items-center justify-content-center>
            <IonCol style={{ textAlign: 'center', marginBottom: '8px' }} size="12">
              <IonText>
                <h1>Pamiętnik z Podróży</h1>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow align-items-center justify-content-center>
            <IonCol style={{ marginBottom: '8px' }}>
              <IonIcon
                color="primary"
                style={{ display: 'block', margin: '0 auto', fontSize: '146px' }}
                icon={map}
              ></IonIcon>
            </IonCol>
          </IonRow>
          <IonRow align-items-end justify-content-center>
            <IonCol style={{ textAlign: 'center', marginBottom: '8px' }}>
              <IonText>
                <p>
                  Zapisz wszystkie miejsca
                  <br />
                  ze swojej podróży!
                </p>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow style={{ justifyContent: 'center' }}>
            <IonCol size="10">
              <IonButton expand="block" onClick={() => history.push('/login')}>
                Zaloguj się
              </IonButton>
            </IonCol>
            <IonCol size="10">
              <IonButton expand="block" onClick={() => history.push('/signup-google')}>
                Zaloguj się z Google
              </IonButton>
            </IonCol>
            <IonCol size="10">
              <IonButton expand="block" fill="clear" onClick={() => history.push('/signup')}>
                Stwórz konto
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </IonContent>
  );
};

export default Landing;
