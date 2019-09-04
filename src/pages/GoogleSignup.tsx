import * as React from 'react';
import { useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { IonContent, IonGrid, IonCol, IonRow, IonText, IonButton, IonIcon } from '@ionic/react';
import { logoGoogle } from 'ionicons/icons';

import FirebaseContext from '../components/FirebaseContext';

const GoogleSignup: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const firebase = useContext(FirebaseContext);

  const [error, setError] = useState<string | null>('');

  // Funckja odpowiedzialna za zalogowanie użytkownia z Google
  const handleLogin = async (event: Event) => {
    event.preventDefault();
    try {
      const response = await firebase.auth.signInWithPopup(firebase.googleProvider);
      firebase.db
        .collection('users')
        .doc(response.user.uid)
        .set({ createAt: firebase.timestamp })
        .then(() => history.push('places'));
    } catch (err) {
      setError(err.message);
    }
  };

  // Wyświetl formularz tworzenia konta jeżeli użytkownik nie jest zalogowany
  return (
    <IonContent>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100vh',
          padding: '8px 0',
        }}
      >
        <IonGrid fixed>
          <IonRow justify-content-center>
            <IonCol style={{ textAlign: 'center', marginBottom: '14px' }} size="12">
              <h1>Logowanie z Google</h1>
              {error && (
                <IonText color="danger">
                  <p>{error}</p>
                </IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow align-items-center justify-content-center>
            <IonCol style={{ marginBottom: '8px' }}>
              <IonIcon
                style={{ display: 'block', margin: '0 auto', fontSize: '72px', color: '#4285F4' }}
                icon={logoGoogle}
              ></IonIcon>
            </IonCol>
          </IonRow>
          <IonRow justify-content-center>
            <IonCol style={{ marginTop: '32px' }} offset="1" size="10">
              <IonButton expand="block" color="primary" type="submit" onClick={handleLogin}>
                Zaloguj
              </IonButton>
            </IonCol>
            <IonCol offset="1" size="10">
              <IonButton expand="block" fill="clear" onClick={() => history.push('/')}>
                Powrót
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </IonContent>
  );
};

export default GoogleSignup;
