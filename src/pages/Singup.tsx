import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { IonContent, IonGrid, IonCol, IonRow, IonText, IonButton, IonItem, IonLabel, IonInput } from '@ionic/react';

import FirebaseContext from '../components/FirebaseContext';

const Singup: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const firebase = useContext(FirebaseContext);

  const [email, setEmail] = useState<string | null>('');
  const [password, setPassowrd] = useState<string | null>('');
  const [confirm, setConfirm] = useState<string | null>('');
  const [valid, setValid] = useState<boolean>(false);
  const [error, setError] = useState<string | null>('');

  // Sprawdź za każdym razem jak się zmieni email, passowrd i confirm czy formularz jest poprawny
  useEffect(() => {
    if (email !== '' && password !== '' && confirm !== '' && password === confirm) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [email, password, confirm]);

  // Funckja odpowiedzialna za zalogowanie użytkownia z Google
  const handleSignup = async (event: Event) => {
    event.preventDefault();
    try {
      const response = await firebase.auth.createUserWithEmailAndPassword(email, password);
      await firebase.db
        .collection('users')
        .doc(response.user.uid)
        .set({ createAt: firebase.timestamp });
      history.push('/places');
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
              <h1>Stwórz konto</h1>
              {error && (
                <IonText color="danger">
                  <p>{error}</p>
                </IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow justify-content-center>
            <IonCol offset="1" size="10">
              <IonItem>
                <IonLabel position="floating" color="primary">
                  Adres email
                </IonLabel>
                <IonInput
                  required
                  placeholder="Podaj swój email"
                  type="email"
                  name="email"
                  value={email}
                  onIonChange={e => setEmail((e.currentTarget as HTMLInputElement).value)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow justify-content-center>
            <IonCol offset="1" size="10">
              <IonItem>
                <IonLabel position="floating" color="primary">
                  Hasło
                </IonLabel>
                <IonInput
                  required
                  placeholder="Podaj hasło"
                  type="password"
                  name="password"
                  value={password}
                  onIonChange={e => setPassowrd((e.currentTarget as HTMLInputElement).value)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow justify-content-center>
            <IonCol offset="1" size="10">
              <IonItem>
                <IonLabel position="floating" color="primary">
                  Potwierdź hasło
                </IonLabel>
                <IonInput
                  required
                  placeholder="Potwierdź hasło"
                  type="password"
                  name="confirm"
                  value={confirm}
                  onIonChange={e => setConfirm((e.currentTarget as HTMLInputElement).value)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow justify-content-center>
            <IonCol style={{ marginTop: '32px' }} offset="1" size="10">
              <IonButton expand="block" color="primary" type="submit" disabled={!valid} onClick={handleSignup}>
                Stwórz konto
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

export default Singup;
